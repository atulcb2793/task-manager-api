

/** using npm library */
/*
const mongodb = require('mongodb')
const {MongoClient, ObjectId} =require('mongodb')
const url ='mongodb://127.0.0.1:27017'
const dbName='task-manager'

MongoClient.connect(url,{useNewUrlParser: true}, (error, client) =>{
    if(error){ return console.log('not connected')}

  const db = client.db(dbName)

  db.collection('users').insertOne({
      name: 'Yashas',
      age: 27
  })

  db.collection('users').findOne({name:"Atul"}, (err,data)=>{
    if(err){ return console.log('err')}
    console.log('data present-- ',data)
  })


  db.collection('users').find({name:"Atul"}).count((err,data)=>{
    if(err){ return console.log('err')}
    console.log('data present-- ',data)
})

 db.collection('users').updateOne({
    _id: new ObjectId("5f08b71998441211a8998178")
  },{
    $set:{
      name:'test'
       }
   }).then((res)=>{
     console.log('updated')
   }).catch((err)=>{
     console.log('%%%%%%%% error')
   }) 
})

*/







