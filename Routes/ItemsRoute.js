const express=require('express')
const router=express.Router()
const app=express()
const {createItem, getAllItems, getOneitem, UpdatebyId, findByName, DeleteByid, aggregation} =require('../Controller/ItemControler.js')
router.post('/items', createItem);
router.get('/get',getAllItems)
router.get('/find/:id',getOneitem)
router.post('/findupdate/:id',UpdatebyId)
router.get('/findbyname/:name',findByName)
router.get('/delete/:id',DeleteByid)
router.get('/aggregation',aggregation)





module.exports = router;