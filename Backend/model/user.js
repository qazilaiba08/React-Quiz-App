import mongoose from 'mongoose';

const databaseUser = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin'], 
	},
	isCustomer: {
		type: Boolean,
		default: false, 
	},
});

databaseUser.index({email: 1,},{ unique: true },);

const User = mongoose.model('Users', databaseUser);

export default User;

