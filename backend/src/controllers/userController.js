const { z } = require("zod")
const { hash, compare } = require("bcrypt")
const { HttpStatusCode } = require("axios")
const { validation } = require("../middleware/validation")
const { userRepository } = require("../database/repository/userRepository")
const { sign } = require("jsonwebtoken")

const validationCreate = validation({
  body: z.object({
    email: z.string().email('Coloque um E-mail válido'),
    password: z.string().min(8, 'Senha deve ter mínimo de 8 caracteres')
  })
})

const create = async (req, res) => {  
  try {
    const { password, ...userData } = req.body
    const passwordHash = await hash(password, 8)

    const { _id } = await userRepository.create({ ...userData, password: passwordHash })

    res.status(HttpStatusCode.Created).json({ _id })
  } catch {
    res.status(HttpStatusCode.InternalServerError).json({
      errors: ['Erro ao criar usuário :(']
    })
  }
}

const validationLogin = validation({
  body: z.object({
    email: z.string().email('Coloque um E-mail válido'),
    password: z.string().min(8, 'Senha deve ter mínimo de 8 caracteres')
  })
})

const login = async (req, res) => {
  try {
    const user = await userRepository.getOneByEmail(req.email)
    
    if(user === null && !(await compare(req.password, user.password))) {
      res.status(HttpStatusCode.Unauthorized).json({
        errors: ['Senha ou email inválidos']
      })
      return
    }
    const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env
    const token = sign({ _id: user._id }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN || '1d'
    })

    res.status(HttpStatusCode.Created).json({
      token
    })
  } catch{
    res.status(HttpStatusCode.InternalServerError).json({
      errors: ['Erro ao fazer login :(']
    })
  }
}

exports.userController = {
  create,
  validationCreate,
  login,
  validationLogin,
}