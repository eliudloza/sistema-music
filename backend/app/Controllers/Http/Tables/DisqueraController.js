'use strict'
const Disquera =  use('App/Models/Tables/Disquera');
const { validate } = use('Validator');
class DisqueraController {
  async index ({ request, response, view }) {
    return response.status(200).json(await Disquera.all());
  }
  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      nombre: 'required|string',
    });

    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const nombre = request.input('nombre');

    const disquera = new Disquera();
    disquera.nombre = nombre;

    await disquera.save();

    return response.json(disquera);
  }
  async delete({params,request, response}){
    const id = params.id;
    const disquera = await Disquera.findOrFail(id);

    await disquera.delete();

    return response.status(201).json(disquera);
  }
  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      nombre: 'required|string'
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const disquera = await Disquera.findOrFail(id)
    const data =  await request.all();
    disquera.nombre = data.nombre

    await disquera.save()
    return response.json(disquera)
  }
}

module.exports = DisqueraController
