const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

//GET all users and POST a user at /api/users/
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//GET, PUT, and DELETE user by ID at /api/users/:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// PUT and DELETE friend at /api/users/user:Id/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend);

module.exports = router;