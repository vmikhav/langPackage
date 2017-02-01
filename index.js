'use strict';

var Lang = function () {
	this.phrase = {};
};
/**
 * Adds the phrase template
 * @param {string} phrase keyword
 * @param {string}|{function}|{array of string and function} phrase template. Between adjacent array cells user data will be added.
 * @return {none}
 */
Lang.prototype.pushPhrase = function (code, phrase) {
	if (typeof phrase === 'string'){var phrase = [phrase];}
	else if (typeof phrase === 'function'){var phrase = ['', phrase, ''];}
	this.phrase[code] = phrase;
};
/**
 * Return phrase with user data
 * @param {string} phrase keyword
 * @param {array} user data, will be added in a template
 * @return {string}
 */
Lang.prototype.get = function (code, args) {
	let result = this.phrase[code][0]; let offset = 1;
	var args = args||[];
	if (Array.isArray(args)===false){ args=[args];}
	let len = Math.min(this.phrase[code].length-1, args.length);
	for (let i=0; i<len; i++){
		result+=args[i];
		if (typeof this.phrase[code][i+offset] === 'function'){
			result+=this.phrase[code][i+offset](args[i]);
			offset++;
		}
		if (typeof this.phrase[code][i+offset] === 'function'){
			offset--;
		}
		else{
			result+=this.phrase[code][i+offset];
		}
	}
	return result;
};

module.exports = Lang;