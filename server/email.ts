import type { Transporter } from "nodemailer";
import { createTransport } from "nodemailer";

export const OTP_TTL_SECONDS = 300;
export const OTP_MAX_ATTEMPTS = 5;

let transporter: Transporter | null = null;

export function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 587);

  transporter = createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
    },
  });

  return transporter;
}

/**
 * Sends the OTP code to the given email over SMTP (defaults to Gmail).
 *
 * Requires SMTP_USER and SMTP_PASS (a Gmail App Password).
 * If they are unset the app runs in demo mode: the code is logged to the
 * console and `delivered: false` is returned. If SMTP delivery fails (e.g.
 * bad credentials or rejected recipient), the failure is logged and
 * `delivered: false` is returned so the caller can fall back to demo mode
 * by surfacing the code directly to the user.
 */
export async function sendOtpEmail(
  email: string,
  code: string,
): Promise<{ delivered: boolean }> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.log(`[demo otp] ${email} -> code: ${code}`);
    return { delivered: false };
  }

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_FROM ?? `Samadhan.ai <${user}>`,
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
    });

    return { delivered: true };
  } catch (error) {
    console.error(`[otp email] delivery to ${email} failed, falling back to demo mode:`, error);
    return { delivered: false };
  }
}