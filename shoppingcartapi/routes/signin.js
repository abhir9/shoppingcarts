/**
 * Created by abhi .
 */
"use strict";
const express = require('express'),
    router = express.Router(),
    config = require('../config.json'),
    jwt = require('jsonwebtoken'),
    validator = require('../utility/validator'),
    userServices = require('../services/user.services'),
    responseHandler = require('../utility/responseHandler');
module.exports = function(router)   {
    router.route('/').get(function (req, res) {
    });

    router.route('/').post(function (req, res) {
            schemaValidator(req,res).then(function (fullfilled,rejected) {
                if(fullfilled)
                    userServices.authenticateUser(req,res);
            });
    });
    function schemaValidator(req, res) {
        return new Promise (function(fullfil , reject) {
            var validationResult = validator.validateData('USER_LOGIN_SCHEMA', req.body);
            if (validationResult.isError) {
                reject({
                    status: 401,
                    message: validationResult.errorMessages
                })
            } else {
                fullfil(true);
            }
        }).then(function (response) {
            return response;
        }).catch(function (errResonse) {
            res.status(401).send(responseHandler.setErrorResponse(errResonse));
        });

} };
