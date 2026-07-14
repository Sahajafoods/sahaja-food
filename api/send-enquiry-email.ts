// Vercel Serverless Function — /api/send-enquiry-email
// Uses Resend to send confirmation emails to client + admin

export const config = { runtime: 'edge' }

const RESEND_API_KEY = process.env.RESEND_API_KEY!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@sahaja.food'

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const body = await req.json()
  const { name, email, phone, event_type, event_date, event_time, guest_count, menu_preference, location, message } = body

  const details = [['Event Type', event_type], ['Date', event_date], ['Time', event_time], ['Guests', guest_count], ['Menu', menu_preference], ['Location', location || 'Not specified']]

  const clientHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2C2C2C">
      <div style="background:#1B3A2D;padding:32px;text-align:center">
        <h1 style="color:white;font-size:1.8rem;margin:0">Sahaja Food</h1>
        <p style="color:#E8A63C;margin:8px 0 0;font-size:0.9rem">Honest Catering, Beautifully Done</p>
      </div>
      <div style="padding:40px 32px">
        <h2 style="font-size:1.4rem;margin-bottom:16px">Hi ${name}, we've received your enquiry! 🎉</h2>
        <p style="color:#8A7D70;line-height:1.7;margin-bottom:24px">
          Thank you for reaching out. We'll confirm your booking and send you a quote within a few hours.
        </p>
        <div style="background:#FBF8F3;border-radius:12px;padding:24px;margin-bottom:24px">
          <h3 style="font-size:1rem;margin-bottom:16px;color:#1B3A2D">Your Enquiry Details</h3>
          ${details.map(([l, v]) => `<p style="margin:6px 0;font-size:0.9rem"><strong>${l}:</strong> ${v}</p>`).join('')}
        </div>
        <p style="color:#8A7D70;font-size:0.875rem">Questions? WhatsApp us at +91 97319 10575 or reply to this email.</p>
      </div>
      <div style="background:#F5EAD8;padding:20px 32px;text-align:center;font-size:0.78rem;color:#8A7D70">
        © 2025 Sahaja Food · Bangalore, Karnataka
      </div>
    </div>`

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2>New Enquiry — ${name}</h2>
      <table style="width:100%;border-collapse:collapse">
        ${[['Name', name], ['Phone', phone], ['Email', email], ...details, ['Message', message || '—']].map(([l, v]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;width:140px">${l}</td><td style="padding:8px;border-bottom:1px solid #eee">${v}</td></tr>`).join('')}
      </table>
      <p style="margin-top:24px"><a href="https://sahaja.food/admin" style="background:#1B3A2D;color:white;padding:12px 24px;border-radius:8px;text-decoration:none">View in Admin →</a></p>
    </div>`

  const send = (to: string, subject: string, html: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Sahaja Food <hello@sahaja.food>', to, subject, html })
    })

  try {
    await Promise.all([
      send(email, '✅ Enquiry Received — Sahaja Food', clientHtml),
      send(ADMIN_EMAIL, `🔔 New Enquiry — ${name} · ${event_type} · ${guest_count} guests`, adminHtml)
    ])
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch {
    return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 })
  }
}
