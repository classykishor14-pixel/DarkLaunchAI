import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { userEmail, userName } = await request.json();

    if (!userEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const name = userName || 'Visionary';

    const htmlBody = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #e5e7eb; padding: 40px 20px; border-radius: 12px; border: 1px solid #1f2937;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="background: linear-gradient(to right, #06b6d4, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 800; margin: 0; letter-spacing: -1px;">DarkLaunch AI</h1>
        </div>
        <div style="background-color: #0a0a0a; border: 1px solid #262626; border-radius: 8px; padding: 30px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);">
          <h2 style="color: #ffffff; font-size: 24px; margin-top: 0; font-weight: 600;">Welcome to the Future, ${name}.</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3;">
            We're thrilled to have you onboard. You've just unlocked the enterprise-ready platform that empowers you to generate production-grade landing pages in seconds.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3;">
            Our Multi-Agent workflow is standing by to turn your raw ideas into fully functional, beautiful realities. The architect designs, the developer builds, and the reviewer perfects.
          </p>
          <div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">
            <a href="#" style="background: linear-gradient(to right, #06b6d4, #9333ea); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">Start Generating</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #525252;">
          <p>&copy; ${new Date().getFullYear()} DarkLaunch AI. All rights reserved.</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'DarkLaunch AI <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Welcome to the Future of Web Creation',
      html: htmlBody,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Failed to send welcome email:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
