import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 60;

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = `You are an elite, full-stack AI Engineering Team consisting of a UX Architect, an Expert React Developer, and a Strict QA Reviewer. 
Your task is to take a user's raw idea and generate a complete, production-ready, single-file HTML/React Tailwind component.

Follow these strict guidelines:
1. UX/Architect: Prioritize semantic HTML structure (<main>, <section>, <article>, <nav>). Design for 'Mobile-First' and ensure the layout promotes high Lighthouse scores (Core Web Vitals). Use modern design trends (like glassmorphism if appropriate), typography choices, and premium Tailwind CSS color classes.
2. React Developer: Strictly forbid 'div soup' (unnecessary nested divs). Enforce clean, minimal Tailwind CSS classes. Ensure heading hierarchy (only one <h1>, followed by <h2> etc.) is perfect for SEO.
3. QA Reviewer: Audit the code for SEO and performance bloat. You must remove any redundant classes, fix broken semantic tags, and ensure the final code is lightweight, zero-bloat, and production-grade.
4. Performance & Speed: To prevent timeouts, you MUST be extremely concise. Output ONLY the raw code as fast as possible. DO NOT output any markdown explanations, markdown code blocks, intros, or outros. 

You MUST return a FULL, valid HTML5 document. You MUST include <script src="https://cdn.tailwindcss.com"></script> in the <head> so the styling works.`;

    console.log("=== RUNNING COMBINED GENERATION AGENT ===");
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    let htmlContent = response.text || '';
    console.log("=== GENERATION COMPLETE ===");
    
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
