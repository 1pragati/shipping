import '../models/connection.js';
import SubCategorySchemaModel from '../models/subcategory.model.js'; 
import url from 'url';
import path from 'path';
import rs from 'randomstring';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save=async (req,res,next)=>{
    var scDetails=req.body
    var subcaticon=req.files.caticon;
    var subcaticonnm=Date.now()+"_"+rs.generate()+"_"+subcaticon.name;
    scDetails.subcaticonnm=subcaticonnm;
    var uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/subcaticons",subcaticonnm);
    var scList = await SubCategorySchemaModel.find();
    var l=scList.length;
    var _id=l==0?1:scList[l-1]._id+1;
    scDetails={...scDetails,"_id":_id};
    try
    {
     var category=await SubCategorySchemaModel.create(scDetails);
     subcaticon.mv(uploadpath); 
     res.status(201).json({"status":true});
    }
    catch(err)
    {
     //console.log(err);
     res.status(500).json({"status": false});
    }
};

export var fetch=async (req,res,next)=>{
  var condition_object=url.parse(req.url,true).query;
  var scList = await SubCategorySchemaModel.find(condition_object);
  var l=scList.length;
  if(l!=0)
    return res.status(201).json(scList);
  else
    return res.status(500).json({"result": "Server Error"});
}

export var deleteCategory=async(req,res,next)=>{
  var condition_object=req.body;
  var category = await CategorySchemaModel.find(condition_object);
  if(category.length!=0){
    let result = await CategorySchemaModel.deleteMany(condition_object); 
    if(result)
     return res.status(201).json({"msg":"success"});
    else
     return res.status(500).json({error: "Server Error"});
  }
  else
    return res.status(404).json({error: "Resource not found"}); 
}

export var updateCategory=async(req,res,next)=>{
  let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
  if(cDetails){
     let category=await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});   
     if(category)
      return res.status(201).json({"msg":"success"});
     else
      return res.status(500).json({error: "Server Error"});
  }
  else
   return res.status(404).json({error: "Requested resource not available"});
}