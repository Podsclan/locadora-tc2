module.exports = (app) => {
  const filme = require("../controllers/filme.controller.js");
  var router = require("express").Router();
  // Insere um novo filme
  router.post("/", filme.create);
  // Retorna todos os filmes
  router.get("/", filme.findAll);
  // Retorna um filme específico
  router.get("/filme/:id", filme.findOne);
  // Retorna todos os filmes disponíveis
  router.get("/available", filme.findAllAvailable);
  //retorna todos os filmes de uma categoria
  router.get("/category/:category", filme.findAllCategory);
  // Atualiza um filme
  router.put("/:id", filme.update);
  // Remove um filme
  router.delete("/:id", filme.delete);
  app.use("/api/filmes", router);
};
