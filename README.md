# Tesseract Express/Nodejs API
API for automatic attendance using chat screenshot and Tesseract OCR

## About
API that manages access to Tesseract OCR, it will provide an access-point via REST.

Requests will need to have the Google Meet chat image that contains  attendance comments 
composed of name and "Presente" message.

### Code and Testing
Typescript base code and then built into javascript code.

[Mocha] as test framework and [Chai] as assertion library.
There is a a github action workflow for branches.

## Project status
This project is currently in development.

## Coding guidelines
Files and packages structure follow multitier architecture structure.
We're using prettier as code formatter, code is automatically formatted during git commit.

## Setup
### Requirements
This project is being developed and tested under the following:
* [Docker] (19.03.13) and [docker-compose] (1.27.4)
* [Nodejs] (v12.19.0)
* [Typescript] (4.0.3)

### Get Started
coming soon...

### Testing
coming soon...
    
### Package.json Scripts
coming soon...

[sinon.js]: <https://sinonjs.org/>
[Mocha]: <https://mochajs.org/>
[Chai]: <https://www.chaijs.com/>
[Docker]: <https://www.docker.com/>
[docker-compose]: <https://docs.docker.com/compose/>
[Nodejs]: <https://nodejs.org/es/>
[Typescript]: <https://www.typescriptlang.org/>
