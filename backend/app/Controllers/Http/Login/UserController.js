'use strict'
const User=use('App/Models/User');
class UserController {

  async registro({request,response})
  {
    let user = new User()
    let obj = request.all()

    user.nombre = obj.nombre
    user.email = obj.email
    user.password = obj.password


    let data = await user.save()
    return response.status(201).send({message: "Usuario creado con exito"})

  }

  async login({request,response,auth})
  {
    let obj = request.all()

    try {
      const token = await auth.attempt(obj.email, obj.password)
      return response.status(201).json(token)
    } catch(error) {
      return response.status(401).json({"mensaje":"Información incorrecta",error})
    }
  }

  async mostrar({params,response})
  {
    return response.status(200).json(await User.all())
  }


  async logout({response, auth}) {
    let email = auth.email
    await auth
      .authenticator('api')
      .revokeTokensForUser(email)
    return response.status(204).send(null)
  }
}

module.exports = UserController
