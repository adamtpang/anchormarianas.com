#!/usr/bin/env node

// Script to capture screenshots for all live projects
// Usage: node capture-screenshots.js
// 
// You'll need to:
// 1. Sign up for a free ScreenshotOne API key at https://screenshotone.com
// 2. Replace YOUR_API_KEY below with your actual key
// 3. Run this script to download screenshots for all your live projects

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'zWVQKl-DroC9PQ';
const SECRET_KEY = 'GeYrlYUJCpDj4g';

async function fetchGitHubRepos() {
    return new Promise((resolve, reject) => {
        https.get('https://api.github.com/users/adamtpang/repos?sort=pushed&per_page=100', {
            headers: { 'User-Agent': 'Node.js' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function downloadScreenshot(url, filename) {
    const apiUrl = `https://api.screenshotone.com/take?access_key=${API_KEY}&secret_key=${SECRET_KEY}&url=${encodeURIComponent(url)}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=png&image_quality=80&block_ads=true&block_cookie_banners=true&block_trackers=true&delay=2`;
    
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(apiUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✓ Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filename, () => {}); // Delete file on error
            console.error(`✗ Failed: ${filename} - ${err.message}`);
            reject(err);
        });
    });
}

async function main() {

    console.log('Fetching GitHub repos...');
    const repos = await fetchGitHubRepos();
    
    const liveProjects = repos.filter(repo => 
        !repo.fork && 
        repo.homepage && 
        repo.name !== 'anchormarianas.com'
    );

    console.log(`Found ${liveProjects.length} live projects to screenshot`);
    
    const screenshotsDir = path.join(__dirname, 'media', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    for (const project of liveProjects) {
        const filename = path.join(screenshotsDir, `${project.name.toLowerCase().replace(/\s+/g, '-')}.png`);
        
        if (fs.existsSync(filename)) {
            console.log(`⚬ Skipping ${project.name} (already exists)`);
            continue;
        }

        console.log(`📸 Capturing ${project.name} from ${project.homepage}...`);
        try {
            await downloadScreenshot(project.homepage, filename);
            // Add a small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
            console.error(`Failed to capture ${project.name}: ${err.message}`);
        }
    }

    console.log('Done!');
}

main().catch(console.error);