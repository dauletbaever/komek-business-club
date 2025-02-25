import { telegramConfig } from '../config/telegram';

export const sendToTelegram = async (formData) => {
  const text = `
🔥 Новая заявка с сайта!

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}
📧 Email: ${formData.email}
📦 Пакет: ${formData.package}
💬 Сообщение: ${formData.message}
`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramConfig.chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error('Ошибка отправки в Telegram');
    }

    return true;
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  }
}; 