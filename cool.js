var fincre;
var incre;
var intim;
var ffactor;
var ntime;
var ntime1;
var ntime2;
var ntime3;
var stroke;
var dis;
var bob;
var fin;
var fin1 = 0;
var fin2 = 0;
var fin3 = 0;
var type;
document.getElementById("but").onclick = function() {
document.getElementById("value").style.display = "block";
ntime1 = document.getElementById("ntime_1").value;
ntime2 = document.getElementById("ntime_2").value;
ntime = Number(ntime1)*60 + Number(ntime2);
type = document.getElementById("stroe_2").value;
switch (type) {
case "scy_lcm":
conver1();
break;
case "scy_scm":
conver2();
break;
case "scm_scy":
conver3();
break;
case "scm_lcm":
conver5();
break;
case "lcm_scm":
conver6();
break;
default:
conver4();
}
}
//scy_lcm
function conver1() {
stroke = document.getElementById("stroke_1").value;
dis = document.getElementById("dis_1").value;
ffactor = 1.11;
switch (stroke) {
case "fr":
incre = .8;
break;
case "bk":
incre = .6;
break;
case "br":
incre = 1;
break;
case "fl":
incre = .7;
break;
case "im":
incre = .8;
break;
default:
console.log("error 1");
};
switch (dis) {
case "50":
intim = 1;
break;
case "100":
intim = 2;
break;
case "200":
intim = 4;
break;
case "500":
if (stroke !== "fr") {
window.alert("Warning: convertion was done for 500 free");
}
intim = 0;
ffactor = 0.8925;
break;
case "1000":
if (stroke !== "fr") {
window.alert("Warning: convertion was done for 1000 free");
}
intim = 0;
ffactor = 0.8925;
break;
case "1650":
if (stroke !== "fr") {
window.alert("Warning: convertion was done for 1650 free");
}
intim = 0;
ffactor = 1.02;
break;
default:
console.log("error 2");
};
bob = incre*intim+ffactor*ntime;
convert()
}
//scy_scm
function conver2() {
stroke = document.getElementById("stroke_1").value;
dis = document.getElementById("dis_1").value;
var num = 0;
switch (dis) {
  case "500":
  num = 1.143;
  break;
  case "1000":
  num = 1.143;
  break;
  case "1650":
  num = 1.003;
  break;
  default:
  num = .9009009009;
}
bob = ntime/num;
convert()
}
//scm_scy
function conver3() {
stroke = document.getElementById("stroke_1").value;
dis = document.getElementById("dis_1").value;
var num = 0;
switch (dis) {
  case "500":
  num = 1.143;
  break;
  case "1000":
  num = 1.143;
  break;
  case "1650":
  num = 1.003;
  break;
  default:
  num = .9009009009;
}
bob = ntime*num;
convert()
}
//lcm_scy
function conver4() {
stroke = document.getElementById("stroke_1").value;
dis = document.getElementById("dis_1").value;
ffactor = 1.11;
switch (stroke) {
case "fr":
incre = .8;
break;
case "bk":
incre = .6;
break;
case "br":
incre = 1;
break;
case "fl":
incre = .7;
break;
case "im":
incre = .8;
break;
default:
console.log("error 1");
};
switch (dis) {
case "50":
intim = 1;
break;
case "100":
intim = 2;
break;
case "200":
intim = 4;
break;
case "500":
if (stroke !== "fr") {
window.alert("Warning: convertion was done for 500 free");
}
intim = 0;
ffactor = 0.8925;
break;
case "1000":
if (stroke !== "fr") {
window.alert("Warning: convertion was done for 1000 free");
}
intim = 0;
ffactor = 0.8925;
break;
case "1650":
if (stroke !== "fr") {
window.alert("Warning: convertion was done for 1650 free");
}
intim = 0;
ffactor = 1.02;
break;
default:
console.log("error 2");
};
bob = (ntime-incre*intim)/ffactor;
convert();
}
//scm_lcm
function conver5() {
stroke = document.getElementById("stroke_1").value;
dis = document.getElementById("dis_1").value;
ffactor = 1;
switch (stroke) {
case "fr":
incre = .8;
break;
case "bk":
incre = .6;
break;
case "br":
incre = 1;
break;
case "fl":
incre = .7;
break;
case "im":
incre = .8;
break;
default:
console.log("error 1");
};
switch (dis) {
case "50":
intim = 1;
break;
case "100":
intim = 2;
break;
case "200":
intim = 4;
break;
case "500":
intim = 8;
break;
case "1000":
intim = 16;
break;
case "1650":
intim = 30;
break;
default:
console.log("error 2");
};
bob = incre*intim+ffactor*ntime;
convert();
}
//lcm_scm
function conver6() {
stroke = document.getElementById("stroke_1").value;
dis = document.getElementById("dis_1").value;
ffactor = 1;
switch (stroke) {
case "fr":
incre = .8;
break;
case "bk":
incre = .6;
break;
case "br":
incre = 1;
break;
case "fl":
incre = .7;
break;
case "im":
incre = .8;
break;
default:
console.log("error 1");
};
switch (dis) {
case "50":
intim = 1;
break;
case "100":
intim = 2;
break;
case "200":
intim = 4;
break;
case "500":
intim = 8;
break;
case "1000":
intim = 16;
break;
case "1650":
intim = 30;
break;
default:
console.log("error 2");
};
bob = (ntime-incre*intim)/ffactor;
convert();
}
function convert() {
fin1 = 0;
fin2 = 0;
fin3 = "";
fin2 = Number(bob);
while (fin2/60 >= 1) {
fin2 -= 60;
fin1 ++;
}
if (fin2 < 10) {
fin3 = "0";
} 
if (fin1 !== 0) {
document.getElementById("value_1").innerHTML= fin1 + ":" + fin3 + fin2;
} else {
document.getElementById("value_1").innerHTML= fin3 + fin2;
}
}