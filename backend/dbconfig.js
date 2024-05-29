const sql = require("mssql");

const config = {
  user: "Proiect_IP",
  password: "student123!",
  server: "safeyserver.database.windows.net",
  database: "SafeyDB",
  options: {
    encrypt: true,
  },
};

sql.connect(config, (err) => {
  if (err) console.log(err);
  else console.log("Database connected!");
});

module.exports = sql;
