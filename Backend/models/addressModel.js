import mongoose from 'mongoose';
const AddressSchema=new mongoose.Schema({
  address:{type:Object,required:true},
  userId:{type:String,required:true}
})
const userAddress = mongoose.models.Address || mongoose.model("Address", AddressSchema);
export default userAddress;