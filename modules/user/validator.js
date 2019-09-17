const Joi = require('joi');

const constants = require('../constants/constants');
const commonServices = require('../commonServices/service');
const responses = require('../responses/responses');

const apiReferenceModule = 'user';


const login = (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    if (commonServices.validateFields(req.body, res, schema)) {
        req.body.apiReference = {
            module: apiReferenceModule,
            api: "login"
        };
        next();
    } else {
        responses.parameterMissingResponse(res);
    }
};


const getProjects = (req, res, next) => {
    const schema = Joi.object().keys({
        limit: Joi.number().required().min(1).max(20),
        offset: Joi.number().required().min(0),
        order_by: Joi.number().optional().valid([1,2,3,4,5,6])
    });
    if (commonServices.validateFields(req.query, res, schema)) {
        req.query.apiReference = {
            module: apiReferenceModule,
            api: "getContacts"
        };
        next();
    } else {
        responses.parameterMissingResponse(res);
    }
};


module.exports.login = login;
module.exports.getProjects = getProjects;