const Promise = require('bluebird');

const mysqlLib = require('../database/mysqlLib');
const logging = require('../logging/loggingService');
const constants = require('../constants/constants');


const getProjects = (apiReference, payload) => {
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            let sql = "SELECT `ip`.`date_added`, `ip`.`project_title`, `iu`.`username`, `ic`.`category_name`  FROM `ilance_users` `iu` " +
                "LEFT JOIN `ilance_projects` `ip` ON `iu`.`user_id` = `ip`.`user_id` " +
                "LEFT JOIN `ilance_categories` `ic` ON `ip`.`cid` = `ic`.`cid` ";
            if (payload.order_by) {
                if (payload.order_by == 1) {
                    sql += "ORDER BY `ip`.`project_title` DESC ";
                } else if (payload.order_by == 2) {
                    sql += "ORDER BY `ip`.`project_title` ASC ";
                } else if (payload.order_by == 3) {
                    sql += "ORDER BY `iu`.`username` DESC ";
                } else if (payload.order_by == 4) {
                    sql += "ORDER BY `iu`.`username` ASC ";
                } else if (payload.order_by == 5) {
                    sql += "ORDER BY `ic`.`category_name` DESC ";
                } else if (payload.order_by == 6) {
                    sql += "ORDER BY `ic`.`category_name` ASC ";
                } else {
                    sql += "ORDER BY `ip`.`date_added` DESC ";
                }
            } else {
                sql += "ORDER BY `ip`.`date_added` DESC ";
            }
            sql += "LIMIT ? OFFSET ? ";
            let values = [Number(payload.limit), Number(payload.offset)];
            let data = yield mysqlLib.mysqlQueryPromise(apiReference, "getProjects", sql, values);
            return data;
        })().then((data) => {
            resolve(data);
        }, (error) => {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        });
    });
};


const getUser = (apiReference, payload) => {
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            let sql = "SELECT `iu`.*  FROM `ilance_users` `iu` WHERE `iu`.`username` = ? LIMIT 1";
            let values = [payload.username];
            let data = yield mysqlLib.mysqlQueryPromise(apiReference, "getUser", sql, values);
            return data;
        })().then((data) => {
            resolve(data);
        }, (error) => {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        });
    });
};





module.exports.getProjects = getProjects;
module.exports.getUser = getUser;