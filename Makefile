# http://stackoverflow.com/questions/3774568/makefile-issue-smart-way-to-scan-directory-tree-for-c-files
recursive_wildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call recursive_wildcard,$d/,$2))

#
# build
#
CMD_BABEL=node node_modules/.bin/babel
CMD_WEBPACK=node node_modules/.bin/webpack
SOURCES_JS=$(call recursive_wildcard,src/,*.js)
COMPILED_JS=$(SOURCES_JS:src/%.js=lib/%.js)
BUNDLE_JS=dist/lightstep-tracer.js dist/lightstep-tracer.min.js

.PHONY: build
build: node_modules build-node build-browser

node_modules:
	npm install

.PHONY: build-browser
build-browser: $(BUNDLE_JS)
$(BUNDLE_JS): $(SOURCES_JS) webpack.config.js package.json
	BUILD_PLATFORM=browser BUILD_CONFIG=debug $(CMD_WEBPACK) --display-error-details
	BUILD_PLATFORM=browser BUILD_CONFIG=prod $(CMD_WEBPACK) --display-error-details

.PHONY: build-node
build-node: $(COMPILED_JS)
lib/%.js: src/%.js
	@mkdir -p $(@D)
	$(CMD_BABEL) --presets es2015 --plugins add-module-exports $< -o $@ --source-maps

.PHONY: clean
clean:
	rm -rf dist
	rm -rf lib
	rm -rf coverage

#
# publish
#
# NOTE: `npm version` automatically creates a git commit and git tag for the
# incremented version
.PHONY: publish
publish: test test-all coverage
	@if [ $(shell git symbolic-ref --short -q HEAD) = "master" ]; then exit 0; else \
	echo "Current git branch does not appear to be 'master'. Refusing to publish."; exit 1; \
	fi
	npm version patch
	make build # need to rebuild with the new version number
	git push
	git push --tags
	npm whoami
	npm publish
	@echo
	@echo "Publish complete. Don't forget to update CHANGELOG.md if not done already."
	@echo

# NOTE: the benchmark package is *not* part of package.json as it relies on a
# native module -- that does not compile on all systems. Until/unless that is
# resolved, it gets "manually" installed here when the benchmarks are run
#
# NOTE: the --max-old-space-size=4000 works around what appears to be a defect
# in Node 6.x
.PHONY: benchmark
benchmark: build node_modules/sc-benchmark
	node --max-old-space-size=4000 benchmarks/benchmark.js

node_modules/sc-benchmark:
	npm install sc-benchmark@0.1.11

#
# test
#
test: build test-node test-browser lint

# The "_mocha" in the below is important:
# https://github.com/gotwarlost/istanbul/issues/262
.PHONY: coverage
coverage: build
	rm -f test/results/*.json
	node node_modules/.bin/istanbul cover node_modules/mocha/bin/_mocha -- -c test/unittest_node.js
	@echo
	@echo "Coverage is currently run against the compiled code. Numbers are not fully accurate."
	@echo "Open coverage/lcov-report/index.html for details."

.PHONY: test-node
test-node:
	npm test

.PHONY: test-browser
test-browser:
	cp dist/lightstep-tracer.js test/dist
	cd test && node ../node_modules/webpack/bin/webpack.js unittest_browser.js dist/unittest_browser.bundle.js
	cd test && open unittest.html

# Note: versions < 0.12 are *not* supported.  The 'beforeExit' event has
# different behavior that does not work with the current implementation.
.PHONY: test-all
test-all: build
	scripts/docker_test.sh latest
	scripts/docker_test.sh 6.6
	scripts/docker_test.sh 6.2
	scripts/docker_test.sh 5.8
	scripts/docker_test.sh 5.1
	scripts/docker_test.sh 4.4
	scripts/docker_test.sh 0.12

#
# lint
#
.PHONY: lint
lint:
	node node_modules/eslint/bin/eslint.js --color --fix src

#
# watch
#
# Dev convenience for automatically rebuilding on file changes
.PHONY: watch
watch: build
	node node_modules/watch-trigger/index.js watch-trigger.config.json

.PHONY: example-browser
example-browser: build
	cd examples/browser && bash run.sh

# LightStep internal target
.PHONY: thrift
thrift: thrift-compile thrift-postprocess

.PHONY: thrift-compile
thrift-compile:
	docker run -v "$(LIGHTSTEP_REPO_ROOT)/go/src/github.com/lightstep/common-go/:/data" -v "$(PWD):/out" --rm thrift:0.9.2 \
		thrift -r -gen js:node -out /out/src/imp/platform/node/thrift_api /data/crouton.thrift
	docker run -v "$(LIGHTSTEP_REPO_ROOT)/go/src/github.com/lightstep/common-go/:/data" -v "$(PWD):/out" --rm thrift:0.9.2 \
		thrift -r -gen js -out /out/src/imp/platform/browser/thrift_api /data/crouton.thrift
	rm src/imp/platform/browser/thrift_api/ReportingService.js
	rm src/imp/platform/node/thrift_api/ReportingService.js

.PHONY: thrift-postprocess
thrift-postprocess:
	node ./scripts/build_browser_thrift_lib.js
	node ./scripts/build_node_thrift_lib.js

# LightStep internal target
.PHONY: proto
proto:
	protoc -I"$(PWD)/../googleapis/:$(PWD)/../lightstep-tracer-common/" \
		--js_out=import_style=commonjs,binary:src/imp/generated_proto \
		collector.proto google/api/annotations.proto google/api/http.proto
