# Sauce Demo Automation Framework

Playwright + Cucumber (BDD) + JS automation framework

## Tech Stack

- **Playwright** - Testing framework
- **JavaScript** - Programming language
- **Cucumber.js** - BDD test framework (Gherkin syntax)
- **cucumber-html-reporter** - HTML test reports
- **Winston** - Logging


## Prerequisites

- Node.js >= 20
- npm

## Setup

```bash
npm install

```

## Running Tests

```bash
# Run on all browsers (sequential)
npm test

# Run on a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run on all browsers in parallel
npm run test:parallel
```

## HTML Report

After running tests, generate the HTML report:

```bash
npm run report
```

The report will be at `reports/cucumber-report.html`.

## Screenshots on Failure

Capture screenshots and save it to `reports/` when a test fails

## Logging

Logs are written to both the console and `reports/test.log` using Winston