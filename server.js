const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sql = require("./dbconfig");

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result =
      await sql.query`SELECT * FROM dbo.Users WHERE Username = ${username}`;
    const user = result.recordset[0];
    if (user) {
      const isPasswordValid = password === user.Password;
      if (isPasswordValid) {
        req.session.userId = user.UserID;
        req.session.userType = user.UserType;
        res.status(200).send({
          message: "Login successful",
          userType: user.UserType,
          userId: user.UserID,
        });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/data", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = req.session.userId;
    const userType = req.session.userType;

    if (userType === "Pacienti") {
      const result =
        await sql.query`SELECT * FROM dbo.Pacienti WHERE UserID = ${userId}`;
      res.json(result.recordset[0]);
    } else if (userType === "Doctori") {
      const result =
        await sql.query`SELECT * FROM dbo.Doctori WHERE UserID = ${userId}`;
      res.json(result.recordset[0]);
    } else {
      res.status(400).json({ error: "Invalid user type" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Logout failed" });
    }
    res.status(200).send({ message: "Logout successful" });
  });
});

app.get("/date-medicale", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const result =
      await sql.query`SELECT * FROM dbo.DateMedicale WHERE PacientID = ${req.session.userId}`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
