const permission=require('../Models/permissionSchema')

exports.showAllPermission=async(req,res)=>{
    try {
        
    const allPermissions=await permission.find()
    res.send(allPermissions)

    } catch (error) {
        res.status(400).json({
            message: "Failed to update post from DB",
            error:error.message
          });
        
    }
}

exports.addPermission=async(req,res)=>{
    try {
        const addPermissions=await permission.create(req.body)
    console.log(addPermissions)
    res.send(addPermissions)
    } catch (error) {      
        res.status(400).json({
            message: "Failed to update post from DB",
            error:error.message
          });
    }
}

exports.showPermissionById=async(req,res)=>{
    try {
        const byIdPermissions=await permission.findById(req.params.id)
        res.send(byIdPermissions)
        } catch (error) {      
        res.status(400).json({
            message: "Failed to update post from DB",
            error:error.message
          });
    }
}

exports.deletePermission=async(req,res)=>{
    try{
        const byIdPermissions=await permission.findByIdAndUpdate(req.params.id,{isActive:2})
        
        res.send(byIdPermissions)
    }catch (error) {
        res.status(400).json({
            message:'something went wrong',
            error:error.message
        })
    }
}

exports.updatePermission=async(req,res)=>{
    try {
        const updatePermission= await permission.findByIdAndUpdate(req.params.id,req.body)
        res.send(updatePermission)
    } catch (error) {
        res.status(400).json({
            err:error.message
        })
    }
}