# Start Project in TypeScript NestJS
Create By Phelipe Mizerani

### Features 
* Sequelize
* JWT (JSON Web Tokens)
* Swagger 

### DATABASE and PORT config
* Default PORT = 3000
* Edit files [development, test, production].env inside 'project' folder
* To use envoriment variables type on console before run the application:
````
$ export NODE_ENV=development|test|production
```` 

### How to run

````
$ cd /project
$ yarn or npm install
$ yarn start or npm run start
````

* To run in developement mode with nodemon
````
$ yarn start:dev or npm run start:dev
````
* To run in production mode
````
$ yarn prestart:prod or npm run prestart:prod
$ yarn start:prod or npm run start:prod
````

### Swagger UI
* To access swagger type on browser <b>http://localhost:3000/api</b>

### How to DEBUG NestJS TypeScript with WebStorm (Tested on version 2018.1.2)
* Configure debug on WebStorm for <b>NodeJS</b> application
* Node parameters: <b>--inspect-brk -r ts-node/register</b> 
* Working directory: /path_of_application/
* Javascript file: start_file.ts
