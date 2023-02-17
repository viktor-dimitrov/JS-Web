const Trip = require('../models/trip');


exports.getAll = async () => await Trip.find().lean();

exports.getOne = async (itemId) => {
try{
     return await Trip.findById(itemId).populate('author').lean();
}catch(error){
    throw new Error(error.message)
}
}   

exports.createItem = async (data) => {
    try{
        await Trip.create(data);
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.delItem = async (itemId) => await Trip.findByIdAndDelete(itemId);

exports.editItem = async (itemId, data) => {
   
    try{
        await Trip.findByIdAndUpdate(itemId, data, {runValidators: true})

    }catch(error){
       
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateApplied = async (itemId, userId) => {
    try{

        console.log(itemId, userId)
          await Trip.findByIdAndUpdate(itemId, {$push: {applied: userId}}).lean();

    }catch(error){
        throw new Error(error.message)
    }
} 


exports.searchItems =async (text) => {

    const allAdds = await Trip.find().populate('author').lean();

    const allAuthors = allAdds.map(el => el = {email: el.author.email, headline: el.headline, name: el.name} );

    const result = allAuthors.filter(el => el.email.includes(text));
  
    return result

}
    

// const expressions = [];
      
// if(text) {
//     expressions.push({'author': {$regex: `${text}`, $options: 'i'}});
// }

// return Ad.find({$and: expressions}).lean();