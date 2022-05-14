# Spruce.co Practical Assessment
[![wdio-test](https://github.com/angelo-loria/spruce-practical-assessment/actions/workflows/wdio-test.yaml/badge.svg)](https://github.com/angelo-loria/spruce-practical-assessment/actions/workflows/wdio-test.yaml)


### Project Structure
    spruce-practical-assessment                                     
    ├─ postman                                 
    │  └─ collection                           
    ├─ test                                    
    │  ├─ pageobjects                                                       
    │  └─ specs                                                  
    ├─ README.md                               
    ├─ babel.config.js                         
    ├─ package-lock.json                       
    ├─ package.json                            
    └─ wdio.conf.js                            


## UI Automation
This is a WebdriverIO project, structured in a page object model. It uses Mocha for the testing framework, tests are executed in Chrome via Chromedriver, and StandardJS is handling linting. There is a Github Actions workflow for remote execution.

## API Automation
This is a Postman collection containing various requests for the PerfDog petstore. Each request contains a test for response validation and a test for schema validation. Execution in Github Actions is handled via newman.