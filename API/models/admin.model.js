import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const adminSchema=mongoose.Schema({
	_id: Number,
	name: {
       type: String,
       required: [true,"name is required"],
       lowercase: true,
       trim: true
	},
	email: {
		type: String,
		required: [true,"email is required"],
		unique:true,
		lowercase:true,
		trim:true
	},
	password: {
		type: String,
		required:[true,"password is required"],
		maxlength:10,
		minlength:5,
		trim:true
	},

   role: String,
   status: Number,
   info: String,
});

adminSchema.plugin(uniqueValidator);

const adminSchemaModel = mongoose.model('adminn_collection',adminSchema);

export default adminSchemaModel;