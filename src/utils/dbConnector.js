import mongoose from "mongoose";
import config from "../config"

export const connectToMongo = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(config.mLabURI).then(value => {
        // TODO: Use logger
        console.log('Connected to the DB.')
    }).catch(reason => {
        // TODO: Log error
    });
}