var Fastbill = require('./../lib/fastbill');
var testConf = require('./../testConf');
var expect = require("expect.js");

if (!testConf.user || !testConf.apiKey) {
    console.error('Please fill out testConf.json with your credentials to run this test!');
    return;
}

var fastbill = new Fastbill(testConf);

describe('lib test', function () {
    it('should respond with an error for non existing customer', function (done) {
        fastbill.get('customer', {
            FILTER: {
                CUSTOMER_ID: '99999999'
            },
            LIMIT: 1
        }, function (res) {
            expect(res.length).to.be(0);
            done();
        });
    });

    it('should create a customer, get it back, update it and delete it', function (done) {
        fastbill.create('customer', {
            FIRST_NAME: 'Jeffrey',
            LAST_NAME: 'Clarke', // required
            EMAIL: 'JeffreyWClarke@einrot.com',
            CUSTOMER_TYPE: 'business', // required
            ORGANIZATION: 'Envirotecture Design', // required when CUSTOMER_TYPE == 'business'
            COUNTRY_CODE: 'US',
            ADDRESS: '2711 Sycamore Road',
            CITY: 'Coos Bay',
            ZIPCODE: '97420'
        }, function (res) {
            expect(res.STATUS).to.be('success');
            expect(res.CUSTOMER_ID).to.be.ok();
            var customerId = res.CUSTOMER_ID;
            fastbill.get('customer', {
                FILTER: {
                    CUSTOMER_ID: customerId
                },
                LIMIT: 1
            }, function (res) {
                expect(parseInt(res.CUSTOMER_ID)).to.be(parseInt(customerId));
                var email = 'somerandomemail@somenewrandomprovider.com';
                fastbill.update('customer', customerId, {
                    EMAIL: email
                }, function (res) {
                    expect(res.STATUS).to.be('success');
                    fastbill.del('customer', customerId, function (res) {
                        expect(res.STATUS).to.be('success');
                        done();
                    });
                });
            });
        });
    });
});



