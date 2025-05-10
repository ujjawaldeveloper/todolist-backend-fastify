import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' }
});
userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

export default mongoose.model('User', userSchema);
