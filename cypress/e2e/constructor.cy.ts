/// <reference types="cypress" />

import * as userData from '../fixtures/user.json';
import * as orderData from '../fixtures/order.json';
import * as ingredientsData from '../fixtures/ingredients.json';

describe('Burger Constructor', () => {
  beforeEach(() => {
    // Перехватываем запросы к API
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Устанавливаем токены авторизации
    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
      document.cookie =
        'accessToken=test-access-token; path=/; domain=localhost; secure; samesite=strict';
    });

    // Открываем страницу конструктора
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    // Ждем, пока ингредиенты отрендерятся
    cy.get('[data-testid="burger-constructor"]').should('exist');
    // Убедимся, что список ингредиентов отрисовался и содержит элементы
    cy.get('[data-testid="ingredient-item"]', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    );
  });

  it('should add ingredients to constructor', () => {
    cy.get('[data-testid="burger-constructor"]').should('exist');

    // Добавляем булку
    cy.get('[data-testid="ingredient-item"]', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('button[type="button"]').should('be.visible').click();
      });
    cy.get('[data-testid="constructor-bun-top"]', { timeout: 10000 }).should(
      'exist'
    );
    cy.get('[data-testid="constructor-bun-bottom"]', { timeout: 10000 }).should(
      'exist'
    );

    // Проверяем цену после добавления булки
    cy.contains('button', 'Оформить заказ')
      .parent('div')
      .find('p.text')
      .should('contain.text', '2510');

    // Добавляем начинку с прокруткой
    cy.contains('Начинки').click();
    cy.contains('[data-testid="ingredient-item"] p', 'Биокотлета') // Находим текст начинки внутри item
      .parents('[data-testid="ingredient-item"]') // Находим родительский li
      .scrollIntoView() // Прокручиваем до видимости
      .within(() => {
        cy.get('button[type="button"]').should('be.visible').click(); // Кликаем кнопку внутри
      });

    // Проверяем цену после добавления начинки
    cy.contains('button', 'Оформить заказ', { timeout: 10000 })
      .parent('div')
      .find('p.text')
      .should('contain.text', '2934');
  });

  it('should open and close ingredient modal', () => {
    // Проверяем, что конструктор существует
    cy.get('[data-testid="burger-constructor"]').should('exist');

    // Открываем модальное окно с ингредиентом
    cy.get('[data-testid="ingredient-item"]', { timeout: 10000 })
      .first()
      .find('a')
      .click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-testid="modal"]').should('exist');

    // Закрываем модальное окно по кнопке
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    // Открываем модальное окно снова
    cy.get('[data-testid="ingredient-item"]', { timeout: 10000 })
      .first()
      .find('a')
      .click();

    // Закрываем модальное окно по оверлею
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should display correct ingredient data in modal', () => {
    // Проверяем, что конструктор существует
    cy.get('[data-testid="burger-constructor"]').should('exist');

    // Получаем данные первого ингредиента из фикстуры
    const firstIngredient = ingredientsData.data[0];

    // Открываем модальное окно с ингредиентом
    cy.get('[data-testid="ingredient-item"]', { timeout: 10000 })
      .first()
      .find('a')
      .click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-testid="modal"]').should('exist');

    // Проверяем, что в модальном окне отображаются данные выбранного ингредиента
    cy.get('[data-testid="modal"]')
      .contains(firstIngredient.name)
      .should('exist');
    cy.get('[data-testid="modal"]')
      .contains(firstIngredient.calories)
      .should('exist');

    // Закрываем модальное окно
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.get('[data-testid="burger-constructor"]').should('exist');

    // Добавляем булку
    cy.get('[data-testid="ingredient-item"]', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('button[type="button"]').should('be.visible').click();
      });
    cy.get('[data-testid="constructor-bun-top"]', { timeout: 10000 }).should(
      'exist'
    );
    cy.get('[data-testid="constructor-bun-bottom"]', { timeout: 10000 }).should(
      'exist'
    );

    // Добавляем начинку с прокруткой
    cy.contains('Начинки').click();
    cy.contains('[data-testid="ingredient-item"] p', 'Биокотлета')
      .parents('[data-testid="ingredient-item"]')
      .scrollIntoView()
      .within(() => {
        cy.get('button[type="button"]').should('be.visible').click();
      });

    // Проверяем цену перед оформлением заказа
    cy.contains('button', 'Оформить заказ', { timeout: 10000 })
      .parent('div')
      .find('p.text')
      .should('contain.text', '2934');

    // Оформляем заказ
    cy.contains('button', 'Оформить заказ').click();

    // Проверка модалки заказа
    cy.get('[data-testid="modal"]', { timeout: 20000 }).should('exist');
    // Ищем h2 внутри модалки и проверяем текст
    cy.get('[data-testid="modal"]')
      .find('h2') // Ищем h2
      .contains(orderData.order.number.toString(), { timeout: 10000 }); // Ждем появления номера заказа
    // Дополнительно проверяем текст (можно закомментировать)
    cy.get('[data-testid="modal"]')
      .find('h2')
      .should('contain.text', orderData.order.number.toString());

    // Закрываем модальное окно
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    // Проверяем, что конструктор очищен
    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
    cy.contains('button', 'Оформить заказ')
      .parent('div')
      .find('p.text')
      .should('contain.text', '0');
  });

  afterEach(() => {
    // Очищаем токены авторизации
    cy.clearAllCookies();
    cy.window().then((window) => {
      window.localStorage.removeItem('refreshToken');
    });
  });
});
