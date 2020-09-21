# Authentication - Service (Microservice)

## Goal
Part of my Microservice architecture where I am creating standalone and reusable programmes. 
The Auth service is used to authenticate and grant a token by implementing local (email & password) and Google. 

## MVP - features

 **Current**
 - sign up new user
 - create Token
 - sign in existing user (normal + with Google)
 - update user
 - get user by token

**Upcoming**
 - reset password and send email

  
## Tech-stack
 -  Node / Express
-   MongoDB / Mongoose
-   Joi
-   PassportJS (local, JWT, Google)
  

## Setup
After downloading or cloning the repo, you need to follow this steps to have the development environment running :

1.  Make sure that you have npm, node and mongodb installed
2.  Run mongo server
3.  Install dependencies :  `npm install`
4. Create config/config.env and add the following keys and values: NODE_ENV=development PORT=5000 MONGO_URI= JWT_SECRET= GOOGLE_CLIENT_ID= GOOGLE_CLIENT_SECRET=
5.  In the project directory, run the command `npm run dev` to start the development server with nodemon
