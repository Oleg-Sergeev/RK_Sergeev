import express from "express";

const app = express();

app.use((req, res, next) => {
    const data = {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode
    }

    console.log(data);

    next();
});

const PUBLIC_DIR = "public";
app.use(express.static(PUBLIC_DIR));

app.use(express.json());

app.post("/form", (req, res) => {
  const contentType = req.header("Content-Type");

  if (contentType != "application/json") {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Неверный тип данных",
    };

    res.send(data);
    return;
  }

  if (!req.body) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Пустой POST запрос",
    };

    res.send(data);
    return;
  }

  if (!req.body.playerName) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Требуется имя игрока",
    };

    res.send(data);
    return;
  }

  const positions = ["off", "mid", "def"];

  if (!positions.includes(req.body.position)) {
    res.statusCode = 400;

    const message = req.body.position
    ? "Неверная позиция"
    : "Требуется позиция игрока";

    const data = {
      status: "error",
      message
    };

    res.send(data);
    return;
  }

  if (req.body.number && !Number(req.body?.number)) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "'Номер' должен быть числом",
    };

    res.send(data);
    return;
  }
  
  if (req.body.hasEquip && (typeof req.body?.hasEquip !== 'boolean')) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "'Наличие экипировки' должно быть булевым значением",
    };

    res.statusCode = 200;
    res.send(data);
    return;
  }

  const payload = {
    playerName: req.body.playerName,
    position: req.body.position,
    number: req.body.number,
    hasEquip: req.body.hasEquip,
  };

  const data = {
    status: "ok",
    payload,
  };

  res.send(data);
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started at port ${port}`));
