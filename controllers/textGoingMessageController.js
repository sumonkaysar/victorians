const { webMessage } = require("../mongoDBConfig/collections")
const { createDoc, readDoc, readOneDoc, updateDoc, deleteDoc } = require("../utils/mongoQueries")
const { ObjectId } = require("mongodb")

const saveWebMessage= async(req, res)=>{
  try{
    const result = await createDoc(req, webMessage)
    res.send(result)
  }catch(e){
    console.log(e)
  }
}

const getWebMessage= async(req, res)=>{
    try{
        const result = await readDoc(webMessage);
        res.send(result)
    }catch(e){
console.log(e)
    }
}

const getOneWebMessage= async(req, res)=>{
    try{
        const result = await readOneDoc(req, webMessage);
        res.send(result || {})
    }catch(e){
        console.log(e)
    }
}
const UpdateWebMessage= async(req, res)=>{
    try{
        const result = await updateDoc(req, webMessage);
        res.send(result)
    }catch(e){
        console.log(e)
    }
}
const deleteWebMessage= async(req, res)=>{
    try{
        const result = await deleteDoc(req, webMessage);
        res.send(result)
    }catch(e){
        console.log(e)
    }
}

const setUserSee= async(req, res)=>{
    const _id = new ObjectId(req.params.id);
    try {
        const message = await webMessage().findOne({ _id: _id });
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        const userSee = message.userSee;
        const newuserSee = userSee === undefined ? true : !userSee;

        const result = await webMessage().updateOne(
            { _id: _id },
            { 
                $set: { 
                    userSee: newuserSee
                } 
            }
        );
        res.json(result);
    }catch(e){
        console.log(e)
    }
}

module.exports={
    saveWebMessage,
    getWebMessage,
    getOneWebMessage,
    UpdateWebMessage,
    deleteWebMessage,
    setUserSee
}