import '../models/connection.js';
import adminSchemaModel from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import url from 'url';

export var save=async(req,res,next)=>{
    
    var aDetails=req.body;

    var aList=await adminSchemaModel.find();
    var l=aList.length;
    var _id=l==0?1:aList[l-1]._id+1;
    aDetails={...aDetails,"_id":_id,"role":"admin","status":0,"info":Date()};
    try{
        var admin=await adminSchemaModel.create(aDetails);
        res.status(201).json({"status":true});
   }
   catch(err)
   { 
      console.log(err);
      res.status(500).json({error:"server error"});
   }

}

export var login=async(req,res,next)=>{
    var aDetails=req.body;
    aDetails={...aDetails,"status":1};
    var aList=await adminSchemaModel.find(aDetails);
    var l=aList.length;
    if(l!=0){
        let payload={"success":aList[0].email};
        let key=rs.generate();
        let token=jwt.sign(payload,key);
        return res.status(201).json({"token":token,"aDetails":aList[0]});
    }
    else
      return res.status(500).json({error:"server error"});

}


export var fetch=async(req,res,next)=>{
     var aDetails=url.parse(req.url,true).query;
     var aList=await adminSchemaModel.find(aDetails);
     var l=aList.length;
      if(l!=0)
      {
        return res.status(201).json(aList);
      }
      else{
        return res.status(500).json({error:"server error"});
      }
}

export var deleteUser=async(req,res,next)=>{
     var aDetails=req.body;
     var admin=await adminSchemaModel.find(aDetails);
     var l=admin.length;
     if(l!=0){
       let result=await adminSchemaModel.deleteMany(aDetails);
       if(result)
          return res.status(201).json({"msg":"success"});
        else
          return res.status(500).json({error:"server error"});
         }
    else
       return res.statud(400).json({error:"resource not found"});
}


export var updateUser=async(req,res,next)=>{
      var aDetails=await adminSchemaModel.findOne(JSON.parse(req.body.condition_obj));
      if(aDetails){
        let admin=await adminSchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});
        if(admin)
            return res.status(201).json({"msg":"success"});
            else
              return res.status(500).json({error:"server error"});
             
            }
        else
           return res.statud(400).json({error:"resource not found"});
    }
