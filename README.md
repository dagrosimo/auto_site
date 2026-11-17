# KORO // Auto Chemistry Lab Polska

Sklep oraz landing page chemii samochodowej i detailingowej w Polsce z bezpośrednim przesyłaniem zgłoszeń i zamówień do Telegrama właściciela.

## Uruchomienie lokalne

1. Upewnij się, że masz Python 3.11+ oraz pakiety z `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
2. Skonfiguruj plik `.env` (token bota Telegram jest przechowywany wyłącznie po stronie serwera):
   ```env
   TELEGRAM_BOT_TOKEN=twój_token_bota
   TELEGRAM_CHAT_ID=
   PORT=8080
   HOST=127.0.0.1
   ```
3. Uruchom serwer:
   ```bash
   python server.py
   ```
4. Otwórz w przeglądarce `http://127.0.0.1:8080`.

## Podpięcie Telegrama właściciela

- Jeśli `TELEGRAM_CHAT_ID` w `.env` jest puste, wyślij raz `/start` do swojego bota na Telegramie i kliknij **Odśwież** w sekcji formularza na stronie (lub wyślij pierwsze zgłoszenie) — serwer automatycznie wykryje Twój `chat_id` i zapisze go lokalnie w `data/telegram_chat_id.txt`.
- Każde zgłoszenie zapisuje się dodatkowo w `data/leads.jsonl`, więc żadne zapytanie klienta nie zginie.
