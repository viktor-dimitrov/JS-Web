const Post = require('../models/post');
const User = require('../models/user');


exports.getAll = async () => await Post.find().lean();

exports.getOne = async (itemId) => {
try{
     return await Post.findById(itemId).populate('author').populate('votes').lean();
}catch(error){
    throw new Error(error.message)
}
}   

exports.createItem = async (data) => {
    try{
        const item = await Post.create(data);
        await User.findByIdAndUpdate(data.author, {$push: {myPosts: item._id}})
        
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.delItem = async (itemId) => await Post.findByIdAndDelete(itemId);

exports.editItem = async (itemId, data) => {
   
    try{
        await Post.findByIdAndUpdate(itemId, data, {runValidators: true})

    }catch(error){

        console.log(error.message)
       
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateVote = async (itemId, userId, rating) => {
    try{
      
         await Post.findByIdAndUpdate(itemId, {$push: {votes: userId }, rating: rating})

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
    

