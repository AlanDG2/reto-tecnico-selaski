const report = require("multiple-cucumber-html-reporter");

	report.generate({
  	jsonDir: "jsonlogs",                              
  	reportPath: "reports/cucumber-htmlreport.html",  
 	 metadata: {
    	browser: {
      	name: "chrome",                            
      	version: "138",				 
    	},
    	device: "Local test machine",
    	platform: {
      	name: "windows",                             
      	version: "11",
    	},
  	},
	});