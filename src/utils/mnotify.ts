export async function sendOrderSMS(phone: string, customerName: string, orderId: string, amount: number) {
  const apiKey = import.meta.env.MNOTIFY_API_KEY;
  const message = `Hello ${customerName}! Your Helthe Juice order (${orderId}) for GHS ${amount}.00 has been received. We are preparing your fresh batch. Thank you!`;

  if (!apiKey) {
    console.log('--- MOCK MNOTIFY CUSTOMER SMS ---');
    console.log(`To: ${phone} | Message: ${message}`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch(`https://api.mnotify.com/api/sms/quick?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: [phone],
        sender: 'HeltheJuice',
        message: message
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to send mNotify customer SMS:', error);
  }
}

export async function sendFounderAlert(orderData: {
  orderId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  totalAmount: number;
  allergies?: string;
}) {
  const apiKey = import.meta.env.MNOTIFY_API_KEY;
  const founderPhone = import.meta.env.FOUNDER_PHONE_NUMBER || '0200000000';

  const message = `🚨 NEW ORDER!\nOrder: ${orderData.orderId}\nCustomer: ${orderData.customerName} (${orderData.customerPhone})\nLocation: ${orderData.address}\nTotal: GHS ${orderData.totalAmount}.00\nAllergies: ${orderData.allergies || 'None'}`;

  if (!apiKey) {
    console.log('--- MOCK FOUNDER SMS ALERT ---');
    console.log(`To Founder (${founderPhone}):\n${message}`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch(`https://api.mnotify.com/api/sms/quick?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: [founderPhone],
        sender: 'HeltheJuice',
        message: message
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to dispatch founder SMS alert:', error);
  }
}