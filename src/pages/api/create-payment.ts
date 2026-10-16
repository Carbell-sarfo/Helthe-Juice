// src/pages/api/create-payment.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { addOrder } from '../../utils/orderStore';
import { sendOrderSMS, sendFounderAlert } from '../../utils/mnotify'; // 1. Import both helpers

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { customerName, customerPhone, address, deliveryDate, bundleSize, flavors, allergies } = data;

    const pricePerBottle = 15;
    const totalAmount = bundleSize * pricePerBottle;
    const orderId = `HJ-${Date.now().toString().slice(-6)}`;

    // Save to Admin Dashboard Store
    addOrder({
      id: orderId,
      customerName,
      customerPhone,
      address,
      deliveryDate,
      bundleSize,
      flavors,
      totalAmount,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });

    // --- TRIGGER NOTIFICATIONS ---
    
    // 2. Send SMS confirmation to the customer
    await sendOrderSMS(customerPhone, customerName, orderId, totalAmount);

    // 3. Send SMS alert to the founder
    await sendFounderAlert({
      orderId,
      customerName,
      customerPhone,
      address,
      totalAmount,
      allergies: allergies || 'None'
    });

    // Return success response to frontend
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