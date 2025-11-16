import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { number } = req.body || {};
  if (!number) return res.status(400).json({ message: "Example : 62xxxxx" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Form Banding" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Questions regarding the whatsapp application",
      text: `Dear WhatsApp team, let me introduce myself. My name is [RijalJunior]. I am a WhatsApp user experiencing login issues. The problem is "Login is currently unavailable." This issue occurs frequently and repeatedly. I have requested assistance multiple times through the same Gmail account, and have experienced a limit/24 hours left to appeal. Please, WhatsApp, resolve the issue with my WhatsApp account. My number is (${number}). Thank you for your help and attention.

Yours sincerely
[RijalJunior]`,
    });
    res.status(200).json({ message: "Banding berhasil dikirim!" });
  } catch (err) {
    res.status(500).json({ message: "Kesalahan saat mengirim email", error: err.message });
  }
      }
