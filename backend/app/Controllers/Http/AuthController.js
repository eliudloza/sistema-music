'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator');

const user = new User();
class AuthController {
  async index ({ request, response, view }) {
    return response.status(200).json( await User.all())
  }
  async login({request, response, auth}){

    let objeto = request.all()

    try {
      const token = await auth.attempt(objeto.email, objeto.password)
      return response.status(201).json(token)
    } catch(error) {
      return response.status(401).json({"mensaje":"Información incorrecta",error})
    }

  }
  async register({request, response}){
    let user = new User();
    let objeto = request.all();

    user.username = objeto.username;
    user.email = objeto.email;
    user.password = objeto.password;
    try{
      let data = await user.save();
      if(data)
        return response.status(201).json(user);
    }catch(error){
      return response.status(400).json({mensaje: 'error', error:error});
    }
  }
  async logout({response, auth}) {
    let user = auth.user
    await auth
      .authenticator('api')
      .revokeTokensForUser(user)

    return response.status(204).json({
      message: 'Token revokado'})
  }
  async delete({params,request, response}){
    const id = params.id
    const user = await User.findOrFail(id)
    await user.delete();

    return response.status(201).json("eliminado")

  }
  async update ({params,request, response}){
    const validation = await validate(request.all(), {
      username: 'required|string',
      email: 'required|email|unique:users,email',
      password: 'required',
    });

    if(validation.fails()){
      return response.json('back')
    }

    const id = params.id
    const user = await User.findOrFail(id)
    const data =  await request.all();
    user.username = data.username
    user.email = data.email
    user.password = data.password

    await user.save()
    return response.json(user)
  }


}

module.exports = AuthController
