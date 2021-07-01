const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//handle uncaught exception
process.on('uncaughtException',err =>{

    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error')
    process.exit(1)
})

//Setting up config file
dotenv.config({path:'config/config.env'});

//connect database
connectDatabase()
//connect server

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server running at port no. ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
} )

//handle unandled promise rejection

process.on('unhandledRejection',err =>{

    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server')

    server.close(()=>{
        process.exit(1);
    })
})

