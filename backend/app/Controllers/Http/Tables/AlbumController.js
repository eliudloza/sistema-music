'use strict'
const Album =  use('App/Models/Tables/Album');
const { validate } = use('Validator');
class AlbumController {
  async index ({ request, response, view }) {
    return response.status(200).json(await Album.all());
  }
  async create ({ request, response }) {
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      year: 'required|number',
      n_canciones: 'required|number',
      artista_id: 'required|number',
      disquera_id: 'required|number'
    });

    if(validation.fails()) {
      return response.json(validation.messages());
    }

    const nombre = request.input('nombre');
    const year = request.input('year');
    const n_canciones = request.input('n_canciones');
    const artista_id = request.input('artista_id');
    const disquera_id = request.input('disquera_id');

    const album = new Album();
    album.nombre = nombre;
    album.year = year;
    album.n_canciones = n_canciones;
    album.artista_id = artista_id;
    album.disquera_id = disquera_id;

    await album.save();

    return response.json(album);
  }
  async delete({params,request, response}){
    const id = params.id;
    const album = await Album.findOrFail(id);

    await album.delete();

    return response.status(201).json(album);
  }

  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      nombre: 'required|string',
      year: 'required|number',
      n_canciones: 'required|number',
      artista_id: 'required|number',
      disquera_id: 'required|number'
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const album = await Album.findOrFail(id)
    const data =  await request.all();
    album.nombre = data.nombre
    album.year = data.year
    album.n_canciones = data.n_canciones
    album.artista_id = data.artista_id
    album.disquera_id = data.disquera_id


    await album.save()
    return response.json(album)
  }

}

module.exports = AlbumController
