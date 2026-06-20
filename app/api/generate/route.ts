import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Step 1: Architect Agent
    const architectSystemPrompt = `You are a world-class UI/UX Designer.
Your job is to take a user's raw idea and create a highly detailed, component-by-component design spec.
Prioritize semantic HTML structure (<main>, <section>, <article>, <nav>). Design for 'Mobile-First' and ensure the layout promotes high Lighthouse scores (Core Web Vitals).
Include detailed layout instructions, spacing, modern design trends (like glassmorphism if appropriate), typography choices, and the exact Tailwind CSS color classes to use.
Do NOT write code. Write a design specification.`;

    console.log("=== RUNNING ARCHITECT AGENT ===");
    const architectResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: architectSystemPrompt,
        temperature: 0.7,
      }
    });

    const designSpec = architectResponse.text || '';
    console.log("=== DESIGN SPEC GENERATED ===");
    
    // Step 2: Developer Agent
    const developerSystemPrompt = `You are an Expert Frontend React Developer.
Your task is to take the provided design specification and write the complete, single-file HTML/React code using Tailwind CSS based ONLY on that spec.
Strictly forbid 'div soup' (unnecessary nested divs). Enforce clean, minimal Tailwind CSS classes. Ensure heading hierarchy (only one <h1>, followed by <h2> etc.) is perfect for SEO.
You MUST return a FULL, valid HTML5 document. You MUST include <script src="https://cdn.tailwindcss.com"></script> in the <head> so the styling works. Do NOT include any markdown backticks, explanations, or text outside the HTML tags. Return ONLY the raw HTML code.`;

    console.log("=== RUNNING DEVELOPER AGENT ===");
    const developerResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the design specification:\n\n${designSpec}`,
      config: {
        systemInstruction: developerSystemPrompt,
        temperature: 0.7,
      }
    });

    let rawHtml = developerResponse.text || '';
    console.log("=== RAW HTML GENERATED ===");

    // Step 3: QA Reviewer Agent (Self-Healing Engine)
    const qaSystemPrompt = `You are a strict QA/Code Reviewer.
Your task is to take the provided HTML/React code and check for any unclosed HTML/React tags, broken Tailwind classes, or formatting issues.
Audit the code for SEO and performance bloat. You must remove any redundant classes, fix broken semantic tags, and ensure the final code is lightweight and production-grade.
If you find any bugs or bloat, fix them immediately. If the code is already perfect, leave it as is.
Output ONLY the clean, final, production-ready code without any explanation or markdown code blocks.`;

    console.log("=== RUNNING QA REVIEWER AGENT ===");
    const qaResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: rawHtml,
      config: {
        systemInstruction: qaSystemPrompt,
        temperature: 0.2, // Lower temperature for more deterministic review
      }
    });

    let htmlContent = qaResponse.text || '';
    console.log("=== QA REVIEW COMPLETE ===");
    
    // Bulletproof sanitization: extract everything inside backticks if present
    const match = htmlContent.match(/```(?:html)?\s*([\s\S]*?)```/i);
    if (match) {
      htmlContent = match[1];
    }
    
    // Fallback: Remove any residual backticks or markdown markers that might have leaked
    htmlContent = htmlContent.replace(/```html/gi, '');
    htmlContent = htmlContent.replace(/```/g, '');
    htmlContent = htmlContent.trim();
    
    console.log("=== GENERATED HTML START ===");
    console.log(htmlContent);
    console.log("=== GENERATED HTML END ===");

    return NextResponse.json({ html: htmlContent });
  } catch (error: any) {
    console.error('Error generating AI content:');
    console.error('Message:', error?.message || error);
    console.error('Stack:', error?.stack || 'No stack trace');
    return NextResponse.json({ error: 'Failed to generate landing page.', details: error?.message || 'Unknown error' }, { status: 500 });
  }
}

export const maxDuration = 60;
