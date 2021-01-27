import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import OrphanageModel from '../models/Orphanage';
import OrphanageView from '../views/orphanage_view';
import * as Yup from 'yup';

export default {

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude, 
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;
    const orphanagesRepository = getRepository(OrphanageModel);

    // pegando os dados das Imagens enviadas (path -> endereço da imagem)
    // e armazenando como um Array do tipo que o Multer aceita:
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    });
    
    // Pegar os dados, ADICIONANDO as imagens, do relacionamento
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    }
    
    // Validação de todoos os dados a serem enviados
    // pelo FRONT-END na requisição
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });
    await schema.validate(data, {
      abortEarly: false, // obrigado a estourarerros só DEPOIS que ver todos
    });
    
    const orphanageData = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanageData);

    return response.status(201).json(orphanageData);
  },



  async list(request: Request, response: Response) {
    const orphanagesRepository = getRepository(OrphanageModel);
    const orphanageData = await orphanagesRepository.find({
      relations: ['images']
    });
    //relations faz mostrar o campo de RELACIONAMENTO

    // usando o orphanage_view para renderizar (montar)
    // a saida da API do jeito que eu quero pro usuario
    // nesse caso, tudo isso pra ao inves de mostrar apenas
    // o path como NOME DA IMAGEM.JPG, vamos montar pra
    // retornar a URL COMPLETA, pra ir completa pro Front
    return response.json(OrphanageView.renderMany(orphanageData));
  },


  async show(request: Request, response: Response) {
    const  { id } = request.params;
    const orphanagesRepository = getRepository(OrphanageModel);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });
    //relations faz mostrar o campo de RELACIONAMENTO);

    // usando o orphanage_view para renderizar (montar)
    // a saida da API do jeito que eu quero pro usuario
    // nesse caso, tudo isso pra ao inves de mostrar apenas
    // o path como NOME DA IMAGEM.JPG, vamos montar pra
    // retornar a URL COMPLETA, pra ir completa pro Front
    return response.json(OrphanageView.render(orphanage));
  }  

}