const mongoose = require('mongoose');
const mongoDBCred = process.env.DB_CONNECT;

module.exports = async () => {
    await mongoose.connect(mongoDBCred, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose;
}
