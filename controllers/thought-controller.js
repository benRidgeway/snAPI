const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            //do not return version data
            .select('-__v')
            //sort in descending order, returning most recent thoughts first
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //get thought by ID
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then(thoughtData => {
                //if no pizza is found,  send 404
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //create new thought
    createThought({ body }, res) {
        //expects "thoughtText": "text", "username": "user", "userId": "id"
        Thought.create(body)
            //then take the _id of the newly created thought and push it
            //to the user's thoughts array
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No User found with that ID' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //update thought by ID
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            //expects "thoughtText": "text", "username": "user", "userId": "id"
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with that ID' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete thought by ID
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.thoughtId)
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with that ID' });
                    return;
                }
                res.json({ message: `Thought Deleted!` });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //create reaction
    createReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with that ID' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete reaction by ID
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with that ID' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}

module.exports = thoughtController;