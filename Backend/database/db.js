const mongoose = require("mongoose");

const connection = async () => {
    try {
        const uri = "mongodb+srv://ekaya:1@tododb.3fpfoo5.mongodb.net/?retryWrites=true&w=majority"
        var result = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDb connection successful..")
    } catch (error) {
        console.log("MongoDb bağlantısı sırasında bir hatayla karşılaştık. Hata:" + error)
    }
}

module.exports = connection;