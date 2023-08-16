/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Basic Schema
const BasicSchema = new Schema({
    email: {
        type: String,
        default: "",
        require: true,
    },
    password: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Users = mongoose.model("users", BasicSchema);
