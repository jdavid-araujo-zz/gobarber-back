const { Router } = require('express');

const userController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const authMiddleware = require('../middlewares/auth');

const routes = new Router();

routes.post('/users', userController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', userController.update);

module.exports = routes;
