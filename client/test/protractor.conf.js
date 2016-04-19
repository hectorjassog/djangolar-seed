exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['protractor.spec.js'],
/*	capabilities: {
		browserName: 'phantomjs'
	}*/
  multiCapabilities: [
		{
			browserName: 'firefox'
	 	},
		{
			browserName: 'phantomjs',
			'phantomjs.binary.path': require('phantomjs-prebuilt').path
	 	}
  ]

};
