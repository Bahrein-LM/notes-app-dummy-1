import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import nodesRoutes from './routes/nodesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

// use this line so you can access the env file
dotenv.config();

// => First Step: Creating Backend System

// => Second Step: Nodemon & Setting up Routes

// => Third Step: Create a rate limiter

// => Fourth Step: Combine the Middleware & RateLimit

// LET'S CONTINUES THE LESSON ONTO THE FRONTEND =>

// to make it easier when we change the code and the server will auto restart, we need to install "npm install nodemon -D" (-D means dev-dependency 'you can check it on "package.json"')

// after that, goes to "package.json" and change on the "dev" part from "node server.js" into "nodemon server.js" then re-run "npm run dev"

// REMEMBER: this file is for the center when you start the server to read the data

// -> what is rate limiter? -> is a way to control how often someone can do something on a website or an app about how many times they can refresh a page, make a request to an API, or try to log in

// tips for setting request -> if the request is for many users, setup the total request into 100 per-user every 15 minutes

// -> if the user is just less than 10 user, then you can setup the rates into 10 per-user every 30 seconds

// -> RATE LIMITING HELPS:
// -> Preventing abuse (example. stopping someone from making 1000 login per-minute)
// -> Protecting servers from getting overwhelmed

// to implement the Rate Limiter, you need software called "UPSTASH" that handle rates

const app = express()

const PORT = process.env.PORT || 3001;
const PORT_FRONT = 5173;


// connectDB() // connect to the database

// -> what is middleware? => middleware is a function that runs in the middle between the request and the response

// -> what is CORS? CORS is a browser security rule, like when a website tries to get the data from another webiste
// -> just like when your frontend calls an API on a different domain, the browser might block it for security reasons
// -> so you need to allow the API first.

// declare middleware
app.use(express.json()) // this middleware will parse JSON bodies: req.body
app.use(cors({
    origin: `http://localhost:${PORT_FRONT}`, // localhost from frontend
}));
app.use(rateLimiter);



// here is how to use middleware
// app.use((req, res, next) => {
//     console.log(`Request method is: ${req.method} & Request URL is: ${req.url}`);
//     next();
// })
// middleware above will be executed when you run another process in "nodesRoutes" function (run "GET, POST, PUT, or DELETE")

app.use("/api/notes", nodesRoutes);

// you can combine it by lets put connecting DB first, then run the server
connectDB()
    .then(
        app.listen(PORT, () => {
            console.log(`Server started on port http://localhost:${PORT}`)
        })
    )
    .catch(error => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    })

// this is for running the server
// app.listen(PORT, () => {
//    console.log(`Server started on port http://localhost:${PORT}`)
//})

// "mongodb+srv://herouser:hero123@cluster1.qzmy6jc.mongodb.net/?appName=cluster1"