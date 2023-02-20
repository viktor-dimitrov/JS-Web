const Post = require('../models/post');
const User = require('../models/user');


exports.getAll = async () => await Post.find().populate('author').lean();

exports.getOne = async (itemId) => {
try{
     return await Post.findById(itemId).populate('author').populate('comments').lean();
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

        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateComments = async (itemId, userId, comment, username) => {
    try{
      
         await Post.findByIdAndUpdate(itemId, {$push: {comments: {userId: userId, comment: comment, username: username} }})

    }catch(error){
        throw new Error(error.message)
    } 
} 



    

