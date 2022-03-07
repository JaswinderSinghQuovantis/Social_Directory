import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
	email:
	{
		type: String, min: [4, 'Too short, min is 4 characters'], max: [32, 'Too long, max is 32 characters'],
		unique: true, lowercase: true, required: 'Email is Required'
	},
	password:
	{
		type: String, min: [4, 'Too short, min is 4 characters'], max: [32, 'Too long, max is 32 characters'],
		required: 'Password is Required'
	},
	phoneNo:
	{
		type: String,
		unique: true,
		required: 'PhoneNo is Required'
	}
}, {
	timestamps: true
}
);
userSchema.pre('save', async function (next) { // this line
	const user = this;
	if (!user.isModified('password'))
		return next();
	user.password = await bcrypt.hashSync(user.password, 8);
	next();
})

const user = mongoose.model('User', userSchema)
export default user;