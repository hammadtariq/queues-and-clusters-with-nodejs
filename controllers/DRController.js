'use strict';

var DRModel = require('../models/DRModel.js');
/**
 * DRController.js
 *
 * @description :: Server-side logic for managing DRs.
 */

module.exports = {

    /**
     * DRController.search()
     */
    search: function (req, res) {
        var term = req.params.term
        
        DRModel.find({ provider : term },function (err, DRs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching on DRs db.',
                    error: err
                });
            }
            var counter = DRs.length;
            
            return res.json({ status:true, termSearched:term, db:'dr', count:counter,
                              message:'The term '+term+' exists in '+counter+' fields of DRs db.'});
        })

        // DRModel.find({ provider : term }).count().exec()
        //     .then(function (existence) {
        //             if (existence) {
        //                 res.status(200)
        //                     .json({ status:true, count:existence,
        //                      message:'Term exists in '+existence+' fields of DR.'});
        //             }   
        //     })
        //     .catch(handleError(res));
    },

    /**
     * DRController.list()
     */
    list: function (req, res) {

        DRModel.find().exec()
                .then(respondWithResult(res))
                .catch(handleError(res));

    },

    /**
     * DRController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        DRModel.findOne({_id: id}, function (err, DR) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting DR.',
                    error: err
                });
            }
            if (!DR) {
                return res.status(404).json({
                    message: 'No such DR'
                });
            }
            return res.json(DR);
        });

    },

    /**
     * DRController.create()
     */
    create: function (req, res) {
        var data = req.body;
        var DR = new DRModel({
            name: data.name,
            provider: data.provider,
            created_at: new Date(),
        });

        DR.save(function (err, DR) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating DR',
                    error: err
                });
            }
            return res.status(201).json(DR);
        });
        
    },

    /**
     * DRController.update()
     */
    update: function (req, res) {
        var oldprovider = req.params.oldprovider;
        var newprovider = req.params.newprovider;

        DRModel.update(
            { provider : oldprovider },{
                $set: {
                provider: newprovider,
                }
            },{
                multi: true,
            }
            ).exec()
                .then(function (response) {
                    if (response) {
                        res.status(200)
                        .json({ status:true, db:"dr", count:response.n,
                             message: ''+response.n+' fields of DR updated.'});
                    }   
            })
                .catch(handleError(res));

    },

    /**
     * DRController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        DRModel.findByIdAndRemove(id).exec()
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
};

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
  
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(500).json({
        message: 'Error when getting DR.',
        db:'dr',
        status:false,
        error: err
    });
  };
}
