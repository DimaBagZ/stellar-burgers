# Stellar Burgers

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🌐%20Online-brightgreen)](https://dimabagz.github.io/stellar-burgers/)
[![GitHub](https://img.shields.io/badge/GitHub-📁%20Repository-blue)](https://github.com/DimaBagZ/stellar-burgers)
[![Tests](https://img.shields.io/badge/Tests-✅%20Passing-green)](https://github.com/DimaBagZ/stellar-burgers/actions)

**Современное веб-приложение для заказа бургеров** с полным функционалом интернет-магазина. React + TypeScript + Redux Toolkit + WebSocket.

**🌐 [Живая демо-версия](https://dimabagz.github.io/stellar-burgers/)** - Соберите свой идеальный бургер!

## О проекте

Stellar Burgers - это веб-приложение для заказа бургеров, разработанное с использованием React, TypeScript и Redux Toolkit. Приложение позволяет пользователям собирать собственные бургеры из доступных ингредиентов, оформлять заказы и отслеживать их статус.

### Основной функционал

- Сборка бургера из доступных ингредиентов
- Оформление заказов (требуется авторизация)
- Просмотр ленты заказов
- Личный кабинет с историей заказов
- Регистрация и авторизация пользователей
- Восстановление пароля

### Технические особенности

- **Redux слайсы:**

  - `burgerConstructorSlice` - управление конструктором бургера
  - `userSlice` - управление данными пользователя
  - `currentOrderSlice` - управление текущим заказом
  - `feedOrdersSlice` - управление лентой заказов
  - `orderDetailsSlice` - детали заказа
  - `userOrdersSlice` - история заказов пользователя

- **Роутинг:**

  - Защищенные роуты для авторизованных пользователей
  - Модальные окна через роутинг
  - Редиректы для неавторизованных пользователей

- **Авторизация:**
  - JWT токены
  - Автоматическое обновление токена
  - Защита роутов

# Проектная работа 11-го спринта

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Разверните проект и ознакомьтесь с кодом. Все необходимые вам компоненты уже созданы и лежат в папке `src/components`

2. Настройте роутинг.

3. Напишите функционал запросов данных с сервера, используя `Redux` и глобальный `store`. Сами "ручки" уже прописаны и лежат в `utils/burger-api.ts`

4. Настройте авторизацию и создайте защищённые роуты.

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.

## Описание

Stellar Burger - это приложение для заказа бургеров, разработанное с использованием React, TypeScript и Redux Toolkit. Приложение позволяет пользователям собирать бургеры из различных ингредиентов, оформлять заказы и отслеживать их статус.

## Функциональность

- Сборка бургера из доступных ингредиентов
- Регистрация и авторизация пользователей
- Оформление заказов
- Просмотр истории заказов
- Отслеживание статуса заказа в реальном времени

## 🛠 Технологии

| Категория         | Технологии                        |
| ----------------- | --------------------------------- |
| **Frontend**      | React 18, TypeScript, CSS Modules |
| **State**         | Redux Toolkit, RTK Query          |
| **Routing**       | React Router v6                   |
| **Real-time**     | WebSocket, Socket.io              |
| **Testing**       | Jest, Cypress, Testing Library    |
| **Build**         | Webpack 5, Babel, PostCSS         |
| **Code Quality**  | ESLint, Prettier, Husky           |
| **Documentation** | Storybook                         |

## Установка и запуск

```bash
# Клонируем репозиторий
git clone https://github.com/DimaBagZ/stellar-burgers.git
cd stellar-burgers

# Устанавливаем зависимости
npm install

# Создаем .env файл
echo "NODE_ENV=development" > .env
echo "BURGER_API_URL=https://norma.education-services.ru/api" >> .env

# Запускаем проект в режиме разработки
npm start
```

**🌐 Откройте в браузере:** [http://localhost:4000](http://localhost:4000)

### 🔧 Альтернативные команды

<details>
<summary><strong>📚 Storybook</strong></summary>

```bash
# Запуск Storybook для разработки компонентов
npm run storybook
```

**Storybook:** [http://localhost:6006](http://localhost:6006)

</details>

<details>
<summary><strong>🏗 Сборка проекта</strong></summary>

```bash
# Сборка для продакшена
npm run build
```

</details>

<details>
<summary><strong>🔍 Качество кода</strong></summary>

```bash
# Линтинг кода
npm run lint

# Форматирование кода
npm run format

# Все проверки сразу
npm run test
```

</details>

## Результаты тестирования

### Покрытие тестами

**Jest (Unit тесты):**

- **14 test suites** - все Redux слайсы и компоненты
- **73 tests** - полное покрытие логики
- **45.4s** - время выполнения

**Cypress (E2E тесты):**

- **4 tests** - полный пользовательский сценарий
- **4s** - быстрая проверка UI

### Что протестировано

**Redux логика:**

- Управление состоянием конструктора бургера
- Обработка пользовательских данных
- Работа с заказами и лентой заказов
- Авторизация и восстановление пароля

**React компоненты:**

- Рендеринг ингредиентов и конструктора
- Модальные окна и взаимодействие
- Навигация и роутинг

**E2E сценарии:**

- Добавление ингредиентов в конструктор
- Создание заказа и очистка конструктора
- Работа модальных окон
- Полный пользовательский путь

## 🧪 Тестирование

### Запуск тестов

#### Jest тесты

Для запуска Jest тестов используйте команду:

```bash
npm test
```

Для проверки покрытия кода тестами:

```bash
npm run test:coverage
```

Проверка отдельных тестов:

- Запустите тесты для конкретных файлов:

```bash
npm test -- src/__tests__/components/BurgerIngredient.test.tsx
```

- Проверьте тесты для редьюсеров:

```bash
npm test -- src/__tests__/reducers
```

#### Cypress тесты

Для запуска Cypress тестов в интерактивном режиме:

- в отдельной консоли

```bash
npm start
```

- в отдельной консоли

```bash
npm run cypress:open
```

Эта команда откроет окно Cypress.

- Выберите "E2E Testing".
- Выберите браузер, в котором хотите запустить тесты.
- Выберите файл с тестами (например, constructor.cy.ts), чтобы запустить его, - или запустите все тесты.
- Этот режим удобен для визуальной отладки и просмотра шагов выполнения теста.

Для запуска Cypress тестов в headless режиме:

```bash
npm run cypress:run
```

### Структура тестов

#### Jest тесты

Jest тесты находятся в папке `__tests__` и рядом с тестируемыми файлами. Они проверяют:

- Корректную работу редьюсеров
- Обработку асинхронных экшенов
- Работу rootReducer
- Функциональность конструктора бургера

#### Cypress тесты

Cypress тесты находятся в папке `cypress/e2e`. Они проверяют:

- Добавление ингредиентов в конструктор
- Работу модальных окон
- Процесс создания заказа
- Навигацию по приложению

### Моки и фикстуры

- Моки для API запросов находятся в `cypress/fixtures`
- Моки для WebSocket соединения находятся в `cypress/support/commands.ts`

## Особенности

- **Современный стек**: React 18, TypeScript, Redux Toolkit
- **Real-time обновления** через WebSocket
- **Полная авторизация** с JWT токенами
- **Защищенные роуты** для пользователей
- **Модальные окна** через роутинг
- **Drag & Drop** интерфейс конструктора
- **Качественное тестирование** (Jest + Cypress)
- **Storybook** для документации компонентов
- **Адаптивный дизайн** для всех устройств

## Скриншоты

### Главная страница

<img width="1024" height="768" alt="Constructor" src="https://github.com/user-attachments/assets/placeholder" />

_Интерфейс конструктора бургера с ингредиентами_

### Лента заказов

<img width="1024" height="768" alt="Feed" src="https://github.com/user-attachments/assets/placeholder" />

_Лента заказов в реальном времени_

### Личный кабинет

<img width="1024" height="768" alt="Profile" src="https://github.com/user-attachments/assets/placeholder" />

_История заказов пользователя_

## 🔗 Ссылки

- **🌐 Live Demo**: [https://dimabagz.github.io/stellar-burgers/](https://dimabagz.github.io/stellar-burgers/)
- **📁 Repository**: [https://github.com/DimaBagZ/stellar-burgers](https://github.com/DimaBagZ/stellar-burgers)
- **📚 Storybook**: [https://dimabagz.github.io/stellar-burgers/storybook/](https://dimabagz.github.io/stellar-burgers/storybook/)
- **🎨 Figma макет**: [https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack\_-Проектные-задачи-(3-месяца)\_external_link?type=design&node-id=0-1&mode=design](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

---

<div align="center">

[⬆️ Наверх](#stellar-burgers)

</div>
