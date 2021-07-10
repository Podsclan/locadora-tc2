const db = require("../models");
const Filme = db.filme;

// Adicionar um novo filme
exports.create = (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.releaseDate ||
    !req.body.category ||
    !req.body.director ||
    !req.body.available
  ) {
    res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
    return;
  }
  const filme = new Filme({
    name: req.body.name,
    description: req.body.description,
    releaseDate: req.body.releaseDate,
    category: req.body.category,
    director: req.body.director,
    available: req.body.available,
  });

  filme
    .save(filme)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message,
      });
    });
};

// Retornar a lista de filmes
exports.findAll = (req, res) => {
  var condition = {};
  Filme.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de filmes" });
    });
};

// Retornar a lista de filmes disponíveis
exports.findAllAvailable = (req, res) => {
  var condition = { available: true };
  Filme.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de filmes" });
    });
};

// Retornar a lista de filmes de certa categoria
exports.findAllCategory = (req, res) => {
  var category = req.params.category;
  var condition = { category };
  Filme.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de filmes" });
    });
};

// Retornar um filme específico
exports.findOne = (req, res) => {
  const id = req.params.id;

  Filme.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ msg: "Filme não encontrado" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter dado com id=" + id });
    });
};

// Atualiza um filme
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "Dados inválidos" });
    return;
  }

  const id = req.params.id;

  Filme.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Não foi possível atualizar o Filme" });
      } else {
        res.send({ msg: "Filme atualizado com sucesso" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao atualizar o Filme" });
    });
};

// Remover um filme específico
exports.delete = (req, res) => {
  const id = req.params.id;
  Filme.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Não foi possível remover o Filme" });
      } else {
        res.send({ msg: "Filme deletado com sucesso" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao deletar o Filme" });
    });
};
