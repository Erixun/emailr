import mongoose, { Schema } from "mongoose";
import recipientSchema from "./Recipient.js";

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema], //subdocument collection of Recipient {email, clicked}
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  //prefix underscore to indicate relationship/reference field
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

const Survey = mongoose.model("surveys", surveySchema);

export type SurveyModel = typeof Survey;

//should not be exported?
export default Survey;
