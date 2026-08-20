# Jim Fung, corpus brain

153 episodes, 967,567 words. Built with youchop.app.
You own this outright.

## Setup

    npm install
    node ask.mjs "what does this channel say about pricing"

That is the whole thing. **No API key, no account, no cloud, no cost.**

The search index ships pre-built, so your first question answers immediately rather than
spending minutes embedding. Searching runs locally on your machine (bge-small-en-v1.5 via
ONNX); the first run downloads a ~35MB model once. Nothing leaves your computer.

If you edit or add pages, `ask.mjs` notices and re-indexes itself.

## Asking

    node ask.mjs "how do they think about hiring"
    node ask.mjs "pricing" --top 10
    node ask.mjs "focus" --raw          # allow several hits from one episode
    node ask.mjs --rebuild              # re-index after adding pages

Each answer cites the episode and, where the page carries timestamps, links straight to
the moment in the video.

## What is in here

    pages/          one markdown file per episode, with frontmatter and a source link.
                    Paragraphs are headed by timestamped deep links, so any passage
                    you find points back to the exact second it came from.
    ask.mjs         the local search tool above.
    index.json      chunk text and metadata for the pre-built search index.
    vectors.bin     the embeddings, raw float32. Regenerate both with --rebuild.

The pages are plain markdown. Nothing is locked in: drop them into Obsidian, grep them,
paste them into any LLM, or index them with another tool.

## Optional: use it from an AI agent

The pages work as-is with any tool that reads markdown. If you want a heavier setup with
a knowledge graph and MCP support, gbrain (github.com/garrytan/gbrain, MIT) can index
`pages/`, though it requires a paid embedding provider (OpenAI, Voyage, or ZeroEntropy)
because it does not support local embeddings.

## Note on the source material

These transcripts are the creator's copyrighted work. This brain is private input for
research and synthesis. Do not republish the transcripts.
