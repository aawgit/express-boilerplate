import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error(
            `Invalid value: email. Expected email address. Received ${value}.`
          );
        }
      },
    },
    password: {
      type: String,
      // TODO: Make password required and improve registration process to incooporate password
      // required: true,
      trim: true,
    },
    secretToken: String,
    isActivated: Boolean,
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("memes", {
  ref: "Meme",
  foreignField: "owner",
  localField: "_id",
});

mongoose.model("User", UserSchema);

export default mongoose.model("User");
