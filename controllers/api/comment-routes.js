const router = require('express').Router();
const {Comment, Post, User } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    if(req.session){
    Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  }
  });


  router.put('/:id', (req, res)=> {
    Comment.update(
      {
        content: req.body.content
      },
      {
         where: {
            id: req.params.id
      }
    }
    )
    .then(dbCommentData => {
      if(!dbCommentData){
        res.status(404).json({ message: 'No comment with this id'})
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })

  module.exports = router;