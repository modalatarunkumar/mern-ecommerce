import mongoose from "mongoose";
import app from "./src/app.js"
import config from "./src/config/index.js";
// create a method
// run this method
// a simpler approach is iif - immediately invoking function

(async () => {
    try {
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
        await mongoose.connect(config.MONGODB_URL, clientOptions);
        console.log("DB connected! ");
        
        app.on('error', (err) => {
            console.error("Error: ", err);
            throw err;
        })
        const onListening = () => {
            console.log(`Listening on port ${config.PORT}`);
        }
        app.listen(config.PORT, onListening);

    } catch (err) {
        console.error("Error: ",err);
        throw err;
    }
})()


