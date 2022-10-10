const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/ GET all thoughts, POST a thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id GET thought by ID, POST a reaction to a thought, Update thought by ID, Delete thought by ID
router
    .route('/:thoughtId')
    .get(getThoughtByID)
    .post(createReaction)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:id/:reactionId
router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction);

module.exports = router;