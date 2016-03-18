describe('options()', function() {

    it('should throw a UserError on invalid options', function() {

        expect(function () {
            Tracer.imp().options({ });
        }).to.not.throw();

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

    it('should allow the group_name and access_token to be set only once', function() {

        expect(function () {
            var rt = LightStep.createRuntime();
            rt.options({
                group_name   : 'my_group',
                access_token : '1',
                disable_reporting_loop : true,
            });
            rt.options({
                group_name  : 'your_group',
            });
        }).to.throw();

        expect(function () {
            var rt = LightStep.createRuntime();
            rt.options({
                group_name   : 'my_group',
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
                group_name   : '{node_test_suite}',
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
});
