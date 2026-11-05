// src/pages/api/send-sms.ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { phone, message } = await request.json();

    if (!phone || !message) {
      return new Response(JSON.stringify({ error: 'Phone and message are required' }), { status: 400 });
    }

    // Format phone number to Ghana 233 format
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '233' + cleanPhone.slice(1);
    }

    const API_KEY = "0JvscYd9KP5RGzOd1qNmlawN8";
    const SENDER_ID = "HeltheJuice"; // Make sure this Sender ID is approved in your mNotify dashboard

    const url = `https://api.mnotify.com/api/sms/quick?key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: [cleanPhone],
        sender: SENDER_ID,
        message: message,
        is_schedule: false,
        schedule_date: ''
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });

  } catch (err: any) {
    console.error('mNotify SMS Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};