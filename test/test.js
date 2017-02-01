'use strict';

var expect = require('chai').expect;
var langPackage = require('../index');

describe('#langPackage', function() {
	let langPack = {};
	langPack.en = new langPackage();
	langPack.de = new langPackage();

	langPack.en.pushPhrase('hello', 'Good day');
	langPack.de.pushPhrase('hello', 'Guten Tag');

	
	it('simple phrase', function() {
		let currentLang = 'en';
		var result = langPack[currentLang].get('hello');
		expect(result).to.equal('Good day');
	});

	it('change language', function() {
		let currentLang = 'de';
		var result = langPack[currentLang].get('hello');
		expect(result).to.equal('Guten Tag');
	});

	langPack.en.pushPhrase('apple', ['I have ', ' apple.']);
	langPack.de.pushPhrase('apple', ['Ich habe ', (a)=>a==1?' Apfel':' Äpfel', '.']);

	it('simple template', function() {
		var result = langPack.en.get('apple', 3);
		expect(result).to.equal('I have 3 apple.');
	});

	it('template with function', function() {
		var result = langPack.de.get('apple', 1);
		expect(result).to.equal('Ich habe 1 Apfel.');
	});

	it('template with function #2', function() {
		var result = langPack.de.get('apple', [2]);
		expect(result).to.equal('Ich habe 2 Äpfel.');
	});
});