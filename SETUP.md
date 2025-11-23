# 🚀 Инструкция по запуску фронтенда на новом устройстве

## 📋 Требования

- Node.js 18+ или выше
- npm или yarn
- Git
- Запущенный бэкенд на http://localhost:5000

## 🔧 Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/Frosty1769/KPO_Lab_front.git
cd KPO_Lab_front
git checkout rabochaya
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск dev-сервера

```bash
npm run dev
```

Приложение откроется на:
- http://localhost:5173

## 📦 Используемые технологии

- **React** 19.1.1 - UI библиотека
- **TypeScript** 5.9.3 - типизация
- **Vite** 7.2.2 - сборщик и dev-сервер
- **Tailwind CSS** 4.0 - стилизация
- **React Router** 7.9.5 - роутинг
- **Axios** - HTTP клиент
- **React Toastify** - уведомления

## ⚙️ Настройка

### Файл `.env`

```env
VITE_MAIN_URL=http://localhost:5000
```

Этот URL указывает на бэкенд API. Если бэкенд на другом адресе - измените его.

## 🔑 Дефолтные учетные данные

После запуска бэкенда доступны:
- **Администратор:** admin / admin
- **Роль:** Полный доступ к управлению товарами, пользователями и отчётам

## 📁 Структура проекта

```
KPO_Lab_front/
├── index.html           # HTML шаблон
├── package.json         # Зависимости и скрипты
├── vite.config.ts       # Конфигурация Vite
├── .env                 # URL бэкенда
└── src/
    ├── main.tsx         # Точка входа
    ├── App.tsx          # Главный компонент с роутингом
    ├── api/
    │   ├── functions.ts # API функции
    │   └── requester.ts # HTTP клиент
    ├── pages/
    │   ├── AuthPage.tsx     # Страница входа
    │   ├── AdminPage.tsx    # Админ панель
    │   └── CashierPage.tsx  # Интерфейс кассира
    ├── interfaces/
    │   ├── Auth.ts      # Типы для аутентификации
    │   └── Product.ts   # Типы для товаров
    ├── enums/
    │   └── Path.ts      # API пути
    ├── hooks/
    │   └── AuthContext.tsx  # Контекст авторизации
    └── inputs/          # UI компоненты (кнопки, поля ввода)
```

## 🎯 Функционал

### Администратор
- ✅ Управление товарами (добавление, удаление)
- ✅ Управление пользователями (создание кассиров/админов, удаление)
- ✅ Экспорт отчёта о продажах (CSV с агрегацией)
- ✅ Обнуление истории продаж

### Кассир
- ✅ Добавление товаров в корзину по артикулу
- ✅ Изменение количества товаров
- ✅ Обработка оплаты
- ✅ Списание товаров со склада

## 🔗 API Endpoints

Все запросы идут на `VITE_MAIN_URL`:

**Пользователи:**
- POST `/api/user/login` - вход
- POST `/api/user/register` - создание пользователя
- GET `/api/user/info` - информация о текущем пользователе
- POST `/api/user/logout` - выход
- GET `/api/user/list` - список пользователей
- DELETE `/api/user/delete/:id` - удаление пользователя

**Товары:**
- POST `/api/products/add` - добавление товара
- GET `/api/products/list` - список товаров
- DELETE `/api/products/delete/:article` - удаление товара
- POST `/api/products/sale` - обработка продажи

**Отчёты:**
- GET `/api/products/sales-report` - отчёт о продажах
- POST `/api/products/clear-sales` - очистка истории продаж

## 🛠️ Команды разработки

```bash
# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Preview собранной версии
npm run preview

# Линтинг
npm run lint
```

## 🐛 Решение проблем

### Ошибка "Cannot connect to backend"
- Убедитесь что бэкенд запущен на http://localhost:5000
- Проверьте `.env` файл

### Белый экран после логина
- Откройте DevTools (F12) → Console
- Проверьте есть ли ошибки сети
- Попробуйте очистить cookies (Ctrl+Shift+Del)

### Сессия не сохраняется
- Убедитесь что фронт открыт на `localhost:5173` (не 127.0.0.1)
- Бэкенд должен быть на `localhost:5000`
