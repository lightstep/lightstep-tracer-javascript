describe('options()', function() {

    function makeLSTracer(extraOpts) {
        var opts = {
            access_token : 'your_access_token',
            component_name : 'test_suite',
            disable_reporting_loop : true,
            silent : true,
        };
        for (var key in extraOpts) {
            opts[key] = extraOpts[key];
        }
        return Tracer.initNewTracer(LightStep.tracer(opts));
    }

    it('tracer.imp().options() should return an object"', function() {
        var tracer = makeLSTracer();
        expect(tracer.imp()).to.be.an('object');
        expect(tracer.imp().options()).to.be.an('object');
    });

    it('should throw a UserError on invalid options', function() {

        expect(function () { makeLSTracer() }).to.not.throw();

        expect(function () {
            Tracer.imp().options({ not_a_real_option : 100 });
        }).to.throw();

        expect(function () {
            Tracer.imp().options({
                invalid_option_name    : 'test',
                another_invalid_option : 'test',
            });
        }).to.throw();
    });

    it('should allow the component_name and access_token to be set only once', function() {

        expect(function () {
            var rt = makeLSTracer();
            rt.options({
                component_name  : 'my_group',
                access_token : '1',
                disable_reporting_loop : true,
            });
            rt.options({
                component_name  : 'your_group',
            });
        }).to.throw();

        expect(function () {
            var rt = makeLSTracer();
            rt.options({
                component_name : 'my_group',
                access_token : '1',
                disable_reporting_loop : true,
            });
            rt.options({
                access_token : '2',
            });
        }).to.throw();
    });

    it('should allow user-specified tracer tags', function() {
        var testTable = [
            [
                {},
                {},
            ],
            [
                { 'my_tag' : 'strings_are_ok' },
                { 'my_tag' : 'strings_are_ok' },
            ],
            [
                { 'my_tag' : 'strings_are_ok', 'second_tag' : 'dolphins' },
                { 'my_tag' : 'strings_are_ok', 'second_tag' : 'dolphins' },
            ],
            [
                { 'my_tag' : 1233 },
                { 'my_tag' : undefined },
            ],
            [
                { 'my_array' : [ 1, 2, 3] },
                {},
            ],
            [
                { 'my_null' : null },
                {},
            ],
        ];

        for (var i = 0; i < testTable.length; i++) {
            var tracer = LightStep.tracer({
                access_token : '{your_access_token}',
                component_name : '{node_test_suite}',
                disable_reporting_loop : true,
                silent       : true,
                tags         : testTable[i][0],
            });
            var actual = {};
            for (var j = 0; j < tracer._thriftRuntime.attrs.length; j++) {
                var attr = tracer._thriftRuntime.attrs[j];
                actual[attr.Key] = attr.Value;
            }
            var expectSet = testTable[i][1];
            for (var key in expectSet) {
                expect(actual[key]).to.equal(expectSet[key]);
            }
        }
    });

    it('should default to an HTTPS port', function() {
        expect(makeLSTracer().imp().options().collector_port).to.equal(443);
    });

    it('should default to correct ports when collector_encryption is set', function() {
        expect(makeLSTracer({
            collector_encryption : 'none',
        }).imp().options().collector_port).to.equal(80);
        expect(makeLSTracer({
            collector_encryption : 'tls',
        }).imp().options().collector_port).to.equal(443);
    });

    it('should treat collector_port=0 as meaning "use the default"', function() {
        expect(makeLSTracer({
            collector_port : 4000,
        }).imp().options().collector_port).to.equal(4000);

        expect(makeLSTracer({
            collector_port : 0,
        }).imp().options().collector_port).to.equal(443);

        expect(makeLSTracer({
            collector_port : 0,
            collector_encryption : 'none',
        }).imp().options().collector_port).to.equal(80);
    });
});
