'use strict'
const Genero =  use('App/Models/Tables/Genero');
const { validate } = use('Validator');
class GeneroController {
  async index ({ request, response, view }) {
    return response.status(200).json(await Genero.all());
  }
  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      descripcion: 'required|string',
    });

    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const nombre = request.input('nombre');
    const descripcion = request.input('descripcion');

    const genero = new Genero();
    genero.nombre = nombre;
    genero.descripcion = descripcion;

    await genero.save();

    return response.json(genero);
  }
  async delete({params,request, response}){
    const id = params.id;
    const genero = await Genero.findOrFail(id);

    await genero.delete();

    return response.status(201).json(genero);
  }
  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      descripcion: 'required|string',
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const genero = await Genero.findOrFail(id)
    const data =  await request.all();
    genero.nombre = data.nombre
    genero.descripcion = data.descripcion

    await genero.save()
    return response.json(genero)
  }
}

module.exports = GeneroController
