import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ShipmentSchema = mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    required: [true,"Title is required"],
    lowercase: true,
    trim: true,
  },
  catnm: {
    type: String,
    required: [true,"Category name is required"],
    lowercase: true,
    trim: true,
  },
  subcatnm: {
    type: String,
    required: [true,"SubCategory name is required"],
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true,"Description is required"],
    trim: true,
  },
  basecost: {
    type: String,
    required: [true,"Base cost is required"],
    trim: true,
  },
  shipmenticonnm: {
    type: String,
    required: [true,"Shipment icon name is required"],
    trim: true
  },
  info:Number
});

// Apply the uniqueValidator plugin to UserSchema.
ShipmentSchema.plugin(uniqueValidator);

// compile schema to model
const ShipmentSchemaModel = mongoose.model('shipment_collection',ShipmentSchema);

export default ShipmentSchemaModel

