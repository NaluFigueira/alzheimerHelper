import * as Yup from 'yup';
import Person from '../models/Person';
import fs from 'fs';
import { resolve } from 'path'; 
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

class PersonController{
  async index(req,res){
    const persons = await Person.findAll({where:{user_id: req.userId}});
    return res.json(persons);
  }

  async show(req,res){
    const person = await Person.findAll({where:{id: req.params.id, user_id: req.userId}});
    if(person.length === 0)
      return res.status(400).json({error: "This person doesn't exist!"})
    return res.json(person);
  }

  async store(req,res){
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      age: Yup.number(),
      relationship: Yup.string(),
      curiosities: Yup.string(),
    });
    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    const {filename:path} = req.file; 
    const {first_name, last_name} = req.body;
    const person = await Person.findOne({where: {first_name, last_name, user_id: req.userId}});

    if(person){
      return res.status(400).json({error: 'This person already exists, try updating it!'})
    }

    const newPerson = await Person.create({...req.body, user_id:req.userId, path});

    return res.json(newPerson);
    
  }

  async update(req,res){
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      age: Yup.number(),
      relationship: Yup.string(),
      curiosities: Yup.string(),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    const {filename:path} = req.file; 
    const {first_name, last_name} = req.body;
    
    const person = await Person.findOne({where: {first_name, last_name, user_id: req.userId}});

    if(!person){
      return res.status(400).json({error: "This person doesn't exist!"})
    }

    await unlinkAsync(resolve(__dirname,"..", "..", ".." , "temp", "uploads",person.path));

    await person.update({...req.body, path});

    return res.json({msg:"Update successful"});
  }

  async delete(req,res){
    await Person.destroy({where:{id: req.params.id}});
    res.json({msg: "Delete successful"});
  }
}


export default new PersonController();