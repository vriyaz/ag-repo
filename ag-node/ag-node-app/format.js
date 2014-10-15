var format = (function () {
    var _ = require('underscore'),
        util = require('util'),
        q = {},
        lib = {};

    lib.version = '0.0.1';

    lib.prefs = {
        text: {
            skip: ['of', 'in', 'is', 'by', 'on', 'and'],
            romans: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
            trimTo: 8
        },
        acct: {
            format: '000-00000-00'
        },
        money: {
            symbol: {'USD': '$'},
            precision: 3,
            thousandSeparator: ',',
            decimalSeparator: '.'
        },
        number: {
            precision: 3,
            thousandSeparator: ',',
            decimalSeparator: '.'
        },
        date: {

        },
        time: {

        }
    };

    // text formatting
    q.trim = function(e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.title(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return e.replace(/\s+/g, ' ').replace(/^\s*/g, '').replace(/\s*$/g, '');
    };

    q.firstFew = function(e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.title(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        if (e.length > lib.prefs.text.trimTo) {
            return e.substring(0, lib.prefs.text.trimTo) + " ...";
        }
        return e + " ...";
    };

    q.splitCamelCase = function (e) {
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return q.trim(e).replace(/([A-Z])/g, ' $1');
    };

    q.title = function (e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.title(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return e.split('-').join(' ').replace(/\w\S*/g, function(s) {
            if (lib.prefs.text.skip.indexOf(s.toLowerCase()) != -1) {
                return s.toLowerCase();
            }
            if (lib.prefs.text.romans.indexOf(s) != -1) {
                return s;
            }
            return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
        });
    };

    q.lower = function (e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.lower(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return e.toLowerCase();
    };

    q.upper = function (e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.upper(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return e.toUpperCase();
    };

    q.snake = function (e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.snake(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return q.splitCamelCase(lib.title(e)).split(' ').join('_').toLowerCase();
    };

    q.spinal = function (e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.spinal(x); }); }
        if (e === undefined || e === "" || typeof e != 'string') { return e; }

        return q.splitCamelCase(lib.title(e)).split(' ').join('-').toLowerCase();
    };

    // money formatting; expect an object e as { m:moneyValue, c:currency }
    q.money = function (e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.money(x); }); }
        if (e == undefined || e.m === undefined || e.m === "" || typeof e.m != 'number') return e;

        var x = e.m.toString().split(lib.prefs.number.decimalSeparator);
        x[0] = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, lib.prefs.money.thousandSeparator);

        var s = (lib.prefs.money.symbol[e.c]) ? lib.prefs.money.symbol[e.c] : e.c;
        return s + ' ' + x.join(lib.prefs.money.decimalSeparator);
    };

    // number formatting
    q.number  = function(e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.number(x); }); }
        if (e === undefined || e === "" || typeof e != 'number') return e;

        var x = e.toString().split(lib.prefs.number.decimalSeparator);
        x[0] = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, lib.prefs.number.thousandSeparator);
        return x.join(lib.prefs.number.decimalSeparator);
    };

    // acct number formatting
    q.acct = function(e) {
        if (util.isArray(e)) { return _.map(e, function(x) { return q.acct(x); }); }
        if (e === undefined || e === "" || typeof e == 'object') return e;

        e = (typeof e == 'number') ? e.toString() : e;
        e = e.split('-').join('');
        if (e.length <= 8) {
            e = Array((9-e.length)+1).join('0') + e; // pad left with zeroes
        }
        return e.substring(0,3) + "-" + e.substring(3,8) + "-" + e.substring(8,9);
    };

    // now map the methods to lib object
    _.each(Object.keys(q), function(f) {
        lib[f] = function(a) {
            return util.isArray(a) ? _.map(a, function(e) { return q[f](e); }) : q[f](a);
        }
    });

    // Module Definition 
    // Export alif for CommonJS. If being loaded as an AMD module, define it as such.
    // Otherwise, just add `alif` to the global object
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = lib;
        }
        exports.format = lib;
    } else if (typeof define === 'function' && define.amd) {
        // Return the library as an AMD module:
        define([], function() {
            return lib;
        });
    } else {
        // Use alif.noConflict to restore `alif` back to its original value.
        // Returns a reference to the library's `alif` object;
        // e.g. `var numbers = alif.noConflict();`
        lib.noConflict = (function(oldFormat) {
            return function() {
                // Reset the value of the root's `alif` variable:
                root.format = oldFormat;
                // Delete the noConflict method:
                lib.noConflict = undefined;
                // Return reference to the library to re-assign it:
                return lib;
            };
        })(root.format);

        // Declare `alif` on the root (global/window) object:
        root['format'] = lib;
    }
})(this);

