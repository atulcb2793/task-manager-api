const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const avatar = multer({
  limits:{
    fileSize: 1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('file format not supported'))
    }
    cb(undefined,true)
  }
})

router.post('/user', async(req,res)=>{
    const user = new User(req.body);
    try{
      await user.save()
      const token = await user.generateToken()
      res.status(201).send({user,token})
    }catch(e){
      res.status(400).send({error:e})
    }
})



router.get('/user/me',auth, async(req,res)=>{
  res.status(200).send(req.user)
})

router.post('/users/me/avatar', auth,avatar.single('avatar'),async(req,res)=>{
  console.log('here')
  try{

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
  }catch(e){
    res.status(500).send()
  }
})

router.get('/users/:id/avatar', async(req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    if(!user || !user.avatar){
      throw new Error()
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
  }catch(e){
    res.send('error')
  }
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.patch('/users/me',auth,async(req,res)=>{

  const updatesParam = ['age','name','password']
  const updates = Object.keys(req.body)
  const isValid = updates.every((update) => updatesParam.includes(update))                  
  
  if(!isValid){
    return res.status(404).send('invalid update')
  }
  try{
    const user = req.user
    updates.forEach((update)=> user[update] = req.body[update] )
    await user.save()
    if(!user){
      return res.status(404).send('not found')
    }
    res.status(200).send(user)
  }catch(e){
    res.status(400).send({error:e})
  }
})


router.post('/user/login', async(req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateToken()
    res.send({user,token})
  }catch(e){
    res.status(400).send()
  }
})

router.post('/user/logout',auth, async(req,res)=>{
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  }catch(e){
    res.status(400).send()
  }
})


router.delete('/users/me',auth,async(req,res)=>{
 
  try{
    await req.user.remove()
    res.send(req.user)
  }catch(e){
    res.status(400).send({error:e})
  }
})

module.exports = router