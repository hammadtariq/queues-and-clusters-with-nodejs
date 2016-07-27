var WorkModel = require('../models/WorkModel.js');

/**
 * WorkController.js
 *
 * @description :: Server-side logic for managing Works.
 */
module.exports = {

    /**
     * WorkController.list()
     */
    list: function (req, res) {
        WorkModel.find(function (err, Works) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Work.',
                    error: err
                });
            }
            return res.json(Works);
        });
    },

    /**
     * WorkController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        WorkModel.findOne({_id: id}, function (err, Work) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Work.',
                    error: err
                });
            }
            if (!Work) {
                return res.status(404).json({
                    message: 'No such Work'
                });
            }
            return res.json(Work);
        });
    },

    /**
     * WorkController.create()
     */
    create: function (req, res) {
        var Work = new WorkModel({
        });

        Work.save(function (err, Work) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Work',
                    error: err
                });
            }
            return res.status(201).json(Work);
        });
    },

    /**
     * WorkController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        WorkModel.findOne({_id: id}, function (err, Work) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Work',
                    error: err
                });
            }
            if (!Work) {
                return res.status(404).json({
                    message: 'No such Work'
                });
            }

            
            Work.save(function (err, Work) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Work.',
                        error: err
                    });
                }

                return res.json(Work);
            });
        });
    },

    /**
     * WorkController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        WorkModel.findByIdAndRemove(id, function (err, Work) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Work.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
