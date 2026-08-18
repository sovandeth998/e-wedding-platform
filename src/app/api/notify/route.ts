import { NextResponse } from 'next/server';

// កន្លែងនេះត្រូវដាក់ Telegram Bot Token និង Chat ID របស់អ្នកពេលក្រោយ
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, guest_name, attending, guest_count, message } = body;

    let telegramMessage = '';

    if (type === 'RSVP') {
      const status = attending ? '✅ ចូលរួម' : '❌ មិនអាចចូលរួម';
      const countText = attending ? `\n👥 ចំនួនភ្ញៀវ: ${guest_count} នាក់` : '';
      telegramMessage = `🔔 <b>មានការឆ្លើយតបថ្មី (RSVP)</b>\n\n👤 ភ្ញៀវ: <b>${guest_name}</b>\n📋 ស្ថានភាព: ${status}${countText}\n⏰ ពេលវេលា: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' })}`;
    } else if (type === 'WISH') {
      telegramMessage = `💌 <b>មានសារជូនពរថ្មី</b>\n\n👤 ពីភ្ញៀវ: <b>${guest_name}</b>\n💬 សារ:\n<i>"${message}"</i>\n\n⏰ ពេលវេលា: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' })}`;
    }

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      });
    }

    return NextResponse.json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error processing notification:', error);
    return NextResponse.json({ success: false, error: 'Failed to process notification' }, { status: 500 });
  }
}
