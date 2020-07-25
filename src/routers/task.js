const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/Task')


router.get('/tasks/:id',auth,async(req,res)=>{
 
    try{
      //const task = await Task.findById({_id: req.params.id})
      const task = await Task.findOne({_id:req.params.id, owner: req.user._id})

      if(!task){
        return res.status(404).send()
      }
      res.status(200).send(task)
    }catch(e){
      res.status(400).send({error:e})
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
  try{
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if(!task){
      return res.status(400).send();
    }
    res.status(200).send(task)
  }catch(e){
    res.status(400).send(error)
  }
})

router.patch('/tasks/:id',auth,async(req,res)=>{

  const updatesParam = ['completed','description']
  const updates = Object.keys(req.body)
  const isValid = updates.every((update) => updatesParam.includes(update))                  
  
  if(!isValid){
    return res.status(404).send('invalid update')
  }
  try{

    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
   
    if(!task){
      return res.status(404).send()
    }
    updates.forEach((update) => task[update] = req.body[update])
    await task.save();
    res.status(200).send(task)
  }catch(e){
    res.status(400).send(error)
  }
})

// with query params
router.get('/tasks',auth,async(req,res)=>{
let flag;
  
     try{
      if(req.query.completed){ 
        flag = req.query.completed === 'true'  
        const task = await Task.find({owner:req.user._id,completed:flag})
       return res.status(200).send(task)
      }
      const task = await Task.find({owner:req.user._id})
      res.status(200).send(task)
    }catch(e){
      res.status(400).send()
    }
})

router.post('/task',auth,async(req,res)=>{
    const myTask = new Task({
      ...req.body,
      owner: req.user._id
    })
    try{
        await myTask.save()
        res.status(201).send(myTask)
      }catch(error){
        res.status(400).send({error:error})
      }
    
})

module.exports = router