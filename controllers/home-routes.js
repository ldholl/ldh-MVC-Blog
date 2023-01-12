const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');


//login and sign up
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

//display recent posts
router.get('/', (req, res) => {
    console.log(req.session)
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}))
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//go to single post
router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                order: [['created_at', 'DESC']],
                include: {
                    model: User,
                    attributes: ['username', 'id']
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        const post = dbPostData.get({ plain: true })
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//login and sign up
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;