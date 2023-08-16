import mongoose from "mongoose";
import setlog from "../utils/setlog";

import { Users } from "./user";

export const connectDatabase = async (mongoUrl: string) => {
    try {
        const options = {
            autoCreate: true,
            keepAlive: true,
            retryReads: true,
        } as mongoose.ConnectOptions;
        const result = await mongoose.connect(mongoUrl, options);

        if (result) {
            setlog("MongoDB connected");
        }
    } catch (err) {
        setlog("ConnectDatabase", err);
    }
};

export const Model = {
    Users,
};
