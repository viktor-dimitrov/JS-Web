const Publication = require('../models/publication');
const User = require('../models/user');


exports.getAll = async () => await Publication.find().lean();

exports.getOne = async (itemId) => {
try{
     return await Publication.findById(itemId).populate('author').populate('shared').lean();
}catch(error){
    throw new Error(error.message)
}
}   

exports.createItem = async (data) => {
    try{
        const item = await Publication.create(data);
        await User.findByIdAndUpdate(data.author, {$push: {publications: item._id}})
        
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.delItem = async (itemId) => await Publication.findByIdAndDelete(itemId);

exports.editItem = async (itemId, data) => {
   
    try{
        await Publication.findByIdAndUpdate(itemId, data, {runValidators: true})

    }catch(error){

        console.log(error.message)
       
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateShares = async (itemId, userId) => {
    try{
                await User.findByIdAndUpdate(userId, {$push: {shares: itemId}})
       return   await Publication.findByIdAndUpdate(itemId, {$push: {shared: userId }}).lean();

    }catch(error){
        throw new Error(error.message)
    } 
} 


// exports.searchItems =async (text) => {

    
// const expressions = [];
      
//  if(text) {
//      expressions.push({'type': {$regex: `${text}`, $options: 'i'}});
// }

//  return await House.find({$and: expressions}).lean();

    // const allAdds = await House.find().populate('author').lean();

    // const allAuthors = allAdds.map(el => el = {email: el.author.email, headline: el.headline, name: el.name} );

    // const result = allAuthors.filter(el => el.email.includes(text));
  
    // return result

// }
    

