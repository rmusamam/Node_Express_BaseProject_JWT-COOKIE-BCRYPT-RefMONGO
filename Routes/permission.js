const router=require('express').Router()
const permissionController=require('../Controller/permissionController')


router.route('/').post(permissionController.addPermission)
router.route('/').get(permissionController.showAllPermission)
router.route('/:id').get(permissionController.showPermissionById)
router.route('/:id').delete(permissionController.deletePermission)
router.route('/:id').patch(permissionController.updatePermission)


module.exports=router