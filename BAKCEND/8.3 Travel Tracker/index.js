import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Pool({
  user: "postgres",
  host:"localhost",
  database: "world",
  password: "123456",
  port: 5432,

});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/add",async (req, res) => { 

  const result = await db.query(
  "SELECT * FROM visited_countries"
  );

  const countryCodes = result.rows.map(c => c.country_code);

  const inputCountry = req.body.country?.trim();

  if (!inputCountry) {   //When input text is empty
    //return res.status(400).send("Country name is required");
    return res.render("index.ejs",{
      countries: countryCodes,
      total : countryCodes.length,
      error: "Country name required"
    });
  }

  try {
    const countryCodeRows = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [inputCountry]
    );
    var countryCODE; 

    if (!countryCodeRows.rows[0]) {   //If codeRow empty -> invalid country name
      //return res.status(404).send("Country not found");
      return res.render("index.ejs",{
      countries: countryCodes,
      total : countryCodes.length,
      error: "Country not found, please try again"
    });

    }else {
      countryCODE = countryCodeRows.rows[0].country_code;
    }
    

    if (countryCodes.includes(countryCODE)) {

      return res.render("index.ejs",{
      countries: countryCodes,
      total : countryCodes.length,
      error: "Country already visited"
    });
    }


    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",[countryCODE]);

    res.redirect("/");
  } catch (err) {
    console.error("Error inserting country:", err);
    res.status(500).send("Server error");
  }

});

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query(
  "SELECT * FROM visited_countries"
  );

  const countryCodes = result.rows.map(c => c.country_code);

  res.render("index.ejs", { 
    countries: countryCodes,
    total : countryCodes.length
  });


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
