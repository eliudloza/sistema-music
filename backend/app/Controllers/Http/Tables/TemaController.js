'use strict'
const Tema =  use('App/Models/Tables/Tema');
const { validate } = use('Validator');
class TemaController {
  async index ({ request, response, view }) {
    return response.status(200).json(await Tema.all());
  }

  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      titulo: 'required|string',
      year: 'required|number',
      idioma_id: 'required|number',
      artista_id: 'required|number',
      genero_id: 'required|number',
    });

    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const titulo = request.input('titulo');
    const year = request.input('year');
    const idioma_id = request.input('idioma_id');
    const artista_id = request.input('artista_id');
    const genero_id = request.input('genero_id');

    const tema = new Tema();
    tema.titulo = titulo;
    tema.year = year;
    tema.idioma_id = idioma_id;
    tema.artista_id = artista_id;
    tema.genero_id = genero_id;


    await tema.save();

    return response.json(tema);
  }

  async delete({params,request, response}){
    const id = params.id;
    const tema = await Tema.findOrFail(id);

    await tema.delete();

    return response.status(201).json(tema);
  }

  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      titulo: 'required|string',
      year: 'required|number',
      idioma_id: 'required|number',
      artista_id: 'required|number',
      genero_id: 'required|number'
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const tema = await Tema.findOrFail(id)
    const data =  await request.all();
    tema.titulo = data.titulo
    tema.year = data.year
    tema.idioma_id = data.idioma_id
    tema.artista_id = data.artista_id
    tema.genero_id = data.genero_id

    await tema.save()
    return response.json(tema)
  }

}

module.exports = TemaController
