// Vercel Serverless Function — /api/send-enquiry-email
// Uses Resend to send confirmation emails to client + admin

export const config = { runtime: 'edge' }

const RESEND_API_KEY = process.env.RESEND_API_KEY!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'enquiry@sahaja.food'

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const body = await req.json()
  const { name, email, phone, event_type, event_date, event_time, guest_count, menu_preference, location, message } = body

  const details = [['Event Type', event_type], ['Date', event_date], ['Time', event_time], ['Menu', menu_preference], ['Guests', guest_count], ['Location', location || 'Not specified']]

  const clientHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2A1810;background:#FBF6ED">
      <div style="background:#3D1520;padding:32px;text-align:center">
        <h1 style="color:#FBF6ED;font-size:1.8rem;margin:0;letter-spacing:.04em">SAHAJA FOOD</h1>
        <p style="color:#D4956A;margin:8px 0 0;font-size:0.9rem">Honest Catering, Beautifully Done</p>
      </div>
      <div style="padding:40px 32px">
        <h2 style="font-size:1.4rem;margin-bottom:16px;color:#3D1520">Hi ${name}, we've received your enquiry! 🎉</h2>
        <p style="color:#7A5C48;line-height:1.7;margin-bottom:24px">
          Thank you for reaching out. We'll confirm your booking and send you a quote within a few hours.
        </p>
        <div style="background:#fff;border:1px solid #EDE3D0;padding:24px;margin-bottom:24px">
          <h3 style="font-size:1rem;margin-bottom:16px;color:#3D1520">Your Enquiry Details</h3>
          ${details.map(([l, v]) => `<p style="margin:6px 0;font-size:0.9rem"><strong>${l}:</strong> ${v}</p>`).join('')}
        </div>
        <p style="color:#7A5C48;font-size:0.875rem">Questions? WhatsApp us at +91 97319 10575 or reply to this email.</p>
      </div>
      <div style="background:#EDE3D0;padding:20px 32px;text-align:center;font-size:0.78rem;color:#7A5C48">
        © 2025 Sahaja Food · Bangalore, Karnataka
      </div>
    </div>`

  const adminRows = [
    ['Name', name],
    ['Phone', phone],
    ...(email ? [['Email', email]] : []),
    ['Event Type', event_type],
    ['Date', event_date],
    ['Time', event_time],
    ['Menu', menu_preference],
    ['Guests', guest_count],
    ['Location', location || 'Not specified'],
    ['Message', message || '—'],
  ]

  const adminHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2A1810;background:#FBF6ED">
      <div style="background:#3D1520;padding:32px;text-align:center">
        <h1 style="color:#FBF6ED;font-size:1.8rem;margin:0;letter-spacing:.04em">SAHAJA FOOD</h1>
        <p style="color:#D4956A;margin:8px 0 0;font-size:0.85rem;text-transform:uppercase;letter-spacing:.05em">New Booking Enquiry</p>
      </div>
      <div style="padding:36px 32px">
        <h2 style="font-size:1.3rem;margin:0 0 20px;color:#3D1520">New enquiry from ${name}</h2>
        <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #EDE3D0">
          ${adminRows.map(([l, v]) => `<tr><td style="padding:10px 16px;border-bottom:1px solid #EDE3D0;font-weight:600;width:140px;color:#7A5C48;font-size:0.78rem;text-transform:uppercase;letter-spacing:.04em">${l}</td><td style="padding:10px 16px;border-bottom:1px solid #EDE3D0;font-size:0.92rem">${v}</td></tr>`).join('')}
        </table>
        <p style="margin-top:28px"><a href="https://sahaja.food/admin" style="background:#3D1520;color:#FBF6ED;padding:12px 28px;text-decoration:none;font-size:0.85rem;letter-spacing:.05em;text-transform:uppercase">View in Admin →</a></p>
      </div>
      <div style="background:#EDE3D0;padding:20px 32px;text-align:center;font-size:0.78rem;color:#7A5C48">
        © 2025 Sahaja Food · Bangalore, Karnataka
      </div>
    </div>`

  const send = (to: string, subject: string, html: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Sahaja Food <bookings@sahaja.food>', to, subject, html })
    })

  try {
    const sends = [send(ADMIN_EMAIL, `New Enquiry — ${name} — ${event_type}`, adminHtml)]
    if (email) sends.push(send(email, '✅ Enquiry Received — Sahaja Food', clientHtml))
    await Promise.all(sends)
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch {
    return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 })
  }
}
