const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

// Default colors for repositories that don't have custom colors set
const defaultGradients = [
    ['#FF6B6B', '#FF8E53'],  // Warm orange
    ['#4E54C8', '#8F94FB'],  // Cool blue
    ['#11998e', '#38ef7d'],  // Fresh green
    ['#6B48FF', '#C850C0'],  // Purple pink
    ['#3494E6', '#EC6EAD'],  // Ocean breeze
    ['#ee0979', '#ff6a00'],  // Sunset
    ['#43C6AC', '#191654'],  // Deep teal
    ['#4776E6', '#8E54E9']   // Royal blue
];

// Custom metadata for specific projects (optional overrides)
const customMetadata = {
    '8020-best': {
        colors: ['#FF6B6B', '#FF8E53'],
        status: 'live'
    },
    'caldump': {
        colors: ['#4E54C8', '#8F94FB'],
        status: 'live'
    },
    'skill-supply': {
        colors: ['#11998e', '#38ef7d'],
        status: 'incoming'
    },
    'light90': {
        colors: ['#6B48FF', '#C850C0'],
        status: 'incoming'
    }
};

// Exclude these repositories from the site
const excludeRepos = ['adamtpang', 'resume', 'test'];

async function getAllRepos(owner) {
    try {
        const { data: repos } = await octokit.repos.listForUser({
            username: owner,
            sort: 'updated',
            per_page: 100
        });

        return repos.filter(repo => !excludeRepos.includes(repo.name));
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

async function getRepoData(repo) {
    try {
        // Get README only if repo exists
        const readme = await octokit.repos.getReadme({
            owner: repo.owner.login,
            repo: repo.name
        }).catch(() => null);

        // Get topics
        const { data: topics } = await octokit.repos.getAllTopics({
            owner: repo.owner.login,
            repo: repo.name
        });

        return {
            name: repo.name,
            description: repo.description,
            url: repo.homepage || repo.html_url,
            github_url: repo.html_url,
            stars: repo.stargazers_count,
            topics: topics.names || [],
            language: repo.language,
            updated_at: repo.updated_at,
            readme: readme ? Buffer.from(readme.data.content, 'base64').toString() : null
        };
    } catch (error) {
        console.error(`Error fetching data for ${repo.name}:`, error);
        return null;
    }
}

function determineStatus(repo) {
    // Check custom metadata first
    if (customMetadata[repo.name]?.status) {
        return customMetadata[repo.name].status;
    }

    // If has a homepage and is not archived, consider it live
    if (repo.homepage && !repo.archived) {
        return 'live';
    }

    // If it's being actively developed
    const lastUpdate = new Date(repo.updated_at);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (lastUpdate > threeMonthsAgo) {
        return 'incoming';
    }

    return 'archived';
}

function getGradientColors(repoName, index) {
    // Use custom colors if defined
    if (customMetadata[repoName]?.colors) {
        return customMetadata[repoName].colors;
    }

    // Otherwise, cycle through default gradients
    return defaultGradients[index % defaultGradients.length];
}

async function updateProjects() {
    const repos = await getAllRepos('adamtpang');
    const projects = [];

    for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        const repoData = await getRepoData(repo);

        if (repoData) {
            projects.push({
                name: repoData.name,
                url: repoData.url,
                github_url: repoData.github_url,
                description: repoData.description || '',
                status: determineStatus(repo),
                colors: getGradientColors(repo.name, i),
                stars: repoData.stars,
                language: repoData.language,
                topics: repoData.topics,
                updated_at: repoData.updated_at
            });
        }
    }

    // Sort projects: live first, then by stars and update date
    projects.sort((a, b) => {
        if (a.status !== b.status) {
            return a.status === 'live' ? -1 : 1;
        }
        if (a.stars !== b.stars) {
            return b.stars - a.stars;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
    });

    await fs.writeFile(
        path.join(process.cwd(), 'projects.json'),
        JSON.stringify({ projects }, null, 2)
    );
}

updateProjects().catch(console.error);