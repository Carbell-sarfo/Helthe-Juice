import { sendOrderSMS } from '../../utils/mnotify';
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { customerName, customerPhone, address, deliveryDate, bundleSize, flavors } = data;

    // Pricing calculation (e.g., 15 GHS per bottle)
    const pricePerBottle = 15;
    const totalAmount = bundleSize * pricePerBottle;
    const orderId = `HJ-${Date.now().toString().slice(-6)}`;

    // Read credentials from environment variables
    const payAngelApiKey = import.meta.env.PAYANGEL_API_KEY;
    const merchantId = import.meta.env.PAYANGEL_MERCHANT_ID;

    if (payAngelApiKey && merchantId) {
      // --- LIVE PAYANGEL INTEGRATION ---
      // Once your account is active, PayAngel's API endpoint handles the transaction request
      try {
        const payAngelResponse = await fetch('https://api.payangel.com/v1/checkout/initiate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${payAngelApiKey}`
          },
          body: JSON.stringify({
            merchant_id: merchantId,
            reference: orderId,
            amount: totalAmount,
            currency: 'GHS',
            customer: {
              name: customerName,
              phone: customerPhone
            },
            redirect_url: `${new URL(request.url).origin}/order-success?orderId=${orderId}&amount=${totalAmount}`
          })
        });

        const payAngelResult = await payAngelResponse.json();

        if (payAngelResponse.ok && payAngelResult.checkout_url) {
          return new Response(
            JSON.stringify({
              success: true,
              redirectUrl: payAngelResult.checkout_url
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (apiErr) {
        console.error('Live PayAngel API error, falling back or logging:', apiErr);
      }
    }

    // --- MOCK MODE (Active while waiting for account confirmation) ---
    console.log('--- MOCK PAYMENT INITIATED ---');
    console.log(`Order ID: ${orderId} | Customer: ${customerName} | Total: GHS ${totalAmount}`);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderId,
        totalAmount: totalAmount,
        message: 'Order created successfully!',
        redirectUrl: `/order-success?orderId=${orderId}&amount=${totalAmount}`
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Payment processing error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Payment initiation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};