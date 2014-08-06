/*!
 * fastbill-automatic - node plugin
 *
 * Author:
 *     Robert Boeing <robert.boeing@konexmedia.com>
 *     Paul Em <paul3m@gamil.com>
 *
 * MIT Licensed
 *
 */
'use strict';


var Client = require('node-rest-client').Client;
var _ = require('underscore');

//
// fastbill
//

var Fastbill = function (config) {
    var credentials = {
        user: config.user,
        password: config.apiKey
    };

    this.config = {
        user: config.user,
        apiKey: config.apiKey,
        serviceUrl: "https://automatic.fastbill.com/api/1.0/api.php",
        headers: {"Content-Type": "application/json"}
    };

    //authenticate and build our client
    this.client = new Client(credentials);
};

Fastbill.prototype = {

    //
    // get
    //

    get: function (type, params, callback) {

        // build the fastbill styled Query
        params = {
            data: _.extend(params, {"SERVICE": type + '.get'}),
            headers: this.config.headers
        };


        // use node-rest-client for communication
        this.client.post(this.config.serviceUrl, params, function (data, response) {
            // parsed response body as js object
            var res = null;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('fastbill error: could not parse create response');
            }
            if (!res) {
                callback(null);
                return;
            }
            // get first property of Response-OBJ and fire the callback!
            for (var props in res.RESPONSE) {
                var resAry = [];

                res.RESPONSE[props].forEach(function (e) {
                    resAry.push(e);
                });

                callback(resAry);

                //break after first element
                break;
            }

        });
    },
    getOne: function (type, params, callback) {

        // build the fastbill styled Query
        params = {
            data: _.extend(params, {"SERVICE": type + '.get', "LIMIT": 1}),
            headers: this.config.headers
        };


        // use node-rest-client for communication
        this.client.post(this.config.serviceUrl, params, function (data, response) {
            // parsed response body as js object
            var res = null;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('fastbill error: could not parse create response');
            }
            if (!res) {
                callback(null);
                return;
            }
            // get first property of Response-OBJ and fire the callback!
            for (var props in res.RESPONSE) {
                callback(res.RESPONSE[props][0]);
                break;
            }

        });
    },
    create: function (type, params, callback) {
        // build the fastbill styled Query
        params = {
            data: {
                "SERVICE": type + '.create',
                "DATA": params
            },
            headers: this.config.headers
        };

        // use node-rest-client for communication
        this.client.post(this.config.serviceUrl, params, function (data, response) {
            // parsed response body as js object
            var res = null;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('fastbill error: could not parse create response');
            }
            if (res && typeof res === 'object' && res.RESPONSE) {
                callback(res.RESPONSE);
            } else {
                callback(null);
            }
        });
    },
    update: function (type, id, params, callback) {
        // build the fastbill styled Query
        params.CUSTOMER_ID = id;
        params = {
            data: {
                "SERVICE": type + '.update',
                "DATA": params
            },
            headers: this.config.headers
        };

        // use node-rest-client for communication
        this.client.post(this.config.serviceUrl, params, function (data, response) {
            // parsed response body as js object
            var res = null;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('fastbill error: could not parse create response');
            }
            if (res && typeof res === 'object' && res.RESPONSE) {
                callback(res.RESPONSE);
            } else {
                callback(null);
            }
        });
    },
    del: function (type, id, callback) {
        // build the fastbill styled Query
        var params = {
            data: {
                "SERVICE": type + '.delete',
                "DATA": {
                    'CUSTOMER_ID': id
                }
            },
            headers: this.config.headers
        };

        // use node-rest-client for communication
        this.client.post(this.config.serviceUrl, params, function (data, response) {
            // parsed response body as js object
            var res = null;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('fastbill error: could not parse create response');
            }
            if (res && typeof res === 'object' && res.RESPONSE) {
                callback(res.RESPONSE);
            } else {
                callback(null);
            }
        });
    }


};
module.exports = Fastbill;