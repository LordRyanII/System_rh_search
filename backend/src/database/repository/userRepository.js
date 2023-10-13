const mongoose = require("mongoose")
const { userModel } = require("../models/userModel")

/**
  Cria um usuário no banco de dados
  @param { object } user - dados do usuário a ser salvo
  @return { object } dados que recebeu
  */
const create = async (user) => {
  return await userModel.create(user)
}

const getById = async (_id, withPassword = false) => {
  const query = mongoose.sanitizeFilter(query)
  return await userModel.findById(query, { password: withPassword })
}

const getOneByEmail = async (email, withPassword = false) => {
  const query = mongoose.sanitizeFilter(email)
  return await userModel.findOne(query, { password: withPassword })
}

const userRepository = {
  create,
  getById,
  getOneByEmail
}

module.exports = {
  userRepository
}