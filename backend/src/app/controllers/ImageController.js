import * as Yup from 'yup';
import Image from '../models/Image';

class ImageController{
  async store(req,res){
    const schema = Yup.object().shape({
      category: Yup.string().required('Image category is required!'),
    });

    if(await !(schema.isValid(req.body)))
      return res.status(400).json({error: 'Invalid request data!'})
    
    const {originalname: name, filename:path} = req.file; 
    const {category} = req.body;
    
    const image = await Image.findOne({where: {name}});

    if(image){
      return res.status(400).json({error: 'This image already exists, try updating it!'})
    }

    const newImage = await Image.create({
      name,
      category,
      path,
    });

    return res.json(newImage);
    
  }
}

export default new ImageController();