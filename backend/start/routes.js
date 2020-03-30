'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
//Ruta de usuarios
Route.group(()=>{
  Route.get("/user", "AuthController.index");
  Route.post("/user/create", "AuthController.register");
  Route.post("/user/login", "AuthController.login");
  Route.post("/user/logout", "AuthController.logout").middleware(["auth"]);
  Route.delete('/user/delete/:id', 'AuthController.delete')
  Route.put('/user/update/:id', 'AuthController.update')
}).prefix('api/v1')

//Nacionalidad Routes
Route.group(()=> {
  Route.get('/nacionalidad', 'Tables/NacionalidadController.index')
  Route.post('/nacionalidad/create', 'Tables/NacionalidadController.create')
  Route.put('/nacionalidad/update/:id', 'Tables/NacionalidadController.update')
  Route.delete('/nacionalidad/delete/:id', 'Tables/NacionalidadController.delete')
}).prefix('api/v1')

//Genero Routes
Route.group(()=> {
  Route.get('/genero', 'Tables/GeneroController.index')
  Route.post('/genero/create', 'Tables/GeneroController.create')
  Route.put('/genero/update/:id', 'Tables/GeneroController.update')
  Route.delete('/genero/delete/:id', 'Tables/GeneroController.delete')
}).prefix('api/v1')

//Idioma Routes
Route.group(()=> {
  Route.get('/idioma', 'Tables/IdiomaController.index')
  Route.post('/idioma/create', 'Tables/IdiomaController.create')
  Route.put('/idioma/update/:id', 'Tables/IdiomaController.update')
  Route.delete('/idioma/delete/:id', 'Tables/IdiomaController.delete')
}).prefix('api/v1')

//Disquera Routes
Route.group(()=> {
  Route.get('/disquera', 'Tables/DisqueraController.index')
  Route.post('/disquera/create', 'Tables/DisqueraController.create')
  Route.put('/disquera/update/:id', 'Tables/DisqueraController.update')
  Route.delete('/disquera/delete/:id', 'Tables/DisqueraController.delete')
}).prefix('api/v1')

//Artista Routes
Route.group(()=> {
  Route.get('/artista', 'Tables/ArtistaController.index')
  Route.post('/artista/create', 'Tables/ArtistaController.create')
  Route.put('/artista/update/:id', 'Tables/ArtistaController.update')
  Route.delete('/artista/delete/:id', 'Tables/ArtistaController.delete')
}).prefix('api/v1')

//Tema Routes
Route.group(()=> {
  Route.get('/tema', 'Tables/TemaController.index')
  Route.post('/tema/create', 'Tables/TemaController.create')
  Route.put('/tema/update/:id', 'Tables/TemaController.update')
  Route.delete('/tema/delete/:id', 'Tables/TemaController.delete')
}).prefix('api/v1')

//Album Routes
Route.group(()=> {
  Route.get('/album', 'Tables/AlbumController.index')
  Route.post('/album/create', 'Tables/AlbumController.create')
  Route.put('/album/update/:id', 'Tables/AlbumController.update')
  Route.delete('/album/delete/:id', 'Tables/AlbumController.delete')
}).prefix('api/v1')
