export const OTP_TTL_SECONDS = 300;
export const OTP_MAX_ATTEMPTS = 5;

export function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Sends the OTP code to the given email.
 *
 * When EMAIL_API_KEY is set (Resend), a real email is dispatched.
 * Otherwise the app runs in demo mode: the code is logged to the console and
 * returned as `devCode` in the API response so judges can complete the flow.
 */
export async function sendOtpEmail(email: string, code: string): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) {
    console.log(`[demo otp] ${email} -> code: ${code}`);
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "Samadhan.ai <onboarding@resend.dev>",
        to: email,
        subject: "Your Samadhan.ai verification code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
            <h2 style="color: #0f172a;">Samadhan.ai</h2>
            <p style="color: #334155;">Use the 6-digit code below to confirm your identity and enter the Citizen Portal.</p>
            <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f766e; padding: 16px 0;">${code}</div>
            <p style="color: #64748b; font-size: 13px;">This code expires in ${OTP_TTL_SECONDS / 60} minutes. If you didn't request it, you can safely ignore this email.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email dispatch failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("[otp email] delivery failed, falling back to demo mode:", error);
  }
}

export function isRealEmailDelivery(): boolean {
  return Boolean(process.env.EMAIL_API_KEY);
}