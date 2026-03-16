const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;


// "banco de dados" simples

const times = {
  arsenal: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  liverpool: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  chelsea: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  manchesterunited: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  manchestercity: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  tottenham: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"
};


// rota inicial

app.get("/", (req, res) => {
  res.send("API Times funcionando");
});


// listar todos os times

app.get("/api/times", (req, res) => {

  const lista = Object.keys(times).map(nome => ({
    nome: nome,
    imagem: times[nome]
  }));

  res.json(lista);

});


// time aleatório

app.get("/api/times/aleatorio", (req, res) => {

  const listaTimes = Object.keys(times);

  const random =
    listaTimes[Math.floor(Math.random() * listaTimes.length)];

  res.json({
    status: "success",
    nome: random,
    imagem: times[random]
  });

});


// buscar time específico

app.get("/api/times/:nome", (req, res) => {

  const nome = req.params.nome.toLowerCase();

  if (times[nome]) {

    res.json({
      status: "success",
      nome: nome,
      imagem: times[nome]
    });

  } else {

    res.json({
      status: "error",
      message: "Time não encontrado"
    });

  }

});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
