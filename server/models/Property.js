import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    agency: { type: String, ref: "Agency", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: Number, required: true },
    propertyType: { type: String, required: true },
    price: {
      rent: { type: Number },
      sale: { type: Number },
    },
    facilities: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      garages: { type: Number, required: true },
    },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
