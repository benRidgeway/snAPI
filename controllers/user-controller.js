const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            //do not return version data
            .select('-__v')
            //sort in descending order, returning most recent users first
            .sort({ _id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //get single user by ID and populate thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .select('-__v')
            //also return attached thoughts
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            //also return attached friends
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(userData => {
                //if no user found
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create new user
    createUser({ body }, res) {
        //expects "username": "user", "email": "user@user.com"
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            body,
            { new: true, runValidators: true }
        )
            .then(userData => {
                //if no user found
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete user by id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    //adds a friend to user
    addFriend({ params }, res) {
        //find user by Id, and push the friendId to their friends array
        User.findByIdAndUpdate(
            params.userId,
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //remove a friend from user's friends list
    removeFriend({ params }, res) {
        //find user by Id, and push the friendId to their friends array
        User.findByIdAndUpdate(
            params.userId,
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = userController;