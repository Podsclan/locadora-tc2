const db = require("../models");
const Pessoa = db.pessoa;

// Adicionar uma nova pessoa
exports.create = (req, res) => {
  console.log(req.body);
  if (
    !req.body.name ||
    !req.body.sex ||
    !req.body.birthDate ||
    !req.body.phone ||
    !req.body.adress ||
    !req.body.isAtendente
  ) {
    res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
    return;
  }
  const pessoa = new Pessoa({
    name: req.body.name,
    sex: req.body.sex,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    adress: req.body.adress,
    isAtendente: req.body.isAtendente,
  });

  pessoa
    .save(pessoa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message,
      });
    });
};

// Retornar a lista de pessoas
exports.findAll = (req, res) => {
  var condition = {};
  Pessoa.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de pessoas" });
    });
};

// Retornar a lista de atendentes
exports.findAllAtendente = (req, res) => {
  var condition = { isAtendente: true };
  Pessoa.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de atendentes" });
    });
};

// Retornar a lista de clientes
exports.findAllCliente = (req, res) => {
  var condition = { isAtendente: false };
  Pessoa.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter lista de clientes" });
    });
};

// Retornar uma pessoa específica
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pessoa.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ msg: "Pessoa não encontrada" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao obter dado com id=" + id });
    });
};

// Atualiza uma pessoa
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "Dados inválidos" });
    return;
  }

  const id = req.params.id;

  Pessoa.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Não foi possível atualizar a Pessoa" });
      } else {
        res.send({ msg: "Pessoa atualizada com sucesso" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao atualizar a Pessoa" });
    });
};

// Remover uma pessoa específica
exports.delete = (req, res) => {
  const id = req.params.id;
  Pessoa.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Não foi possível remover a Pessoa" });
      } else {
        res.send({ msg: "Pessoa deletada com sucesso" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Erro ao deletar a Pessoa" });
    });
};
