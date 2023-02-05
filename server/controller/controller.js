var Userdb = require('../model/model');
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }
    const user=new Userdb({
        assessment:req.body.assessment,
        date:req.body.date,
        description:req.body.description,
        mark:req.body.mark,
        grade:req.body.grade
    })

    user
    .save(user)
    .then(data=>{
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while create operation"
        });
    });
}
exports.find = (req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id"+id})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving field with id="+id})
        })
    }
    else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured while retrieving information"
            });
        });
    }
}
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Field to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update field with ${id}. Maybe field not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update field information"})
        })
}
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Field was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Field with id=" + id
            });
        });
}