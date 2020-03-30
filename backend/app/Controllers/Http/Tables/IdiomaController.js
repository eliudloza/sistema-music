'use strict'
const Idioma =  use('App/Models/Tables/Idioma');
const { validate } = use('Validator');
class IdiomaController {
  async index ({ request, response, view }) {
    return response.status(200).json(await Idioma.all());
  }
  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      nombre: 'required|string',
    });
    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const nombre = request.input('nombre');
    const descripcion = request.input('descripcion');
    const idioma = new Idioma();
    idioma.nombre = nombre;
    idioma.descripcion = descripcion;

    await idioma.save();
    return response.json(idioma);
  }
  async delete({params,request, response}){
    const id = params.id;
    const idioma = await Idioma.findOrFail(id);

    await idioma.delete();

    return response.status(201).json(idioma);
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
    const idioma = await Idioma.findOrFail(id)
    const data =  await request.all();
    idioma.nombre = data.nombre
    idioma.descripcion = data.descripcion

    await idioma.save()
    return response.json(idioma)
  }
}

module.exports = IdiomaController
