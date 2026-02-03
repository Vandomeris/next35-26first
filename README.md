1. npm i
2. Создаем в корне проекта файл .env с текстом DATABASE_URL="file:./dev.db"
3.1. Добавляем в .env AUTH_SECRET="произвольный набор букв"
3. npx prisma generate
4. npm run dev
