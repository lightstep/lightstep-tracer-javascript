.PHONY: build
build:
	npm run webpack

.PHONY: publish
publish: test test_all
	npm version patch
	npm whoami
	npm publish

.PHONY: test
test: test_node test_browser
	echo Running tests

.PHONY: test_quick
test_quick:
	npm run webpack-node-debug
	npm test

.PHONY: test_node
test_node:
	npm test

.PHONY: test_browser
test_browser:
	cp node_modules/opentracing/dist/opentracing-browser.js test/dist
	cp dist/lightstep-tracer.js test/dist
	cd test && node ../node_modules/webpack/bin/webpack.js unittest_browser.js dist/unittest_browser.bundle.js
	open unittest.html

# Note: versions < 0.10 are *not* supported.  The 'beforeExit' event has
# different behavior that does not work with the current implementation.
.PHONY: test_all
test_all:
	scripts/docker_test.sh latest
	scripts/docker_test.sh 5.1
	scripts/docker_test.sh 5.0
	scripts/docker_test.sh 4.1
	scripts/docker_test.sh 4.0
	scripts/docker_test.sh 0.12

# LightStep internal target
.PHONY: thrift
thrift:
	thrift -r -gen js:node -out src/imp/platform/node/thrift_api $(LIGHTSTEP_HOME)/go/src/crouton/crouton.thrift
	thrift -r -gen js -out src/imp/platform/browser/thrift_api $(LIGHTSTEP_HOME)/go/src/crouton/crouton.thrift
	npm run thrift-browser
	npm run thrift-node
