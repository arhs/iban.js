# iban.js

IBAN and BBAN validation, formatting and conversion in javascript.
Check the demo on [our website] to try it.

[our website]: http://www.arhs-group.com/labs/iban-bban-converter/

IBAN.js follows the [ISO 13616 IBAN Registry technical specification](https://www.swift.com/standards/data-standards/iban).

## Usage

IBAN.js is compatible with both commonjs and AMD module definition. It can be used as a [node.js module](#in-nodejs) and [in the browser](#in-the-browser). It also has a bower manifest, a [Typescript definition](#with-typescript) and a [Meteor wrapper](#with-meteor-framework).

### In node.js

```js
var IBAN = require('iban');
IBAN.isValid('hello world'); // false
IBAN.isValid('BE68539007547034'); // true
```

### In the browser

Using a module loader (AMD or commonjs) or directly through the global ```IBAN``` object:

```html
<script src="iban.js"></script>
<script>
    // the API is now accessible from the window.IBAN global object
    IBAN.isValid('hello world'); // false
    IBAN.isValid('BE68539007547034'); // true
</script>
```

### With TypeScript
The library is also available from the typescript language. To do this, [download the definition](https://github.com/borisyankov/DefinitelyTyped/tree/master/iban) and add a reference to this:
```typescript
/// <reference path="iban.d.ts" />
IBAN.isValid('hello world');
IBAN.isValid('BE68539007547034');
```
### With Meteor framework
A wrapper package for the Meteor framework is available [here](https://atmospherejs.com/theduke/iban).


## API

    * isValid(iban)
    * toBBAN(iban, separator)
    * fromBBAN(countryCode, bban)
    * isValidBBAN(countryCode, bban)
    * printFormat(iban, separator)
    * electronicFormat(iban)
