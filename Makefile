TEST_ENV ?= staging
BROWSER ?= chromium

## Run tests with the configured BROWSER (default: chromium)
test:
	BROWSER=$(BROWSER) npx cucumber-js

## Run tests on Chromium
test-chromium:
	BROWSER=chromium npx cucumber-js

## Run tests on Firefox
test-firefox:
	BROWSER=firefox npx cucumber-js

## Run tests on WebKit
test-webkit:
	BROWSER=webkit npx cucumber-js

## Run tests sequentially on all browsers
test-all: test-chromium test-firefox test-webkit

## Run tests in parallel on all browsers
test-parallel:
	BROWSER=chromium npx cucumber-js & \
	BROWSER=firefox npx cucumber-js & \
	BROWSER=webkit npx cucumber-js & \
	wait

## Open test report
report:
	open reports/cucumber-report.html

## Install dependencies
install:
	npm install
