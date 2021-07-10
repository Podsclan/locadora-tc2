module.exports = (app) => {
  const locacao = require("../controllers/locacao.controller.js");
  var router = require("express").Router();
  // Insere uma nova locacao
  router.post("/", locacao.create);
  // Retorna todas as locacoes
  router.get("/", locacao.findAll);
  // Retorna todas as locacoes de um atendente
  router.get("/atendente/:atendenteId", locacao.findAllAtendente);
  // Retorna todas as locacoes de um cliente
  router.get("/cliente/:clienteId", locacao.findAllCliente);
  // Retorna todas as locacoes de um filme
  router.get("/filme/:movieId", locacao.findAllMovie);
  // Retorna uma locação específica
  router.get("/:id", locacao.findOne);
  // Atualiza uma locacao
  router.put("/:id", locacao.update);
  // Remove uma locacao
  router.delete("/:id", locacao.delete);
  app.use("/api/locacoes", router);
};
