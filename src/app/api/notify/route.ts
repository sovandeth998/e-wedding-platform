import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, guest_name, attending, guest_count, message } = body;

    // ១. ផ្ញើទៅ Telegram
    const TELEGRAM_BOT_TOKEN = '7753177651:AAG...'; // ប្ដូរដាក់ Token បង
    const TELEGRAM_CHAT_ID = '123456789'; // ប្ដូរដាក់ ID បង
    
    let telegramMessage = type === 'RSVP' 
      ? `🔔 <b>RSVPថ្មី</b>\n👤 ${guest_name}\n📋 ${attending ? '✅ ចូលរួម' : '❌ មិនអាចចូលរួម'}\n👥 ${guest_count} នាក់`
      : `💌 <b>សារជូនពរ</b>\n👤 ${guest_name}\n💬 "${message}"`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMessage, parse_mode: 'HTML' }),
    });

    // ២. ផ្ញើទៅ Google Sheets (ដាក់ Link ដែលបងផ្ញើមកមិញ)
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwLdHu-zyOuoF-XR3RmudWf5XeikXy7PrmNQAQfYmXy_2SeKFIGOI7ymjx1xA9s4Ty6RA/exec"; 
    
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest_name, attending, guest_count, message })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}