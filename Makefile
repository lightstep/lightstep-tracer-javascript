DST_FILES = \
	dist/lightstep-tracer-node-debug.js \
	dist/lightstep-tracer-node.js \
	dist/lightstep-tracer.js \
	dist/lightstep-tracer.min.js
SRC_FILES = $(shell find src/ -type f) \
	webpack.config.js \
	package.json


.PHONY: build
build: $(DST_FILES)
$(DST_FILES) : $(SRC_FILES)
	npm run webpack

# NOTE: `npm version` automatically creates a git commit ang git tag for the
# incremented version
.PHONY: publish
publish: test test_all
	npm version patch
	npm whoami
	npm publish
	git push
	git push --tags

.PHONY: test
test: build test_node test_browser
	echo Running tests

.PHONY: test_quick
test_quick:
	npm run webpack-node-debug
	npm test

.PHONY: build test_node
test_node:
	npm test

.PHONY: build test_browser
test_browser:
	cp node_modules/opentracing/dist/opentracing-browser.js test/dist
	cp dist/lightstep-tracer.js test/dist
	cd test && node ../node_modules/webpack/bin/webpack.js unittest_browser.js dist/unittest_browser.bundle.js
	cd test && open unittest.html

# Note: versions < 0.12 are *not* supported.  The 'beforeExit' event has
# different behavior that does not work with the current implementation.
.PHONY: test_all
test_all: build
	scripts/docker_test.sh latest
	scripts/docker_test.sh 5.8
	scripts/docker_test.sh 5.1
	scripts/docker_test.sh 5.0
	scripts/docker_test.sh 4.4
	scripts/docker_test.sh 4.0
	scripts/docker_test.sh 0.12

# LightStep internal target
.PHONY: thrift
thrift:
	thrift -r -gen js:node -out src/imp/platform/node/thrift_api $(LIGHTSTEP_HOME)/go/src/crouton/crouton.thrift
	thrift -r -gen js -out src/imp/platform/browser/thrift_api $(LIGHTSTEP_HOME)/go/src/crouton/crouton.thrift
	npm run thrift-browser
	npm run thrift-node
