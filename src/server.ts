import mongoose from "mongoose";
import app from "./app";
import config from "./config";

main().catch(err=> console.log(err));

async function main(){
    try{
        await mongoose.connect(config.database_url  as string)
        console.log("Server is connected succeflly");

        app.listen(config.port, () =>{
            console.log("server is running on the ", config.port);
        })
    }
    catch(err){
        console.log("Server not connected",err);
    }
}