import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    images: {
        type: [String]
    },
    rating: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    placeId: {
        type: Schema.Types.ObjectId,
        ref: 'Place'  
    },
});

export default mongoose.model("Review", ReviewSchema);
