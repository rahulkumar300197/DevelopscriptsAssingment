const express = require('express');
const multipart = require('connect-multiparty');
const router = express.Router();
const multipartMiddleware = multipart();

const validator = require('./validator');
const routeHandler = require('./routeHandler');



router.post('/login', validator.login, routeHandler.login);
router.get('/get_projects', validator.getProjects, routeHandler.getProjects);
router.get('/pages/get_projects', routeHandler.getProjectPage);

module.exports = router;