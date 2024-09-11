// const mongoose = require('mongoose');
// // create a schema for Users

// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     firstname: String,
//     lastname: String,
// });

// // create a model from the shema
// const User = mongoose.model('User', userSchema);
// module.exports={
//     User
// };
// This is the simple Solution




//Now the elegant Solution


const mongoose = require('mongoose');
// create a schema for Users
main().catch(err => console.log("Error connecting to MongoDB"));
async function main(){
    await mongoose.connect("mongodb://localhost:27017/paytm");
    console.log("Connected to MongoDB");
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

//Create a model from the schema

const User = mongoose.model('User', userSchema);
module.exports={
    User
};