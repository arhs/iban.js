# iban.js

IBAN and BBAN validation, formatting and conversion in javascript.

## Usage

IBAN.js can be used as a node.js module and in the browser.

### In node.js

```js
var IBAN = require('iban');
IBAN.isValid('hello world'); // false
IBAN.isValid('BE68539007547034'); // true
```

### In the browser

```html
<script src="iban.js">
<script>
    // the API is now accessible from the window.IBAN global object
    IBAN.isValid('hello world'); // false
    IBAN.isValid('BE68539007547034'); // true
</script>
```

## API

    * isValid(iban)
    * toBBAN(iban, separator)
    * fromBBAN(countryCode, bban)
    * isValidBBAN(countryCode, bban)
    * printFormat(iban, separator)
    * electronicFormat(iban)
