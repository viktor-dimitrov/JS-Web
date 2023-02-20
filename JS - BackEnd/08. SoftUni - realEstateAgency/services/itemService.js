const House = require('../models/house');


exports.getAll = async () => await House.find().lean();

exports.getOne = async (itemId) => {
try{
     return await House.findById(itemId).populate('author').populate('rent').lean();
}catch(error){
    throw new Error(error.message)
}
}   

exports.createItem = async (data) => {
    try{
        await House.create(data);
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.delItem = async (itemId) => await House.findByIdAndDelete(itemId);

exports.editItem = async (itemId, data) => {
   
    try{
        await House.findByIdAndUpdate(itemId, data, {runValidators: true})

    }catch(error){
       
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateHouse = async (itemId, userId, pieces) => {
    try{

        console.log(itemId, userId)
          await House.findByIdAndUpdate(itemId, {$push: {rent: userId }, pieces: pieces}).lean();

    }catch(error){
        throw new Error(error.message)
    }
} 


exports.searchItems =async (text) => {

    
const expressions = [];
      
 if(text) {
     expressions.push({'type': {$regex: `${text}`, $options: 'i'}});
}

 return await House.find({$and: expressions}).lean();

    // const allAdds = await House.find().populate('author').lean();

    // const allAuthors = allAdds.map(el => el = {email: el.author.email, headline: el.headline, name: el.name} );

    // const result = allAuthors.filter(el => el.email.includes(text));
  
    // return result

}
    

