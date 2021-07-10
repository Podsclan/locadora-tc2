module.exports = (app) => {
  const pessoa = require("../controllers/pessoa.controller.js");
  var router = require("express").Router();
  // Insere nova pessoa
  router.post("/", pessoa.create);
  // Retorna todas pessoas
  router.get("/", pessoa.findAll);
  // Retorna todos os atendentes
  router.get("/atendentes", pessoa.findAllAtendente);
  // Retorna todos os clientes
  router.get("/clientes", pessoa.findAllCliente);
  // Retorna uma pessoa especifica
  router.get("/:id", pessoa.findOne);
  // Atualiza pessoa
  router.put("/:id", pessoa.update);
  // Remove pessoa
  router.delete("/:id", pessoa.delete);
  app.use("/api/pessoas", router);
};
