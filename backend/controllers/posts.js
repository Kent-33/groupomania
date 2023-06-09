const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject._userId;
    const postDate = Date.now();
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        // postDate: postDate,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    post.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete postObject._userId;
    Post.findOne({_id: req.params.id})
    .then((post) => {   
        if (post.userId != req.auth.userId) {        
            res.status(401).json({message: 'Non-autorisé'});
        } else {            
            if (req.file) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`./images/${filename}`, () => {});
            }
            Post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Objet modifié'}))
            .catch(error => res.status(401).json({error}));
        }
    })
    .catch(error => { res.status(400).json( { error })})
};

exports.deletePost = (req, res, next) => {
   Post.findOne({_id: req.params.id})
   .then(post => {
        if (post.userId != req.auth.userId) {
            res.status(401).json({message: 'Non-autorisé'});
        } else {
            const filename = post.imageUrl.split('/images/')[1];                                          
  
            fs.unlink(`./images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet Supprimé'})})
                .catch(error => res.status(401).json({error}));
            });
        }
   })
   .catch( error => res.status(500).json({error}) );
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(403).json({error}));
};

exports.getAllPost = (req, res, next) => {
    Post.find()
     .then(post => res.status(200).json(post))
     .catch(error => res.status(400).json({error}));
};

exports.likePost = (req, res, next) => {
    const newLike = req.body.like;
    const user = req.body.userId;
    Post.findOne({_id: req.params.id})
    .then(post => {
        const postUsersLiked = post.usersLiked;
        const postUsersDisliked = post.usersDisliked;
        const foundUserLiked = postUsersLiked.findIndex(u => u == user);
        const foundUserDisliked = postUsersDisliked.findIndex(u =>u == user);
        switch (newLike) {
            case -1 :
                if (foundUserDisliked !== -1) {
                    post.usersDisliked.splice(foundUserDisliked,1);
                    Post.updateOne({_id: req.params.id}, {dislikes: post.disllikes -=1, usersDsiliked: post.usersDisliked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                else if(foundUserLiked === 1){
                    post.usersLiked.splice(foundUserLiked,1);
                    post.usersDisliked.push(user);
                    Post.updateOne({_id: req.params.id}, {likes: post.likes -=1, dislikes: post.dislikes +=1, usersLiked: post.usersLiked, usersDisliked: post.usersDisliked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                else if ((foundUserLiked === -1) || (foundUserDisliked === -1)) {
                    post.usersDisliked.push(user);
                    Post.updateOne({_id: req.params.id}, {dislikes: post.dislikes +=1, usersDisliked: post.usersDisliked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                break;
            case 0 :
                if(foundUserLiked !== -1){
                    post.usersLiked.splice(foundUserLiked,1);
                    Post.updateOne({_id: req.params.id}, {likes: post.likes -=1, usersLiked: post.usersLiked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                else if(foundUserDisliked !== -1){
                    post.usersDisliked.splice(foundUserDisliked,1);
                    Post.updateOne({_id: req.params.id}, {dislikes: post.dislikes -=1, usersDisliked: post.usersDisliked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));                                                                
                    console.log(post);                
                }
                break;
            case 1 :
                if (foundUserLiked !== -1) {
                    post.usersLiked.splice(foundUserLiked,1);
                    Post.updateOne({_id: req.params.id}, {likes: post.likes -=1, usersLiked: post.usersLiked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                else if(foundUserDisliked === 1){
                    post.usersDisliked.splice(foundUserDisliked,1);
                    post.usersLiked.push(user);
                    Post.updateOne({_id: req.params.id}, {likes: post.likes +=1, dislikes: post.dislikes -=1, usersLiked: post.usersLiked, usersDisliked: post.usersDisliked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                else if ((foundUserLiked === -1) || (foundUserDisliked == -1)) {
                    post.usersLiked.push(user);
                    Post.updateOne({_id: req.params.id}, {likes: post.likes +=1, usersLiked: post.usersLiked})
                    .then(() => { res.status(200).json({message: 'Objet Modifié'})})
                    .catch(error => res.status(401).json({error}));
                }
                break;
        }
    })    
    .catch(error => res.status(401).json({error}));
};