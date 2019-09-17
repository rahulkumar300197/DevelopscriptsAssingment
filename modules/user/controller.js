const Promise = require('bluebird');
const _ = require('underscore');
const md5 = require('md5');

const service = require('./service');
const constants = require('./../constants/constants');



const login = (payload) => {
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            let userData = yield service.getUser(payload.apiReference, payload);
            if (_.isEmpty(userData)) {
                throw {
                    "message": constants.responseMessages.USER_NOT_FOUND,
                    "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
                    "data": {}
                };
            }
            let inputPassword = md5(md5(payload.password) + userData[0].salt);
            if (inputPassword == userData[0].password) {
                return {
                    user_id: userData[0].user_id,
                    username: userData[0].username,
                    account_number: userData[0].account_number,
                    available_balance: userData[0].available_balance
                };
            } else {
                throw {
                    "message": constants.responseMessages.INVALID_PASSWORD,
                    "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
                    "data": {}
                };
            }

        })().then((data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
};


const getProjects = (payload) => {
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            return yield service.getProjects(payload.apiReference, {
                limit: payload.limit,
                offset: payload.offset,
                order_by: payload.order_by
            });

        })().then((data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
};


module.exports.login = login;
module.exports.getProjects = getProjects;
