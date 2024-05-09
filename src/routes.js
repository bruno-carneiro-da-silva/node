const UserController = require('./controllers/UserController');
module.exports = [
        {
            path: '/users',
            method: 'GET',
            handler: UserController.listAllUsers,
        },
        {
            path: '/users/:id',
            method: 'GET',
            handler: UserController.getUserById,
        },
        {
            path: '/users',
            method: 'POST',
            handler: UserController.createUser,
        },
        {
            path: '/users/:id',
            method: 'PUT',
            handler: UserController.updateUser,
        },
        {
            path: '/users/:id',
            method: 'DELETE',
            handler: UserController.deleteUser,
        },
        
]
