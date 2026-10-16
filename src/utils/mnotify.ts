export async function sendOrderSMS(phone: string, customerName: string, orderId: string, amount: number) {
  const apiKey = import.meta.env.MNOTIFY_API_KEY;
  
  const message = `Hello ${customerName}! Your Helthe Juice order (${orderId}) for GHS ${amount}.00 has been received. We are preparing your fresh batch. Thank you!`;

  if (!apiKey) {
    console.log('--- MOCK MNOTIFY SMS ---');
    console.log(`To: ${phone}`);
    console.log(`Message: ${message}`);
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

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send mNotify SMS:', error);
    return { success: false, error };
  }
}