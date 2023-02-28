import mongoose, { Schema } from "mongoose";

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String], //subdocument collection of Recipient {email, clicked}
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
});

const Survey = mongoose.model("surveys", surveySchema);

export default Survey;
