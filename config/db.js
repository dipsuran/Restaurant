const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/test');
   await mongoose.connect('mongodb+srv://dipsurani216:A0bgpFTQuZ2SzeWB@cluster0.mqqzx.mongodb.net/food');
   
   console.log("database connected");
}


//dipsurani216
//A0bgpFTQuZ2SzeWB
