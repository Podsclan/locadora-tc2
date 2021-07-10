const db = require("../models");

const Locacao = db.locacao;
const Filme = db.filme;
const Pessoa = db.pessoa;

// Adicionar uma nova locação
exports.create = (req, res) => {
  if (
    !req.body.movieId ||
    !req.body.clienteId ||
    !req.body.atendenteId ||
    !req.body.stardDate ||
    !req.body.endDate
  ) {
    res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
    return;
  }
  if (
    !Filme.exists({ _id: req.body.movieId }) ||
    !Pessoa.exists({ _id: req.body.clienteId }) ||
    !Pessoa.exists({ _id: req.body.atendenteId })
  ) {
    res.status(400).send({ msg: "Requisição incompleta: dados inexistentes" });
    return;
  }
  const locacao = new Locacao({
    movieId: req.body.movieId,
    clienteId: req.body.clienteId,
    atendenteId: req.body.atendenteId,
    stardDate: req.body.stardDate,
    endDate: req.body.endDate,
  });

  locacao
    .save(locacao)
    .then((data) => {
      Filme.findByIdAndUpdate(req.body.movieId, { available: "false" })
        .then((data) => {
          if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar o Filme: " + err.message });
          }
        })
        .catch((err) => {
          res.status(500).send({ msg: "Erro ao atualizar o Filme: " + err.message });
        });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message,
      });
    });
};

// Retornar a lista de locações
exports.findAll = (req, res) => {
  var condition = {};
  Locacao.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de locações" });
    });
};

// Retornar a lista de locações de um cliente
exports.findAllCliente = (req, res) => {
  const clienteId = req.params.clienteId;
  var condition = { clienteId };
  Locacao.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de locações" });
    });
};

// Retornar a lista de locações de um atendente
exports.findAllAtendente = (req, res) => {
  const atendenteId = req.params.atendenteId;
  var condition = { atendenteId };
  Locacao.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de locações" });
    });
};

// Retornar a lista de locações de um filme
exports.findAllMovie = (req, res) => {
  const movieId = req.params.movieId;
  var condition = { movieId };
  Locacao.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de locações" });
    });
};

// Retornar uma locação específica
exports.findOne = (req, res) => {
  const id = req.params.id;

  Locacao.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ msg: "Locação não encontrado" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter dado com id=" + id });
    });
};

// Atualiza uma locação
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "Dados inválidos" });
    return;
  }

  const id = req.params.id;

  Locacao.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Não foi possível atualizar a Locação" });
      } else {
        res.send({ msg: "Locação atualizada com sucesso" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao atualizar a Locação" });
    });
};

// Remover uma locação específico
exports.delete = (req, res) => {
  const id = req.params.id;
  Locacao.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Não foi possível remover a Locação" });
      } else {
        Filme.findByIdAndUpdate(req.body.movieId, { available: "true" })
          .then((data) => {
            if (!data) {
              res.status(400).send({ msg: "Não foi possível atualizar o Filme: " + err.message });
            }
          })
          .catch((err) => {
            res.status(500).send({ msg: "Erro ao atualizar o Filme: " + err.message });
          });
        res.send({ msg: "Locação deletada com sucesso" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao deletar a Locação" });
    });
};
