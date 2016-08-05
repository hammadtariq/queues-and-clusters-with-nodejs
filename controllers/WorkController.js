var WorkModel = require('../models/WorkModel.js');

/**
 * WorkController.js
 *
 * @description :: Server-side logic for managing Works.
 */
module.exports = {

    /**
     * WorkController.search()
     */
    search: function (req, res) {
        var term = req.params.term
        
        WorkModel.find({ name : term },function (err, DRs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching on Works db.',
                    error: err
                });
            }
            var counter = WorkModel.length;
            
            return res.json({ status:true, db:"works", termSearched:term, count:counter,
                              message:'The term '+term+' exists in '+counter+' fields of Works db.'});
        })

    },

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
        var data = req.body;
        var Work = new WorkModel({
            name: data.name,
            workname: data.workname,
            created_at: new Date(),
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
        var oldname = req.params.oldname;
        var newname = req.params.newname;

        WorkModel.update(
            { name : oldname },{
                $set: {
                name: newname,
                }
            },{
                multi: true,
            }
            ).exec()
                .then(function (response) {
                    if (response) {
                        res.status(200)
                        .json({ status:true, count:response.n,
                             message: ''+response.n+' fields of Works db updated.'});
                    }   
            })
                .catch(function (err) {
                    res.status(500).json({
                        message: 'Error on updating fields in Work db.',
                        db:'works',
                        status:false,
                        error: err
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
