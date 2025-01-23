# Используем базовый образ Node.js
FROM node:18-alpine

# Указываем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем весь проект в контейнер
COPY . .

ENV NODE_ENV=production
# Открываем порт для работы приложения
EXPOSE 3000

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]
