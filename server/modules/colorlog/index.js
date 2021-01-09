module.exports = function(t, ...s) {
	let r = '';
	for(let i = 0;i<s.length;i++) r+='\x1b['+s[i]+'m';
	return r+t+'\x1b[0m';
};