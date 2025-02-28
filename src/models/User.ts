import mongoose, { Schema, Document } from "mongoose"
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string;
  age: number;
  fname: string;
  lname: string;
  password: string;
  type: "admin" | "manager" | "employee";
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
      min: 10
    },
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "admin"
    },
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {

  const user = this as unknown as IUser;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password as string, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
};

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)