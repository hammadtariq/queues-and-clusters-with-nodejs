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
        
        DRModel.find({ provider : term }).count().exec()
            .then(function (existence) {
                    if (existence) {
                        res.status(200)
                        .json({ status:true, count:existence,
                             message:'Term exists in '+existence+' fields of DR.'});
                    }   
            })
            .catch(handleError(res));
    },

    /**
     * DRController.list()
     */
    list: function (req, res) {

        // DRModel.find(function (err, DRs) {
        //     if (err) {
        //         return res.status(500).json({
        //             message: 'Error when getting DR.',
        //             error: err
        //         });
        //     }
        //     return res.json(DRs);
        // });

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

        // DRModel.findOne({_id: id}.exec()
        //             .then(respondWithResult(res))
        //             .catch(handleError(res));
    },

    /**
     * DRController.create()
     */
    create: function (req, res) {
        var data = req.body;
        console.log("in DR controller create func: ",data);
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
        // DR.save()
        //     .then(respondWithResult(res))
        //     .catch(handleError(res));
        
    },

    /**
     * DRController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        DRModel.findOne({_id: id}, function (err, DR) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting DR',
                    error: err
                });
            }
            if (!DR) {
                return res.status(404).json({
                    message: 'No such DR'
                });
            }

            
            DR.save(function (err, DR) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating DR.',
                        error: err
                    });
                }

                return res.json(DR);
            });
        });
    },

    /**
     * DRController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        // DRModel.findByIdAndRemove(id, function (err, DR) {
        //     if (err) {
        //         return res.status(500).json({
        //             message: 'Error when deleting the DR.',
        //             error: err
        //         });
        //     }
        //     return res.status(204).json();
        // });

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
        error: err
    });
  };
}
