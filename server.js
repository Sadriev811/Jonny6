import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

const app = express();
const port = 5500;

app.use(jsonParser);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/sendToTelegram', async (req, res) => {
  try {
    const backetObj = req.body;

    const botToken = '6464331885:AAEXYsC0OoOJW_9lo97i4eX1xLGQFKYTfwA';
    const chatId = '5000184671';

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const text = `Новый заказ: ${JSON.stringify(backetObj)}`;
    const params = `chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    // Отправляем сообщение в телеграм
    const response = await fetch(`${url}?${params}`, { method: 'GET' });
    const data = await response.json();

    res.json({ success: true, message: 'Данные успешно отправлены в телеграм', data });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ success: false, message: 'Ошибка при отправке в телеграм', error });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});