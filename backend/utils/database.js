import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect success!");
    } catch (error) {
        console.log("connect error!", error);
    }
};

export default { connect };