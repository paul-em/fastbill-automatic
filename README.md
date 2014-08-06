# fastbill-automatic

Provides easy access to `fastbill-automatic-api`

This module is an early implementation of some features of the fastbill-automatic-api, based on https://github.com/iiiich/fastbill. Please let me know if you need some improvements.
The fastbill-automatic documentation can be found here: https://automatic.fastbill.com/docs/API-Doku_FBA_V1-12.pdf

### Installation

To install this adapter, run:

```sh
$ npm install fastbill-automatic
```

### Usage

On top of your file require the module and initialize it.
```js
var Fastbill = require('fastbill-automatic');

var fastbill = new Fastbill({
      user : '####',
      apiKey : '####'
  });
});
```

This Module exposes the following methods:

###### `get()`
```js
fastbill.get("customer",{"FILTER": {}, LIMIT: 2},function(res){
  console.log(res);
});
```
###### `getOne()`
```js
fastbill.getOne("customer",{"FILTER": {}},function(res){
  console.log(res);
});
```
###### `create()`
```js
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
}, function(res){
    console.log(res);
});
```
###### `update()`
```js
fastbill.update('customer', '701524', {
    EMAIL: 'somerandomemail@somenewrandomprovider.com'
}, function(res){
    console.log(res);
});
```
###### `del()`

```js
fastbill.del('customer', '701524', function(res){
    console.log(res);
});
```



### Interfaces

>TODO:
>Support all functions of the original API

### License

The MIT License (MIT)

Copyright (c) 2014 Paul Em (based on code from Robert Boeing)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

