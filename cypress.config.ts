import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '9tqe49',
  e2e: {
    baseUrl: 'http://localhost:4000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  screenshotOnRunFailure: true
});
