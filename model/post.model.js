const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number,
    userID : String
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {
    PostModel
}

// "title" : "MongoDB",
//     "body" : "A place to store data",
//     "device" : "Mobile",
//     "no_of_comments" : 44