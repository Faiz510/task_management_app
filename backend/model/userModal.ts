import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserSchemaType extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  createdAt: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

const userSchema: Schema<UserSchemaType> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be greater than 6 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (this: UserSchemaType, val: string) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  // hashed password
  const hashed = await bcrypt.hash(this.password, 12);
  this.password = hashed;
  // don't save confirmPassword in database
  this.confirmPassword = undefined;
});

// check password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserSchemaType>("User", userSchema);

export default User;
