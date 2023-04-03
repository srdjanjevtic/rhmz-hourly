const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        required: [true, "Molimo Vas unesite korisničko ime."]
    },
    password: {
        type: String,
        required: [true, "Molimo Vas da unesete lozinku."]
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    email: {
        type: String,
        required: [true, "Molimo Vas da unesete email adresu."],
        unique: [true, "Već postoji nalog sa ovom email adresom."],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Molimo Vas da unesete ispravnu email adresu."],
        lowercase: true,
        dropDups: true
    },
    refreshToken: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    modifiedAt: {
        type: Date,
        default: () => Date.now()
    }
},
    {
        timestamps: true,
        get: v => v.toDateString()
    }
);

module.exports = mongoose.model("User", userSchema);