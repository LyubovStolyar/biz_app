const { Service } = require('../models/services');
const path = require('path');
const fs = require('fs');

module.exports = {
    getService: async function (req, res, next) {
        try {
            const result = await Service.find()
           
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error getting service');
        }
    },

    deleteService: async function (req, res, next) {
        try {
            await Service.deleteOne({ _id: req.body._id }).exec();
            res.json({ _id: req.body._id });
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error delete service');
        }
    },

    addService: async function (req, res, next) {
        try {
            const newService = new Service(req.body); // todo: add validation
            const result = await newService.save();
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error adding service');
        }
    },
    
}