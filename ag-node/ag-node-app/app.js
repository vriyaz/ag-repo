var f = require('./format'), fs = require('fs'), redis = require('redis'), argv = require('minimist')(process.argv.slice(2));
accounting = require('accounting'), util = require('util'), _ = require('underscore');
testAcct();
testMoney();
testNumber();
/*
    testText();
    testAccounting();
    testMinimist(argv);
    testJson();
    testFs();
    testRedis();
*/
function testType() {
  var a = 'a', b = [
      a,
      'b'
    ];
  console.log(typeof [
    'a',
    'b',
    'c'
  ]);
  console.log(typeof 'a');
  console.log(typeof { 'a': 'n' });
  console.log(util.isArray(a));
  console.log(util.isArray(b));
}
function testText() {
  var sentences = [
    undefined,
    '',
    {},
    123,
    -123,
    'a',
    'a good day',
    'aGoodDay',
    'a-good-day',
    'a_good_day',
    'a    good    day',
    'A GOOD DAY',
    [
      'a good case',
      'bGoodCase'
    ]
  ];
  _.each(sentences, function (sentence) {
    console.log('orig-case: ' + sentence + ',' + '\n\tupper-case: ' + f.upper(sentence) + ', ' + '\n\tlower-case: ' + f.lower(sentence) + ', ' + '\n\ttitle-case: ' + f.title(sentence) + ', ' + '\n\tsnake-case: ' + f.snake(sentence) + ', ' + '\n\tspinal-case: ' + f.spinal(sentence));
    console.log('\tfirst-few: ' + JSON.stringify(f.firstFew(sentence)));
    console.log('\ttrim: ' + JSON.stringify(f.trim(sentence)));
  });
}
function testNumber() {
  var numbers = [
    undefined,
    '',
    {},
    0,
    123,
    123.45,
    12345677.45677,
    'abc',
    [
      [
        1,
        -1
      ],
      1231232,
      -12123
    ]
  ];
  _.each(numbers, function (number) {
    console.log('number: ' + JSON.stringify(number) + ' --> ' + JSON.stringify(f.number(number)));
  });
}
function testMoney() {
  var monies = [
    undefined,
    {},
    {
      m: 0,
      c: 'USD'
    },
    {
      m: 1234567.8903,
      c: 'EUR'
    },
    [
      {
        m: -1,
        c: 'USD'
      },
      {
        m: 7685437.8903,
        c: 'EUR'
      }
    ]
  ];
  _.each(monies, function (money) {
    console.log('money: ' + JSON.stringify(money) + ' --> ' + JSON.stringify(f.money(money)));
  });
}
function testAcct() {
  var accts = [
    undefined,
    '',
    {},
    123455,
    '12123',
    '123456789',
    '1234567890',
    [
      '12',
      '1212'
    ]
  ];
  _.each(accts, function (acct) {
    console.log('acct: ' + acct + ' --> ' + f.acct(acct));
  });
}
function testAccounting() {
  console.log('testAccounting ...');
  console.log('a: ' + accounting.formatMoney(12344.5));
}
function testMinimist(argv) {
  console.log('testMinimist ...');
  console.log(argv);
}
function testFs() {
  console.log('testFs ...');
  var dir = process.env.TECH_HOME;
  // read from the env variables
  fs.readdir(dir, function (err, files) {
    var size = _.size(files);
    console.log('        size: ' + size);
    var foundBin = _.find(files, function (f) {
      return f == 'bin';
    });
    console.log('        looking for bin: ' + foundBin);
    files = _.filter(files, function (x) {
      return x.charAt(0) != '.';
    });
    // skip hidden files
    console.log('        listing files ...');
    _.each(files, function (x) {
      console.log('            :' + x);
    });  //testFileWrite(dir + '/ws-foo/list.txt', files.join());
  });
}
function testJson() {
  console.log('testJson ...');
  var hwStr = fs.readFileSync('./hello-world.json', 'utf8');
  console.log('    file contents:' + hwStr);
  var hwJson = JSON.parse(hwStr);
  console.log('    json:' + JSON.stringify(hwJson) + ', hw.hello:' + hwJson.hello);
}
function testFileWrite(outFile, data) {
  console.log('testFileWrite: ' + outFile + ', ' + data + '...');
  fs.writeFile(outFile, data, function (err) {
    if (err)
      throw err;
    console.log('wrote to file: ' + outFile);
  });
}
function testRedis() {
  console.log('testRedis ...');
  var client = redis.createClient();
  client.on('error', function (err) {
    console.log('error: ' + err);
    client.quit();
    process.exit(1);
  });
  client.set('foo', 'bar', redis.print);
  client.get('foo', redis.print);
  client.quit();
}