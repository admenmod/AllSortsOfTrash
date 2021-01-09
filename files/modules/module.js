'use strict';
exports('./module.js', function() {
	console.log('load module.js');
	log(imports('mod2'));
	
	return {
		grt: 754
	};
});
