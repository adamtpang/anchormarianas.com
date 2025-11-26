import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1]?.content || ""

    // For now, we'll create a simple response based on keywords
    // You can later integrate with Claude API or other LLM services
    let response = ""

    const lowerMessage = lastUserMessage.toLowerCase()

    // Detect project type and provide relevant response
    if (lowerMessage.includes("website") || lowerMessage.includes("landing page")) {
      response = `Great! I can help with websites and landing pages. Here's what I need to know:

1. What's the main goal? (e.g., lead generation, e-commerce, portfolio)
2. How many pages do you need?
3. Any specific features? (forms, payment, user accounts, etc.)
4. Do you have existing branding or need that too?

Our Quick Build starts at $900 for a landing page (12 days), or Standard Build at $2,200 for up to 8 pages (14 days).

Ready to book a call? https://calendly.com/adamtpang`
    } else if (lowerMessage.includes("app") || lowerMessage.includes("application")) {
      response = `Awesome! Tell me more about your app idea:

1. What problem does it solve?
2. Who are your target users?
3. Key features you need in v1?
4. Web app, mobile app, or both?
5. Any integrations needed? (payment, APIs, databases)

For apps, we typically start with the Custom Build package ($2,600+) to handle the complexity.

Want to discuss details? Book a free call: https://calendly.com/adamtpang`
    } else if (lowerMessage.includes("chrome") || lowerMessage.includes("extension")) {
      response = `Chrome extensions are great for productivity tools! What does your extension do?

Key questions:
1. What's the core functionality?
2. Does it need to work on specific websites or all sites?
3. Any backend/API needed?
4. User data storage requirements?

Extensions typically fall under our Custom Build package. Let's chat about it: https://calendly.com/adamtpang`
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      response = `Here's our pricing structure:

💙 Quick Build: $900 (12 days)
- 1 landing page
- Responsive design
- SEO optimization
- Logo included

⭐ Standard Build: $2,200 (14 days) - MOST POPULAR
- Up to 8 pages
- Custom branding
- Forms & integrations
- Performance optimized

🚀 Custom Build: $2,600+ (<30 days)
- Unlimited pages
- Advanced functionality
- Database & backend
- API development

All packages include direct communication and clear timelines. Want to discuss which fits your needs? https://calendly.com/adamtpang`
    } else if (lowerMessage.includes("timeline") || lowerMessage.includes("how long") || lowerMessage.includes("when")) {
      response = `We ship fast:

- Quick Build: 12 days
- Standard Build: 14 days
- Custom Build: Under 30 days

You'll get updates every 48 hours throughout the project. No dragging things out, no endless revisions.

Ready to get started? Book a call: https://calendly.com/adamtpang`
    } else if (lowerMessage.includes("portfolio") || lowerMessage.includes("examples") || lowerMessage.includes("work")) {
      response = `You can check out our Products section above to see live projects we've built!

We've worked with:
- Prospera
- Hilton
- Network School
- IDI Guam

Each project focuses on solving real problems with clean, functional design.

Want to see something specific? Let's chat: https://calendly.com/adamtpang`
    } else if (messages.length <= 2) {
      // Initial message, be welcoming
      response = `Perfect! To help you best, tell me:

1. What type of project? (website, web app, Chrome extension, etc.)
2. What's the main goal?
3. Any timeline or budget in mind?

I'll help connect you with the team and we can discuss your specific needs!`
    } else {
      // Generic helpful response
      response = `Thanks for sharing that! To give you the best guidance, could you tell me more about:

- What you're trying to build
- Who it's for
- Key features you need

Or if you'd like to jump straight to discussing your project in detail, book a free 20-minute call: https://calendly.com/adamtpang

No commitment required - just a chance to see if we're a good fit!`
    }

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
