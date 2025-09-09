/**
 * Extract all live URLs from GitHub repos
 * This script fetches your repos and extracts URLs from:
 * 1. homepage field (GitHub "about" section)
 * 2. repo name (if it looks like a URL)
 * 3. README parsing (if needed)
 */

async function extractAllURLs() {
    console.log('🚀 Extracting URLs from GitHub repos...\n');
    
    try {
        // Fetch all repos from GitHub API
        const response = await fetch('https://api.github.com/users/adamtpang/repos?sort=pushed&per_page=100');
        const repos = await response.json();
        
        // Filter out forks and excluded repos
        const excludeRepos = ['adamtpang', 'resume', 'test', 'anchormarianas.com'];
        const filteredRepos = repos.filter(repo => 
            !repo.fork && 
            !excludeRepos.includes(repo.name)
        );
        
        console.log(`📊 Found ${filteredRepos.length} repos to analyze\n`);
        
        const urlsFound = [];
        const noUrlRepos = [];
        
        filteredRepos.forEach((repo, index) => {
            const repoInfo = {
                name: repo.name,
                description: repo.description || '',
                homepage: repo.homepage || '',
                github_url: repo.html_url,
                stars: repo.stargazers_count,
                updated: repo.updated_at.split('T')[0]
            };
            
            // Method 1: Check homepage field (most reliable)
            if (repo.homepage && isValidURL(repo.homepage)) {
                urlsFound.push({
                    ...repoInfo,
                    live_url: repo.homepage,
                    source: 'homepage'
                });
                return;
            }
            
            // Method 2: Check if repo name looks like a URL
            const urlFromName = extractURLFromName(repo.name);
            if (urlFromName) {
                urlsFound.push({
                    ...repoInfo,
                    live_url: urlFromName,
                    source: 'repo_name'
                });
                return;
            }
            
            // Method 3: No URL found
            noUrlRepos.push(repoInfo);
        });
        
        // Results
        console.log('✅ REPOS WITH LIVE URLS:');
        console.log('========================\n');
        urlsFound.forEach((repo, i) => {
            console.log(`${i + 1}. ${repo.name}`);
            console.log(`   URL: ${repo.live_url}`);
            console.log(`   Source: ${repo.source}`);
            console.log(`   Updated: ${repo.updated}`);
            console.log('');
        });
        
        console.log('❌ REPOS WITHOUT URLS:');
        console.log('======================\n');
        noUrlRepos.forEach((repo, i) => {
            console.log(`${i + 1}. ${repo.name}`);
            console.log(`   Description: ${repo.description}`);
            console.log('');
        });
        
        console.log('📋 SUMMARY:');
        console.log('===========');
        console.log(`Total repos: ${filteredRepos.length}`);
        console.log(`With URLs: ${urlsFound.length}`);
        console.log(`Without URLs: ${noUrlRepos.length}`);
        
        // Generate URL list for screenshot tool
        console.log('\n🔗 URL LIST FOR SCREENSHOT TOOL:');
        console.log('================================');
        urlsFound.forEach(repo => {
            console.log(repo.live_url);
        });
        
        // Generate CSV for easy import
        console.log('\n📄 CSV FORMAT:');
        console.log('==============');
        console.log('repo_name,live_url,source,description');
        urlsFound.forEach(repo => {
            console.log(`"${repo.name}","${repo.live_url}","${repo.source}","${repo.description}"`);
        });
        
        return { urlsFound, noUrlRepos };
        
    } catch (error) {
        console.error('❌ Error fetching repos:', error);
    }
}

function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

function extractURLFromName(repoName) {
    // Check if repo name contains common domain patterns
    const domainPatterns = [
        /^([\w-]+\.[\w-]+\.[\w]+)$/,  // subdomain.domain.tld
        /^([\w-]+\.[\w]+)$/,          // domain.tld
        /^www\.([\w-]+\.[\w]+)$/      // www.domain.tld
    ];
    
    for (const pattern of domainPatterns) {
        const match = repoName.match(pattern);
        if (match) {
            // Try both http and https
            const domain = match[1] || match[0];
            return `https://${domain.replace(/^www\./, '')}`;
        }
    }
    
    return null;
}

// Run if called directly
if (typeof window === 'undefined') {
    // Node.js environment
    const fetch = require('node-fetch');
    extractAllURLs();
} else {
    // Browser environment - expose globally
    window.extractAllURLs = extractAllURLs;
}

// Also export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { extractAllURLs, isValidURL, extractURLFromName };
}