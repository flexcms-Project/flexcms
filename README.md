## flexcms
Flexcms a open source website content management system, that allow you to create your very own blog that you can use to create and post any article that you want.

## this project was made by :
- Faldi Ramadhan (Frontend)
- Satria Aluh Perwira Nusa (Backend)


## How to Install the Flexcms
- create an .env file in the app root
- fill the attributes of the .env file with these variables, ane make sure you change the value of these variables
* |=================================================
- NODE_ENV = development
- MAX_DATA_PARSE = 4mb
- PORT = 3000

- PGUSER = yourPostgresUsername
- PGPASSWORD = yourPostgresPassword
- PGDATABASE = yourPostgresDatabase
- PGHOST = 127.0.0.1
- PGPORT =  5432

- TOKEN_SECRET = randomStringYouWantToPut
- TOKEN_AGE_IN_DAY = 3
* |==================================================

after you create the .env file on the top, now install the app with these command 
- make sure you have nodeJS already installed
- use vscode or any other IDE 
- open the folder of the app
- now if you use the vscode and the app's folder already opened, write these command on the terminal
  * npm install
  * npm run db-create
  * npm run db-migrate-up
  * npm run install-views
- after all of the command on the top has been done, you can use npm run start-dev to start the app
  * npm run start-prod



## all the libraries or package or dependencies that we use in this project :
- express Js
- postgresql
- sequelize
- ejs
- jsonwebtoken
- joi
- dotenv
- bcrypt
- cookie-parser
- nanoid
- multer
- pg-hstore
- postcss
- tailwindcss
- autoprefixer
