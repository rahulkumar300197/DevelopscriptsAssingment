const path = require('path');


const commonServices = require('../commonServices/service');
const responses = require('../responses/responses');
const user = require('./controller');


const login = (req, res) => {
    user.login(req.body).then((data) => {
        responses.actionCompleteResponse(res, data);
    }, (error) => {
        responses.sendCustomResponse(res, error);
    });
}

const getProjects = (req, res) => {
    user.getProjects(req.query).then((data) => {
        responses.actionCompleteResponse(res, data);
    }, (error) => {
        responses.sendCustomResponse(res, error);
    });
}

const getProjectPage = (req, res) => {
    return res.sendFile(path.resolve(__dirname + '/../../public/html/list.html'));
}


module.exports.login = login;
module.exports.getProjects = getProjects;
module.exports.getProjectPage = getProjectPage;