import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemPrompt = `You are an elite, full-stack AI Engineering Team consisting of a UX Architect, an Expert React Developer, and a Strict QA Reviewer. 
Your task is to take a user's raw idea and generate a complete, production-ready, single-file HTML/React Tailwind component.

Follow these strict guidelines:
1. UX/Architect: Prioritize semantic HTML structure (<main>, <section>, <article>, <nav>). Design for 'Mobile-First' and ensure the layout promotes high Lighthouse scores (Core Web Vitals). Use modern design trends (like glassmorphism if appropriate), typography choices, and premium Tailwind CSS color classes.
2. React Developer: Strictly forbid 'div soup' (unnecessary nested divs). Enforce clean, minimal Tailwind CSS classes. Ensure heading hierarchy (only one <h1>, followed by <h2> etc.) is perfect for SEO.
3. QA Reviewer: Audit the code for SEO and performance bloat. You must remove any redundant classes, fix broken semantic tags, and ensure the final code is lightweight, zero-bloat, and production-grade.
4. Performance & Speed: To prevent timeouts, you MUST be extremely concise. Output ONLY the raw code as fast as possible. DO NOT output any markdown explanations, markdown code blocks, intros, or outros. 

You MUST return a FULL, valid HTML5 document. You MUST include <script src="https://cdn.tailwindcss.com"></script> in the <head> so the styling works.`;

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "A space themed landing page",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });
    
    let htmlContent = response.text || '';
    
    const match = htmlContent.match(/```(?:html)?\s*([\s\S]*?)```/i);
    if (match) {
      htmlContent = match[1];
    }
    
    htmlContent = htmlContent.replace(/```html/gi, '');
    htmlContent = htmlContent.replace(/```/g, '');
    htmlContent = htmlContent.trim();
    
    fs.writeFileSync('test.html', htmlContent);
    console.log("Saved to test.html. Length:", htmlContent.length);
    
  } catch (e) {
    console.error("Error:", e);
  }
}

run();
