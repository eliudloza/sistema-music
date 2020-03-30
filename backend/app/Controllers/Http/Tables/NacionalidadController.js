'use strict'
const Nacionalidad =  use('App/Models/Tables/Nacionalidad');
const { validate } = use('Validator');
class NacionalidadController {
  async index ({ request, response}) {
    return response.status(200).json(await Nacionalidad.all());
  }

  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      abreviacion: 'required|string'
    });

    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const nombre = request.input('nombre');
    const abreviacion = request.input('abreviacion');

    const nacionalidad = new Nacionalidad();
    nacionalidad.nombre = nombre;
    nacionalidad.abreviacion = abreviacion;

    await nacionalidad.save();

    return response.json(nacionalidad);
  }

  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      abreviacion: 'required|string',
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const nacionalidad = await Nacionalidad.findOrFail(id)
    const data =  await request.all();
    nacionalidad.nombre = data.nombre
    nacionalidad.abreviacion = data.abreviacion

    await nacionalidad.save()
    return response.json(nacionalidad)
  }

  async delete({params,request, response}){
    const id = params.id;
    const nacionalidad = await Nacionalidad.findOrFail(id);

    await nacionalidad.delete();

    return response.status(201).json(nacionalidad);
  }
}

module.exports = NacionalidadController
