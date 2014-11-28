var format=function(){var r=require("underscore"),e=require("util"),t={},n={};n.version="0.0.1",n.prefs={text:{skip:["of","in","is","by","on","and"],romans:["I","II","III","IV","V","VI","VII","VIII","IX","X"],trimTo:8},acct:{format:"000-00000-00"},money:{symbol:{USD:"$"},precision:3,thousandSeparator:",",decimalSeparator:"."},number:{precision:3,thousandSeparator:",",decimalSeparator:"."},date:{},time:{}},t.trim=function(n){return e.isArray(n)?r.map(n,function(r){return t.title(r)}):void 0===n||""===n||"string"!=typeof n?n:n.replace(/\s+/g," ").replace(/^\s*/g,"").replace(/\s*$/g,"")},t.firstFew=function(o){return e.isArray(o)?r.map(o,function(r){return t.title(r)}):void 0===o||""===o||"string"!=typeof o?o:o.length>n.prefs.text.trimTo?o.substring(0,n.prefs.text.trimTo)+" ...":o+" ..."},t.splitCamelCase=function(r){return void 0===r||""===r||"string"!=typeof r?r:t.trim(r).replace(/([A-Z])/g," $1")},t.title=function(o){return e.isArray(o)?r.map(o,function(r){return t.title(r)}):void 0===o||""===o||"string"!=typeof o?o:o.split("-").join(" ").replace(/\w\S*/g,function(r){return-1!=n.prefs.text.skip.indexOf(r.toLowerCase())?r.toLowerCase():-1!=n.prefs.text.romans.indexOf(r)?r:r.charAt(0).toUpperCase()+r.substr(1).toLowerCase()})},t.lower=function(n){return e.isArray(n)?r.map(n,function(r){return t.lower(r)}):void 0===n||""===n||"string"!=typeof n?n:n.toLowerCase()},t.upper=function(n){return e.isArray(n)?r.map(n,function(r){return t.upper(r)}):void 0===n||""===n||"string"!=typeof n?n:n.toUpperCase()},t.snake=function(o){return e.isArray(o)?r.map(o,function(r){return t.snake(r)}):void 0===o||""===o||"string"!=typeof o?o:t.splitCamelCase(n.title(o)).split(" ").join("_").toLowerCase()},t.spinal=function(o){return e.isArray(o)?r.map(o,function(r){return t.spinal(r)}):void 0===o||""===o||"string"!=typeof o?o:t.splitCamelCase(n.title(o)).split(" ").join("-").toLowerCase()},t.money=function(o){if(e.isArray(o))return r.map(o,function(r){return t.money(r)});if(void 0==o||void 0===o.m||""===o.m||"number"!=typeof o.m)return o;var i=o.m.toString().split(n.prefs.number.decimalSeparator);i[0]=i[0].replace(/\B(?=(\d{3})+(?!\d))/g,n.prefs.money.thousandSeparator);var a=n.prefs.money.symbol[o.c]?n.prefs.money.symbol[o.c]:o.c;return a+" "+i.join(n.prefs.money.decimalSeparator)},t.number=function(o){if(e.isArray(o))return r.map(o,function(r){return t.number(r)});if(void 0===o||""===o||"number"!=typeof o)return o;var i=o.toString().split(n.prefs.number.decimalSeparator);return i[0]=i[0].replace(/\B(?=(\d{3})+(?!\d))/g,n.prefs.number.thousandSeparator),i.join(n.prefs.number.decimalSeparator)},t.acct=function(n){return e.isArray(n)?r.map(n,function(r){return t.acct(r)}):void 0===n||""===n||"object"==typeof n?n:(n="number"==typeof n?n.toString():n,n=n.split("-").join(""),n.length<=8&&(n=Array(9-n.length+1).join("0")+n),n.substring(0,3)+"-"+n.substring(3,8)+"-"+n.substring(8,9))},r.each(Object.keys(t),function(o){n[o]=function(n){return e.isArray(n)?r.map(n,function(r){return t[o](r)}):t[o](n)}}),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=n),exports.format=n):"function"==typeof define&&define.amd?define([],function(){return n}):(n.noConflict=function(r){return function(){return root.format=r,n.noConflict=void 0,n}}(root.format),root.format=n)}(this);