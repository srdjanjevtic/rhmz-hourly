const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.xpltb.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB