import mongoose from "mongoose";

async function ConnectMongoDB(url){
    return mongoose.connect(url);
}

export default ConnectMongoDB;