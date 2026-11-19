// src/pages/api/send-sms.ts
export const prerender = false;
import type { APIRoute } from 'astro';

function formatGhanaPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    return '233' + digits.slice(1);
  }
  if (digits.startsWith('233') && digits.length === 12) {
    return digits;
  }
  return digits;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { phone, message } = await request.json();

    if (!phone || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Phone and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formattedRecipient = formatGhanaPhone(phone);
    const apiKey = import.meta.env.MNOTIFY_API_KEY;
    const senderId = import.meta.env.MNOTIFY_SENDER_ID || 'HeltheJuice';

    if (!apiKey) {
      console.warn('MNOTIFY_API_KEY is missing in environment variables.');
      return new Response(JSON.stringify({ success: false, error: 'SMS provider not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(`https://api.mnotify.com/api/sms/quick?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: [formattedRecipient],
        sender: senderId,
        message: message,
        is_schedule: false,
        schedule_date: ''
      })
    });

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('mNotify SMS dispatch error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};