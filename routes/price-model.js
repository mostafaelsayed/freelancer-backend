const express = require('express');
const router = express.Router();
let priceModel = require('../models/price-model');

module.exports = function() {

    router.get('/getPriceModels', function(req, res) {
        priceModel.getPriceModels(function(err, result) {
            if (!err) {
                console.log('success getPriceModels in router');
                
                res.json({
                    priceModels: result
                });
            }
            else {
                console.log('error get getPriceModels in router : ', util.inspect(err, utilOptions));

                res.json({
                    message: 'error get price models'
                });
            }
        })
    });

    router.post('/addPriceModel', function(req, res) {
        priceModel.addPriceModel(req.body, function(err, result) {
            if (err) {
                console.log('error add price model in router');
                res.json({
                    message: 'error add price model'
                });
            }
            else {
                console.log('success add price model in router');
                
                res.json({
                    message: 'success add price model',
                    id: result.id
                });
            }
        });
    });

    router.get('/getPriceModelyById/:id', function(req, res) {
        priceModel.getPriceModelyById(req.params.id, function(err, result) {
            if (err) {
                console.log('error getPriceModelyById in router');
                res.json({
                    message: 'error get price model'
                });
            }
            else {
                console.log('success getPriceModelyById in router');
                
                res.json(result);
            }
        });
    });

    router.put('/editPriceModel', function(req, res) {
        priceModel.editPriceModel(req.body, function(err, result) {
            if (err) {
                console.log('error editPriceModel in router');
                res.json({
                    message: 'error update price model'
                });
            }
            else {
                console.log('success editPriceModel in router');
                
                res.json({
                    message: 'success update price model'
                });
            }
        });
    });

    router.delete('/deletePriceModel/:id', function(req, res) {
        priceModel.deletePriceModel(req.params.id, function(err, result) {
            if (err) {
                console.log('error deletePriceModel in router');
                res.json({
                    message: 'error delete price model'
                });
            }
            else {
                console.log('success deletePriceModel in router');
                
                res.json({
                    message: 'success delete price model'
                });
            }
        });
    });

    return router;

}