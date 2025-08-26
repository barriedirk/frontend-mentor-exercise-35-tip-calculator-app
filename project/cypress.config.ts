import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/frontend-mentor-exercise-35-tip-calculator-app/',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    reporter: 'cypress-mochawesome-reporter',

    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },

    setupNodeEvents(on, config) {
      // You can add tasks or plugins here if needed
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
  },
});
