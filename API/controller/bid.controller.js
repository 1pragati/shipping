import '../models/connection.js';
import BidSchemaModel from '../models/bid.model.js'; 
import url from 'url';

export var save=async (req,res,next)=>{
    var bidDetails=req.body
    var bidList = await BidSchemaModel.find();
    var l=bidList.length;
    var _id=l==0?1:bidList[l-1]._id+1;
    bidDetails={...bidDetails,"_id":_id,"info":Date()};
    try
    {
     var bid=await BidSchemaModel.create(bidDetails);
     res.status(201).json({"status":true});
    }
    catch(err)
    {
     //console.log(err);
     res.status(500).json({"status": false});
    }
};

export var login=async (req,res,next)=>{
    var userDetails=req.body;
    userDetails={...userDetails,"status":1};
    var userList = await BidSchemaModel.find(userDetails);
    var l=userList.length;
    if(l!=0)
    {
      let payload={"subject":userList[0].email};
      let key=rs.generate();
      let token=jwt.sign(payload,key);
      return res.status(201).json({"token":token,"userDetails":userList[0]});
    }
    else
      return res.status(500).json({"token": "error"});
};

export var fetch=async (req,res,next)=>{
  var condition_object=url.parse(req.url,true).query;
  var bidList = await BidSchemaModel.find(condition_object);
  var l=bidList.length;
  if(l!=0)
    return res.status(201).json(bidList);
  else
    return res.status(500).json({"result": "Server Error"});
}

export var deleteUser=async(req,res,next)=>{
  var condition_object=req.body;
  var user = await UserSchemaModel.find(condition_object);
  if(user.length!=0){
    let result = await UserSchemaModel.deleteMany(condition_object); 
    if(result)
     return res.status(201).json({"msg":"success"});
    else
     return res.status(500).json({error: "Server Error"});
  }
  else
    return res.status(404).json({error: "Resource not found"}); 
}

export var updateUser=async(req,res,next)=>{
  let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
  if(userDetails){
     let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
     if(user)
      return res.status(201).json({"msg":"success"});
     else
      return res.status(500).json({error: "Server Error"});
  }
  else
   return res.status(404).json({error: "Requested resource not available"});
}