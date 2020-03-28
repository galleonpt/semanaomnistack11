const express = require("express");
const {celebrate, Joi, Segments}=require("celebrate")//celebrate e usado para autenticacoes

const OngController = require("./controllers/OngController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")

const routes = express.Router()

routes.post('/sessions', SessionController.create)

// listar as ongs todas registadas
routes.get('/ongs', OngController.index)
//Cadastro/Registo de ongs
routes.post('/ongs',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),//o nome e uma string e é obrigatorio
    email: Joi.string().required().email(),
    number: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required()
  })
}), OngController.create);


routes.get('/incidents',celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page:Joi.number()
  })
}), IncidentController.index);



routes.post('/incidents',celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}) ,IncidentController.create);


routes.delete('/incidents/:id',celebrate({
  [Segments.PARAMS]:Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete);



routes.get("/profile",celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index);

module.exports = routes;