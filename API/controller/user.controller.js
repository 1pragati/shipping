import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import url from 'url';
export var save=async(req,res,next)=>{
	var userDetails=req.body;
	var userList = await UserSchemaModel.find();
	var l=userList.length;
	var _id=l==0?1:userList[l-1]._id+1;
     userDetails={...userDetails,"_id":_id,"role":"user","status":0,"info":Date()};
      try
      {
      	var user=await UserSchemaModel.create(userDetails);
      	res.status(201).json({message:"save successfully",userDetails});
      }
	  catch(err)
	  {
	  	//console.log(err);
	  	res.status(500).json({"status":false});
	  }
};

export var login=async (req,res,next)=>{
	var userDetails=req.body;
	userDetails={...userDetails};
	
	var userList=await UserSchemaModel.find(userDetails);
	var l=userList.length;

	if(l!=0)
	{   
		let payload={"subject":userList[0].email}
		let key=rs.generate();
		let token=jwt.sign(payload,key);
		return res.status(200).json({"token":token,"userDetails":userList[0]});
	}
	else
		return res.status(500).json({"token":"error"});
	
};


export var fetch= async(req,res,next)=>{
	var condition_object=url.parse(req.url,true).query;
    var userList=await UserSchemaModel.find(condition_object);
    var l=userList.length;
     if(l!=0)
	    return res.status(201).json(userList);
     else
	     return res.status(500).json({"result":"server error"});
};

export var deleteUser= async(req,res,next)=>{
     var condition_object=req.body;
     var user=await UserSchemaModel.find(condition_object);
     if(user.length!=0){
     	let result=await UserSchemaModel.deleteMany(condition_object);
     	if(result)
     		return res.status(201).json({"msg":"success"});
     	  else 
     	  	return res.status(500).json({error:"server error"});
     }
     else
     	return res.status(404).json({error:"server resource not found"});
};

export var updateUser= async(req,res,next)=>{
  let userDetails=await UserSchemaModel.findOne(req.body.condition_obj);
   if(userDetails){
   	let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj});
   	  if(user)
   	  	 return res.status(201).json({"msg":"success"});
   	  	else
   	  		return res.status(500).json({error:"Server error"});
   }
  else
  	return res.status(404).json({error:"Requested resource not available"});
};

