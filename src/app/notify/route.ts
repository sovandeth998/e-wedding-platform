import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, guest_name, attending, guest_count, message, telegram_chat_id } = body;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = telegram_chat_id || process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ error: 'Missing Telegram configuration' }, { status: 400 });
    }

    let text = '';
    if (type === 'RSVP') {
      const statusIcon = attending ? '✅ ចូលរួម' : '❌ មិនអាចចូលរួមបានទេ';
      text = `💌 *ដំណឹងឆ្លើយតបការចូលរួម (RSVP ថ្មី)*\n\n👤 *ភ្ញៀវ:* ${guest_name}\n📌 *ស្ថានភាព:* ${statusIcon}\n👥 *ចំនួនអ្នកចូលរួម:* ${guest_count || 1} នាក់\n⏰ *ពេលវេលា:* ${new Date().toLocaleString('km-KH', { timeZone: 'Asia/Phnom_Penh' })}`;
    } else if (type === 'WISH') {
      text = `💐 *សារជូនពរថ្មី (New Wish)*\n\n👤 *ពី:* ${guest_name}\n💬 *ពាក្យជូនពរ:* "${message}"\n⏰ *ពេលវេលា:* ${new Date().toLocaleString('km-KH', { timeZone: 'Asia/Phnom_Penh' })}`;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send to Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}