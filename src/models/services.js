import mongoose from "mongoose"

const serviceSchema = mongoose.Schema({

    title:{
        type:String,
        required:[true,"Title is Required"],
        unique:[true,"Title must be Unique"]
    },
    description:{
        type:String,
        required:[true,"Description is required"],

    },
    tag:{
        type:String,
        required:[true,"Tag is Required"],

    }

})

const serviceModel=mongoose.model("Services",serviceSchema)

export default serviceModel;