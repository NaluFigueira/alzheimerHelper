import * as Yup from 'yup';
import Event from '../models/Event';
import fs from 'fs';
import { resolve } from 'path'; 
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

class EventController{
  async index(req,res){
    const events = await Event.findAll({where:{user_id: req.userId}});
    return res.json(events);
  }

  async show(req,res){
    const event = await Event.findAll({where:{id: req.params.id, user_id: req.userId}});
    if(event.length === 0)
      return res.status(400).json({error: "This event doesn't exist!"})
    return res.json(event);
  }

  async store(req,res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      local: Yup.string(),
      details: Yup.string(),
    });
    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    const {filename:path} = req.file; 
    const {name} = req.body;
    const event = await Event.findOne({where: {name, user_id: req.userId}});

    if(event){
      return res.status(400).json({error: 'This event already exists, try updating it!'})
    }

    const newEvent = await Event.create({...req.body, user_id:req.userId, path});

    return res.json(newEvent);
    
  }

  async update(req,res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      local: Yup.string(),
      details: Yup.string(),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    const {filename:path} = req.file; 
    const {name} = req.body;
    
    const event = await Event.findOne({where: {name, user_id: req.userId}});

    if(!event){
      return res.status(400).json({error: "This event doesn't exist!"})
    }

    await unlinkAsync(resolve(__dirname,"..", "..", ".." , "temp", "uploads",event.path));

    await event.update({...req.body, path});

    return res.json({msg:"Update successful"});
  }

  async delete(req,res){
    await Event.destroy({where:{id: req.params.id}});
    res.json({msg: "Delete successful"});
  }
}


export default new EventController();