const router=require('express').Router()
const roleController=require('../Controller/roleController')

router.route('/').get(roleController.showAllRole)
router.route('/').post(roleController.addRole)
router.route('/:id').get(roleController.findRoleById)
router.route('/:id').patch(roleController.updateRole)
router.route('/:id').delete(roleController.deleteRole)

module.exports=router