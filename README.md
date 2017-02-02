[![Build Status](https://travis-ci.org/sungmaster/langPackage.svg?branch=master)](https://travis-ci.org/sungmaster/langPackage) [![Coverage Status](https://coveralls.io/repos/github/sungmaster/langPackage/badge.svg?branch=master)](https://coveralls.io/github/sungmaster/langPackage?branch=master)
# langPackage
=========

Node.js module for the organization of control of languages in the application and templating of strings.  

## Installation

  `npm install langpackage`

## Usage

```javascript
var langPackage = require('langpackage');

let langPack = {};
langPack.en = new langPackage();
langPack.de = new langPackage();

//push simple phrase
langPack.en.pushPhrase('hello', 'Good day');
langPack.de.pushPhrase('hello', 'Guten Tag');

let currentLang = 'en';
var result = langPack[currentLang].get('hello'); //return 'Good day'
currentLang = 'de';
result = langPack[currentLang].get('hello'); // return 'Guten Tag'


//simple template
langPack.en.pushPhrase('apple', ['I have ', ' apple.']);
result = langPack.en.get('apple', 3); // return 'I have 3 apple.'

//template with function
langPack.de.pushPhrase('apple', ['Ich habe ', (a)=>a==1?' Apfel':' Äpfel', '.']);
result = langPack.de.get('apple', 1); // return 'Ich habe 1 Apfel.'
result = langPack.de.get('apple', [2]); // return 'Ich habe 2 Äpfel.'

//export dictionary (dictionary does not contain functions)
var json = langPack.en.exportJSON();

//import dictionary (dictionary does not contain functions)
langPack.en.importJSON(json);
```

## API Reference

### pushPhrase(keyword, phrase)
Adds phrase to dictionary
* **keyword**: `String` Phrase keyword.
* **phrase**: `Array` Phrase template. Can contain strings and functions with one parameter. The first element always a string. After the function the next element should be a string.

### get(keyword, [args])
Returns the phrase with the arguments added in a template
* **keyword**: `String` Phrase keyword.
* **args**: `Array` `optional` Template arguments.

### exportJSON()
Return dictionary as JSON string
* **Attention!** You can export the dictionary does not contain functions, otherwise an error.

### importJSON(json)
Import dictionary from JSON string. Returns import success
* **json**: `String` Dictionary in JSON.
* **Attention!** You can import the dictionary does not contain functions, otherwise an error.
* **Attention!** Import will replace the old dictionary.

Dictionary example:
```JSON
{"hello":["Good day"], "apple":["I have ", " apple."]}
```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

MIT license
