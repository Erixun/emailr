import { Model, Schema } from "mongoose";

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

export default recipientSchema;

// const Recipient = new Model("recipients", recipientSchema);

// export default Recipient;
