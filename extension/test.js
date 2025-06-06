import { convert, formatTime } from "./converter.js";

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ ${message}. Expected ${expected}, but got ${actual}`);
    process.exitCode = 1; // mark test failure
  } else {
    console.log(`✅ ${message}`);
  }
}
//console.log(convert(33.112, 100, "fr", "lcm", "scy"));

const testConvert = (totalSeconds, distance, stroke, inputType, outputType) => {
  const val = convert(totalSeconds, distance, stroke, inputType, outputType);
  return Math.round(val * 1000) / 1000;
};

assertEqual(testConvert(33.112, 100, "fr", "scy", "scm"), 36.754, "scy to scm");
assertEqual(testConvert(63.112, 200, "bk", "scm", "scy"), 56.858, "scm to scy");
assertEqual(testConvert(83, 200, "br", "scy", "lcm"), 96.13, "scy to lcm");
assertEqual(testConvert(244, 400, "im", "lcm", "scy"), 214.054, "lcm to scy");
assertEqual(testConvert(53, 100, "fl", "scm", "lcm"), 54.4, "scm to lcm");
assertEqual(testConvert(23, 50, "fr", "lcm", "scm"), 22.2, "lcm to scm");

assertEqual(testConvert(300, 400, "fr", "lcm", "scm"), 293.6, "lcm to scm 400");
assertEqual(testConvert(300, 800, "fr", "lcm", "scm"), 287.2, "lcm to scm 800");
assertEqual(testConvert(300, 1500, "fr", "lcm", "scm"), 300-24, "lcm to scm 1500");
assertEqual(testConvert(300, 400, "fr", "scm", "lcm"), 300+6.4, "scm to lcm 400");
assertEqual(testConvert(300, 800, "fr", "scm", "lcm"), 300+12.8, "scm to lcm 800");
assertEqual(testConvert(300, 1500, "fr", "scm", "lcm"), 300+24, "scm to lcm 1500");

assertEqual(testConvert(300, 400, "fr", "scy", "lcm"), 300*.8925, "scy to lcm 400");
assertEqual(testConvert(300, 1500, "fr", "scy", "lcm"), 300*1.02, "scy to lcm 1500");
assertEqual(testConvert(300, 400, "fr", "lcm", "scy"), Math.round(300/.8925*1000)/1000, "scy to lcm 400");
assertEqual(testConvert(300, 1500, "fr", "lcm", "scy"), Math.round(300/1.02*1000)/1000, "scy to lcm 1500");

assertEqual(testConvert(300, 400, "fr", "scy", "scm"), (300*.8925)-6.4, "scy to scm 400");
assertEqual(testConvert(300, 800, "fr", "scm", "scy"), Math.round((300+12.8)/.8925*1000)/1000, "scm to scy 800");
assertEqual(testConvert(300, 1500, "fr", "scm", "scy"), Math.round((300+24)/1.02*1000)/1000, "scm to scy 1500");
assertEqual(testConvert(1000, 1500, "fr", "scy", "scm"), 1000*1.02-24, "scy to scm 1500");

assertEqual(formatTime(3604.33),"1:00:04.330", "hours")
assertEqual(formatTime(61.33),"1:01.330", "mins")
assertEqual(formatTime(63.3355555),"1:03.336", "rounding")