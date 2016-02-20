describe("options()", function() {

    it("should throw a UserError on invalid options", function() {

        expect(function () {
            Tracer.imp().options({ });
        }).to.not.throw();

        expect(function () {
            Tracer.imp().options({ not_a_real_option : 100 });
        }).to.throw();

        expect(function () {
            Tracer.imp().options({
                invalid_option_name    : "test",
                another_invalid_option : "test",
            });
        }).to.throw();
    });

    it("should allow the group_name and access_token to be set only once", function() {

        expect(function () {
            var rt = LightStep.createRuntime();
            rt.options({
                group_name   : "my_group",
                access_token : "1",
                disable_reporting_loop : true,
            });
            rt.options({
                group_name  : "your_group",
            });
        }).to.throw();

        expect(function () {
            var rt = LightStep.createRuntime();
            rt.options({
                group_name   : "my_group",
                access_token : "1",
                disable_reporting_loop : true,
            });
            rt.options({
                access_token : "2",
            });
        }).to.throw();
    });
});
