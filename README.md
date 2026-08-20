# Anchor Marianas

This website is the digital headquarters for my work, a central "anchor" for my ventures in software. It serves two primary functions:

1.  **My App Studio:** A showcase for the applications I build and manage. Each project is a solution to a problem I've encountered or a product I believe should exist. This is where I play the "money game": building assets, creating value, and shipping products.
2.  **My Software Agency:** A portfolio of my work for clients. It demonstrates my ability to deliver high-quality, professional software solutions for others.

## The Vision

The core principle of this site is **"Show, don't just tell."**

Instead of a static portfolio, this site is a living, breathing representation of my work. It's built to pull data directly from my GitHub repositories in real-time. The descriptions, activity, and even the README files are dynamically loaded. What you see here is a direct reflection of the code I'm shipping.

This approach ensures the portfolio is always current and provides a transparent look into my projects, from their conceptual stage (🌱) to being feature-complete (🚀).

## Technology

This is a single-page application built with vanilla HTML, CSS, and JavaScript. It uses the GitHub API as a headless CMS to fetch project data and `marked.js` to render the README files. The goal was to create a fast, lightweight, and maintainable site that effectively showcases the work itself.

## Features

- **Dynamic Project Showcase**: Projects are loaded from a `projects.json` file and enriched with live data from the GitHub API.
- **GitHub Integration**: Each project card displays the repository's description, star count, and its README file.
- **Project Sorting**: Projects are automatically sorted by their most recent GitHub activity (last push date).
- **Completeness Status**: Projects are rated for completeness (e.g., 1/3, 2/3, 3/3) with a corresponding emoji indicator (🌱, 🛠️, 🚀).
- **Responsive Design**: The website is designed to be fully responsive and accessible on all devices.

## Technologies Used

- **Frontend**: HTML5, CSS3, vanilla JavaScript
- **APIs**: GitHub API
- **Libraries**: [marked.js](https://github.com/markedjs/marked) for rendering README markdown content.

## How to Use

The website is a single-page application. The "Studio" tab displays the software projects. Each project card is clickable and links to the live version of the application if available. The content on the cards, such as the description and the README, is pulled directly from GitHub.

## Using your own Anthropic API key

This app includes an `/api/anthropic` proxy so Cofounder agents (or any client) can route heavy inference tasks through your own Anthropic API account instead of shared managed credits.

### 1. Set the environment variable

Add `ANTHROPIC_API_KEY` to your Vercel dashboard (or local `.env`):

```
ANTHROPIC_API_KEY=sk-ant-your_key_here
```

Then redeploy. The key is never committed to the repo.

### 2. Call the proxy

**cURL:**

```bash
curl -X POST https://anchormarianas.com/api/anthropic \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello, Claude"}],
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 4096,
    "temperature": 0.7
  }'
```

**CLI script:**

```bash
# Local dev
npx tsx scripts/anthropic-task.ts "Write a React hook for debounced search"

# Point at production
npx tsx scripts/anthropic-task.ts "Summarize this code" \
  --base-url https://anchormarianas.com/api/anthropic

# Or load a full JSON payload
npx tsx scripts/anthropic-task.ts --file task.json
```

**JSON payload example (`task.json`):**

```json
{
  "messages": [
    {"role": "user", "content": "Write a TypeScript function that..."}
  ],
  "model": "claude-3-5-sonnet-20241022",
  "system": "You are a senior TypeScript engineer.",
  "max_tokens": 4096,
  "temperature": 0.2
}
```

### 3. Streaming

Set `"stream": true` in the request body to receive a Server-Sent Events (SSE) stream of text chunks. Omit it (or set `false`) for a simple JSON response.

### 4. How it works

- Cofounder still uses its own LLM for light orchestration.
- For heavy tasks (code generation, long reasoning, batch processing), agents can `POST` to `/api/anthropic`.
- The route reads `ANTHROPIC_API_KEY` from the environment, calls Anthropic's API, and returns the response.
- The proxy runs on the Edge runtime and supports both streaming and non-streaming modes.
