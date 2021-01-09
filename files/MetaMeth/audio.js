'use strict';
/*
let ac = new AudioContext();
let fac = new OfflineAudioContext();
let out = ac.createGain();

let osc;

out.gain.value = 1;

function playNote(ton, value = 1, type = 'sine') {
	let start = 0.05;
	osc = ac.createOscillator();
	osc.frequency.value = ton||440;
	
	osc.type = type; //'square'; //'bandpass';
	out.gain.value = value;
	
	decay(osc, 0.05).connect(out).connect(ac.destination);
	osc.start();
	osc.stop(ac.currentTime+2); //(osc.frequency.value*(1/2400)));
};

function decay(osc, start) {
    const env = ac.createGain();
    env.gain.setValueAtTime(out.gain.value, ac.currentTime + start);
    env.gain.exponentialRampToValueAtTime(0.00001, ac.currentTime + start + 1.5);
    osc.connect(env);
    return env;
};




/*
class rr extends AudioParam {
	constructor() {
		this.value = 1;
	}
}

*/