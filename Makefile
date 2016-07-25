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

# NOTE: `npm version` automatically creates a git commit and git tag for the
# incremented version
publish: test test_all coverage
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
	@echo
	@echo "Publish complete. Don't forget to update CHANGELOG.md if not done already."
	@echo

# NOTE: the benchmark package is *not* part of package.json as it relies on a
# native module -- that does not compile on all systems. Until/unless that is
# resolved, it gets "manually" installed here when the benchmarks are run
benchmark: node_modules/sc-benchmark
	node benchmarks/benchmark.js

node_modules/sc-benchmark:
	npm install sc-benchmark@0.1.4

test: build test_node test_browser lint coverage

# The "_mocha" in the below is important:
# https://github.com/gotwarlost/istanbul/issues/262
.PHONY: coverage
coverage: build
	rm -f test/results/*.json
	node node_modules/.bin/istanbul cover node_modules/mocha/bin/_mocha -- -c test/unittest_node.js
	@echo
	@echo "Coverage is currently run against the compiled code. Numbers are not fully accurate."
	@echo "Open coverage/lcov-report/index.html for details."

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
	scripts/docker_test.sh 6.2
	scripts/docker_test.sh 5.8
	scripts/docker_test.sh 5.1
	scripts/docker_test.sh 4.4
	scripts/docker_test.sh 4.0
	scripts/docker_test.sh 0.12

lint:
	node node_modules/eslint/bin/eslint.js --color --fix src

# Dev convenience for automatically rebuilding on file changes
watch: build
	node node_modules/watch-trigger/index.js watch-trigger.config.json

update_examples: node_modules
	cp node_modules/opentracing/dist/opentracing-browser.min.js examples/browser/opentracing-browser.min.js
	cp node_modules/opentracing/dist/opentracing-browser.min.js examples/browser-trivial/opentracing-browser.min.js

.PHONY: example-browser
example-browser: build
	cd examples/browser && bash run.sh

# LightStep internal target
thrift:
	docker run -v "$(LIGHTSTEP_HOME)/go/src/crouton/:/data" -v "$(PWD):/out" --rm thrift:0.9.2 \
		thrift -r -gen js:node -out /out/src/imp/platform/node/thrift_api /data/crouton.thrift
	docker run -v "$(LIGHTSTEP_HOME)/go/src/crouton/:/data" -v "$(PWD):/out" --rm thrift:0.9.2 \
		thrift -r -gen js -out /out/src/imp/platform/browser/thrift_api /data/crouton.thrift
	rm src/imp/platform/browser/thrift_api/ReportingService.js
	rm src/imp/platform/node/thrift_api/ReportingService.js
	npm run thrift-browser
	npm run thrift-node
