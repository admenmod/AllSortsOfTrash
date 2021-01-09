// function loopNum(a, ot = -1, ido = 1) {return ot<=a&&a<=ido ? a :(Math.abs(a)%(ido-ot)+ot)*(Math.sign(a)?Math.sign(-a):1);};
/*
function loopNum(a, ot = -1, ido = 1) {
	if(ot<=a&&a<=ido) return a;
	let d = ido-ot;
	let res = Math.abs(a)%d+ot;
//	v%d+to
	let c = a/res;
	res *= c/d%2? -1:1;
//	(a>0?-1:1);
	return res;
};//*/


// -10..10 # 13 : -3
function loopNum(v, min = -1, max = 1) {
	if(min<=v && v<=max) return v;
	
	let res = v;
	if(v<min) {
		res = max-(Math.abs(v)%(max-min));
	} else if(v>max) {
		res = min+(Math.abs(v)%(max-min));
	};
	
	if(max!==0 && min!==0 && Math.sign(min) !== Math.sign(max)) {
		res *= -1;
	};
	
	return res; //(v-min)%(max-min)+min;
	
	
	
//	return -(min+vmod);
	
	
//	return -(value%range-min);
//	return (min>0)===(max>0)||min===0||max===0? vmod+min:(vmod+min)*c;
//	res *= c/d%2 ?-1:1;
};

function tests(log) {
	log('tests:');
	log('-10..+10: +13'+'  '+(loopNum(13, -10, 10) === -3)+'|'+loopNum(13, -10, 10)+' -3');
	log('-10..+10: -13'+'  '+(loopNum(-13, -10, 10) === 3)+'|'+loopNum(-13, -10, 10)+' +3');
	log('+5...+10: +13'+'  '+(loopNum(13, 5, 10) === 8)+'|'+loopNum(13, 5, 10)+' +8');
	log('+5...+10: -13'+'  '+(loopNum(-13, 5, 10) === 7)+'|'+loopNum(-13, 5, 10)+' +7');
	log('-10...-5: +13'+'  '+(loopNum(13, -10, -5) === -7)+'|'+loopNum(13, -10, -5)+' -7');
	log('-10...-5: -13'+'  '+(loopNum(-13, -10, -5) === -8)+'|'+loopNum(-13, -10, -5)+' -8');
};











/*
Чистая функция:
	1. При одних и тех же входных параметрах, возвращяет оди и тот же результат (Результат относительно входных параметров, всегда предопределен);
	2. Не должна взаимодействовать со внешними данными (чтение/запись) (может работать только с данными относящимися к области видимоси функции);
	3. Имутабельность входных данных;
*/



function loopNum(v, min = -1, max = 1) {
	if(v <= min && max <= v) return v;
	
	let res = v;
	let range = max-min;
	
	if(Math.sign(max) === Math.sign(min)) {
		if(v>0) res = v % range + min;
		if(v<0) res = v % range + max;
	} else {
		if(v>0) res = (v % range + min) * -Math.sign(v);
		if(v<0) res = (v % range + max) * Math.sign(v);
	};
	
	return res;
};

// tests(log);





