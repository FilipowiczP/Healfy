import mongoose from "mongoose";

const connectToMongoose = async () => {
  //    === LOCAL DATABASE ===
  // const url = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  //    === DEPLOY DATABASE ===
  const url = `mongodb+srv://przemek:${process.env.PASSWORD}@cluster0.g2rvo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  await mongoose.connect(url);
};

export default connectToMongoose;
