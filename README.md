# N8 Website

Веб-сайт з адмін-панеллю для управління проектами.

## Технології

### Frontend
- Angular
- Angular Material
- TypeScript

### Backend
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication

## Вимоги

- Docker
- Docker Compose
- Node.js 18+

## Налаштування проекту

1. Клонуйте репозиторій:
```bash
git clone <repository-url>
cd n8-website
```

2. Створіть файл `.env` в кореневій директорії:
```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-secure-password
DB_DATABASE=n8_website

# JWT
JWT_SECRET=your-secure-jwt-secret

# URLs
FRONTEND_URL=http://localhost:4200
BACKEND_URL=http://localhost:3000

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=n8_website
```

3. Згенеруйте JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Запуск проекту

1. Запустіть проект через Docker Compose:
```bash
docker-compose up --build
```

2. Доступні сервіси:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- PostgreSQL: localhost:5432

## Розробка

### Структура проекту
```
.
├── frontend/           # Angular frontend
├── backend/           # NestJS backend
├── docker-compose.yml # Docker configuration
└── .env              # Environment variables
```

### Корисні команди

```bash
# Перегляд логів
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Перезапуск сервісів
docker-compose restart backend
docker-compose restart frontend

# Доступ до бази даних
docker-compose exec postgres psql -U postgres -d n8_website

# Зупинка проекту
docker-compose down

# Зупинка та видалення даних
docker-compose down -v
```

## Безпека

- Всі чутливі дані зберігаються в `.env` файлі
- `.env` файл не включено до репозиторію
- Використовується JWT для автентифікації
- База даних доступна тільки всередині Docker мережі

## Ліцензія

MIT
