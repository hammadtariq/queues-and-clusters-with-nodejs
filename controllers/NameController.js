var NameModel = require('../models/NameModel.js');

/**
 * NameController.js
 *
 * @description :: Server-side logic for managing Names.
 */
module.exports = {

    /**
     * NameController.search()
     */
    search: function (req, res) {
        var term = req.params.term
        
        NameModel.find({ name : term },function (err, DRs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching on Names db.',
                    error: err
                });
            }
            var counter = NameModel.length;
            
            return res.json({ status:true, db:"names", termSearched:term, count:counter,
                              message:'The term '+term+' exists in '+counter+' fields of Names db.'});
        })

    },

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

        var data = req.body;
        var Name = new NameModel({
            name: data.name,
            recordname: data.recordname,
            created_at: new Date(),
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
        var oldname = req.params.oldname;
        var newname = req.params.newname;

        NameModel.update(
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
                        .json({ status:true, db:"names", count:response.n,
                             message: ''+response.n+' fields of Name db updated.'});
                    }
            })
                .catch(function (err) {
                    res.status(500).json({
                        message: 'Error on updating fields in Name db.',
                        db:'name',
                        status:false,
                        error: err
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
