export const prerender = false; // Tells Astro this is a dynamic server endpoint

import type { APIRoute } from 'astro';


export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { customerName, customerPhone, address, deliveryDate, bundleSize, flavors } = data;

    // 1. Calculate price in GHS (Example: 15 GHS per bottle)
    const pricePerBottle = 15;
    const totalAmount = bundleSize * pricePerBottle;

    // Generate a unique order ID
    const orderId = `HJ-${Date.now().toString().slice(-6)}`;

    // Check if PayAngel API keys exist in .env
    const payAngelApiKey = import.meta.env.PAYANGEL_API_KEY;

    if (payAngelApiKey) {
      // LIVE PAYANGEL API CALL (When keys are supplied)
      // const response = await fetch('https://api.payangel.com/v1/checkout', { ... });
      // const result = await response.json();
      // return new Response(JSON.stringify({ redirectUrl: result.checkout_url }), { status: 200 });
    }

    // 2. MOCK MODE (For testing without live account)
    console.log('--- NEW ORDER RECEIVED ---');
    console.log(`Order ID: ${orderId}`);
    console.log(`Customer: ${customerName} (${customerPhone})`);
    console.log(`Total: GHS ${totalAmount}`);
    console.log(`Address: ${address} | Date: ${deliveryDate}`);
    console.log(`Flavors:`, flavors);

    // Simulate successful PayAngel link generation
    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderId,
        totalAmount: totalAmount,
        message: 'Order created successfully! Redirecting to PayAngel payment portal...',
        // Simulated PayAngel checkout redirect
        redirectUrl: `/order-success?orderId=${orderId}&amount=${totalAmount}`
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Payment initiation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};