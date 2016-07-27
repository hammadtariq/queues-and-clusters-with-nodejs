var NameModel = require('../models/NameModel.js');

/**
 * NameController.js
 *
 * @description :: Server-side logic for managing Names.
 */
module.exports = {

    /**
     * NameController.list()
     */
    list: function (req, res) {
        NameModel.find(function (err, Names) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Name.',
                    error: err
                });
            }
            return res.json(Names);
        });
    },

    /**
     * NameController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        NameModel.findOne({_id: id}, function (err, Name) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Name.',
                    error: err
                });
            }
            if (!Name) {
                return res.status(404).json({
                    message: 'No such Name'
                });
            }
            return res.json(Name);
        });
    },

    /**
     * NameController.create()
     */
    create: function (req, res) {
        var Name = new NameModel({
        });

        Name.save(function (err, Name) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Name',
                    error: err
                });
            }
            return res.status(201).json(Name);
        });
    },

    /**
     * NameController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        NameModel.findOne({_id: id}, function (err, Name) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Name',
                    error: err
                });
            }
            if (!Name) {
                return res.status(404).json({
                    message: 'No such Name'
                });
            }

            
            Name.save(function (err, Name) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Name.',
                        error: err
                    });
                }

                return res.json(Name);
            });
        });
    },

    /**
     * NameController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        NameModel.findByIdAndRemove(id, function (err, Name) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Name.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
