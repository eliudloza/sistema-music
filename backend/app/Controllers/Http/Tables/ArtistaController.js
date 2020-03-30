'use strict'
const Artista =  use('App/Models/Tables/Artista');
const { validate } = use('Validator');
class ArtistaController {
  async index ({ request, response, view }) {
    return response.status(200).json(await Artista.all());
  }

  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      apellido_paterno: 'required|string',
      apellido_materno: 'required|string',
      n_identificacion: 'required|number',
      nacionalidad_id: 'required|number',
    });

    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const nombre = request.input('nombre');
    const apellido_paterno = request.input('apellido_paterno');
    const apellido_materno = request.input('apellido_materno');
    const n_identificacion = request.input('n_identificacion');
    const nacionalidad_id = request.input('nacionalidad_id');

    const artista = new Artista();
    artista.nombre = nombre;
    artista.apellido_paterno= apellido_paterno;
    artista.apellido_materno = apellido_materno;
    artista.n_identificacion = n_identificacion;
    artista.nacionalidad_id = nacionalidad_id;

    await artista.save();

    return response.json(artista);
  }

  async delete({params,request, response}){
    const id = params.id;
    const artista = await Artista.findOrFail(id);

    await artista.delete();

    return response.status(201).json(artista);
  }

  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      apellido_paterno: 'required|string',
      apellido_materno: 'required|string',
      n_identificacion: 'required|number',
      nacionalidad_id: 'required|number',
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const artista = await Artista.findOrFail(id)
    const data =  await request.all();
    artista.nombre = data.nombre
    artista.apellido_paterno = data.apellido_paterno
    artista.apellido_materno = data.apellido_materno
    artista.n_identificacion = data.n_identificacion
    artista.nacionalidad_id = data.nacionalidad_id

    await artista.save()
    return response.json(artista)
  }
}

module.exports = ArtistaController
