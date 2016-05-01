.PHONY: build publish \
	test test_quick test_node test_browser test_all \
	benchmark \
	update_examples \
	lint \
	watch thrift

DST_FILES = \
	dist/lightstep-tracer-node-debug.js \
	dist/lightstep-tracer-node.js \
	dist/lightstep-tracer.js \
	dist/lightstep-tracer.min.js
SRC_FILES = $(shell find src/ -type f) \
	webpack.config.js \
	package.json


build: $(DST_FILES)
$(DST_FILES) : node_modules $(SRC_FILES)
	npm run webpack

node_modules:
	npm install

# NOTE: `npm version` automatically creates a git commit ang git tag for the
# incremented version
publish: test test_all
	@if [ $(shell git symbolic-ref --short -q HEAD) = "master" ]; then exit 0; else \
	echo "Current git branch does not appear to be 'master'. Refusing to publish."; exit 1; \
	fi
	npm version patch
	make build # need to rebuild with the new version number
	git push
	git push --tags
	npm whoami
	npm publish
	bash scripts/update_docs_repo.sh

benchmark:
	node benchmarks/benchmark.js

test: build test_node test_browser lint

test_quick:
	npm run webpack-node-debug
	npm test

test_node:
	npm test

test_browser:
	cp node_modules/opentracing/dist/opentracing-browser.js test/dist
	cp dist/lightstep-tracer.js test/dist
	cd test && node ../node_modules/webpack/bin/webpack.js unittest_browser.js dist/unittest_browser.bundle.js
	cd test && open unittest.html

# Note: versions < 0.12 are *not* supported.  The 'beforeExit' event has
# different behavior that does not work with the current implementation.
test_all: build
	scripts/docker_test.sh latest
	scripts/docker_test.sh 5.8
	scripts/docker_test.sh 5.1
	scripts/docker_test.sh 5.0
	scripts/docker_test.sh 4.4
	scripts/docker_test.sh 4.0
	scripts/docker_test.sh 0.12

# This is not run by default as currently too many tests fail
lint:
	node node_modules/eslint/bin/eslint.js --color src

# Dev convenience for automatically rebuilding on file changes
watch:
	node node_modules/watch-trigger/index.js watch-trigger.config.json

update_examples: node_modules
	cp node_modules/opentracing/dist/opentracing-browser.min.js examples/browser/opentracing-browser.min.js
	cp node_modules/opentracing/dist/opentracing-browser.min.js examples/browser-trivial/opentracing-browser.min.js

# LightStep internal target
thrift:
	thrift -r -gen js:node -out src/imp/platform/node/thrift_api $(LIGHTSTEP_HOME)/go/src/crouton/crouton.thrift
	thrift -r -gen js -out src/imp/platform/browser/thrift_api $(LIGHTSTEP_HOME)/go/src/crouton/crouton.thrift
	rm src/imp/platform/browser/thrift_api/ReportingService.js
	rm src/imp/platform/node/thrift_api/ReportingService.js
	npm run thrift-browser
	npm run thrift-node
