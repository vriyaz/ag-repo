function testType(){var o="a",e=[o,"b"];console.log(typeof["a","b","c"]),console.log("string"),console.log(typeof{a:"n"}),console.log(util.isArray(o)),console.log(util.isArray(e))}function testText(){var o=[void 0,"",{},123,-123,"a","a good day","aGoodDay","a-good-day","a_good_day","a    good    day","A GOOD DAY",["a good case","bGoodCase"]];_.each(o,function(o){console.log("orig-case: "+o+",\n	upper-case: "+f.upper(o)+", \n	lower-case: "+f.lower(o)+", \n	title-case: "+f.title(o)+", \n	snake-case: "+f.snake(o)+", \n	spinal-case: "+f.spinal(o)),console.log("	first-few: "+JSON.stringify(f.firstFew(o))),console.log("	trim: "+JSON.stringify(f.trim(o)))})}function testNumber(){var o=[void 0,"",{},0,123,123.45,12345677.45677,"abc",[[1,-1],1231232,-12123]];_.each(o,function(o){console.log("number: "+JSON.stringify(o)+" --> "+JSON.stringify(f.number(o)))})}function testMoney(){var o=[void 0,{},{m:0,c:"USD"},{m:1234567.8903,c:"EUR"},[{m:-1,c:"USD"},{m:7685437.8903,c:"EUR"}]];_.each(o,function(o){console.log("money: "+JSON.stringify(o)+" --> "+JSON.stringify(f.money(o)))})}function testAcct(){var o=[void 0,"",{},123455,"12123","123456789","1234567890",["12","1212"]];_.each(o,function(o){console.log("acct: "+o+" --> "+f.acct(o))})}function testAccounting(){console.log("testAccounting ..."),console.log("a: "+accounting.formatMoney(12344.5))}function testMinimist(o){console.log("testMinimist ..."),console.log(o)}function testFs(){console.log("testFs ...");var o=process.env.TECH_HOME;fs.readdir(o,function(o,e){var n=_.size(e);console.log("        size: "+n);var t=_.find(e,function(o){return"bin"==o});console.log("        looking for bin: "+t),e=_.filter(e,function(o){return"."!=o.charAt(0)}),console.log("        listing files ..."),_.each(e,function(o){console.log("            :"+o)})})}function testJson(){console.log("testJson ...");var o=fs.readFileSync("./hello-world.json","utf8");console.log("    file contents:"+o);var e=JSON.parse(o);console.log("    json:"+JSON.stringify(e)+", hw.hello:"+e.hello)}function testFileWrite(o,e){console.log("testFileWrite: "+o+", "+e+"..."),fs.writeFile(o,e,function(e){if(e)throw e;console.log("wrote to file: "+o)})}function testRedis(){console.log("testRedis ...");var o=redis.createClient();o.on("error",function(e){console.log("error: "+e),o.quit(),process.exit(1)}),o.set("foo","bar",redis.print),o.get("foo",redis.print),o.quit()}var f=require("./format"),fs=require("fs"),redis=require("redis"),argv=require("minimist")(process.argv.slice(2));accounting=require("accounting"),util=require("util"),_=require("underscore"),testAcct(),testMoney(),testNumber();