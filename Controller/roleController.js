const role= require('../Models/roleSchema')

exports.showAllRole=async(req,res)=>{
    try {
    const show= await role.find()
        res.send(show)
    } catch (error) {
        res.status(400).json({
            message:"something went wrong",
            error:error.message
        })
    }
}
exports.addRole=async(req,res)=>{
    try {
    const add= await role.create(req.body)
        console.log(add,"new role")
        res.send(add)
    } catch (error) {
        res.status(400).json({
            message:"something went wrong",
            error:error.message
        })
    }
}

exports.findRoleById=async(req,res)=>{
    try {
    const showById= await role.findById(req.params.id)
        res.send(showById)
    } catch (error) {
        res.status(400).json({
            message:"something went wrong",
            error:error.message
        })
    }
}


exports.updateRole=async(req,res)=>{
    try {
    const updateRole= await role.findByIdAndUpdate(req.params.id,req.body)
        res.send(updateRole)
    } catch (error) {
        res.status(400).json({
            message:"something went wrong",
            error:error.message
        })
    }
}


exports.deleteRole=async(req,res)=>{
    try {
    const deleteRole= await role.findByIdAndUpdate(req.params.id,{isActive:2})
        res.send(deleteRole)
    } catch (error) {
        res.status(400).json({
            message:"something went wrong",
            error:error.message
        })
    }
}