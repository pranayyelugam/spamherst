const mongoose = require('mongoose');
const mongoDBCred = process.env.DB_CONNECT;

module.exports = async () => {
    await mongoose.connect("mongodb+srv://mongo:pranay@cluster0.g9vfw.mongodb.net/mongo?retryWrites=true&w=majority", {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose;
}
