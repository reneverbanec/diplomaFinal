require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const saltRounds = 10;

const app = express();

const db = require("./db");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); //dobi podatke iz body in pripne na request
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const { sign } = require("jsonwebtoken");
const { validateToken } = require("./middleware/AuthMiddleware");

//API
//REGISTER
app.post("/api/v1/vml/register", async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const results = await db.query(
      "insert into users (username, password) VALUES ($1, $2) returning *",
      [req.body.username, hashedPassword]
    );
    res.status(201).json({
      status: "success",
      data: {
        users: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//LOGIN
/*app.get("/api/v1/vml/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});*/

app.get("/api/v1/vml/auth", validateToken, (req, res) => {
  res.json({ hello: "hello" });
});

app.post("/api/v1/vml/login", async (req, res) => {
  try {
    const results = await db.query("select * from users where username = $1", [
      req.body.username,
    ]);
    if (results.rows.length > 0) {
      bcrypt.compare(
        req.body.password,
        results.rows[0].password,
        (error, response) => {
          if (response) {
            const accessToken = sign(
              {
                username: results.rows[0].username,
                id: results.rows[0].uid,
              },
              "diploma123"
            );
            res.json(accessToken);
            console.log("Podatki za access token:", accessToken);
          } else {
            res.json({
              message: "Wrong username/password combination",
            });
          }
        }
      );
    } else {
      res.json({
        message: "User doesnt exist",
      });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

//Dobi vse ekipe
app.get("/api/v1/vml/ekipe", async (req, res) => {
  try {
    const results = await db.query("SELECT * from TEAMS");
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        teams: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//Dobi določeno ekipo
app.get("/api/v1/vml/ekipe/:ekipaid", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * from TEAMS where teams.id_team = $1",
      [req.params.ekipaid]
    );

    console.log(results.rows[0]);
    res.status(200).json({
      status: "success",
      data: {
        team: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//dobi vse igralce od ekipe
app.get("/api/v1/vml/igralci/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select id_player, first_name, last_name, kit, club, id_team from players natural join teams where id_team = $1 group by id_player,first_name, last_name, kit,club,id_team order by club desc",
      [req.params.id]
    );

    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        igralci: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//dobi igralca
app.get("/api/v1/vml/ekipe/:id_team/:id_player", async (req, res) => {
  try {
    const results = await db.query(
      "select first_name, last_name, kit from players natural join teams where id_team = $1 and id_player = $2",
      [req.params.id_team, req.params.id_player]
    );

    console.log(results.rows);
    res.status(200).json({
      status: "success",
      data: {
        player: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//najboljši strelci
app.get("/api/v1/vml/strelci", async (req, res) => {
  try {
    const results = await db.query(
      "select first_name, last_name, sum(goals) AS total, club from players natural join scores natural join teams group by first_name, last_name, club order by sum(goals) desc, first_name, last_name"
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        strelci: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});
//najboljše asistence
app.get("/api/v1/vml/asistence", async (req, res) => {
  try {
    const results = await db.query(
      "select first_name, last_name, sum(assists) AS total, club from players natural join scores natural join teams group by first_name, last_name, club order by sum(assists) desc, first_name, last_name;"
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        asistenti: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});
//tekme kluba
app.get("/api/v1/vml/tekme/:id", async (req, res) => {
  try {
    const results = await db.query(
      'select date_time,id_match, h.club AS "home", home AS "goli1", away AS "goli2", a.club AS "away" from matches AS match join teams AS h ON match.id_home = h.id_team join teams AS a ON match.id_away = a.id_team join results using (id_match) where id_home = $1 OR id_away = $1',
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        tekme: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//vse tekme
app.get("/api/v1/vml/tekme", async (req, res) => {
  try {
    const results = await db.query(
      'select date_time,id_match, h.club AS "home", home AS "goli1", away AS "goli2", a.club AS "away" from matches AS match join teams AS h ON match.id_home = h.id_team join teams AS a ON match.id_away = a.id_team join results using (id_match) order by date_time DESC'
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        tekme: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//zadnji krog tekme
app.get("/api/v1/vml/zadnjikrog", async (req, res) => {
  try {
    const results = await db.query(
      'select date_time,id_match, h.club AS "home", home AS "goli1", away AS "goli2", a.club AS "away" from matches AS match join teams AS h ON match.id_home = h.id_team join teams AS a ON match.id_away = a.id_team join results using (id_match) where date_time > now() order by date_time DESC'
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        tekme: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//vse tekme
app.get("/api/v1/vml/posamezna/:id_match", async (req, res) => {
  try {
    const results = await db.query(
      'select date_time,id_match, h.id_team AS "domaciID",h.club AS "home", home AS "goli1", away AS "goli2", a.club AS "away", a.id_team AS "gostiID" from matches AS match join teams AS h ON match.id_home = h.id_team join teams AS a ON match.id_away = a.id_team join results using (id_match) where id_match=$1',
      [req.params.id_match]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        tekme: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//vse tekme
app.get("/api/v1/vml/tekmedefault", async (req, res) => {
  try {
    const results = await db.query(
      'select date_time,id_match, id_home,  h.club AS "home", a.club AS "away", id_away from matches AS match join teams AS h ON match.id_home = h.id_team join teams AS a ON match.id_away = a.id_team order by date_time DESC'
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        tekme: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//Lestvica
app.get("/api/v1/vml/lestvica", async (req, res) => {
  try {
    const results = await db.query(
      "select row_number() over (order by (3 * count(*) filter (where is_home and r.home > r.away or not is_home and r.away > r.home) +    count(*) filter (where r.home = r.away)    ) desc) as place, t.club as team_name,   		t.id_team as id_team,       count(*) as total_number_of_matches,       count(*) filter (where is_home and r.home > r.away or not is_home and r.away > r.home) as matches_won,       count(*) filter (where r.home = r.away) as matches_draw,       count(*) filter (where is_home and r.home < r.away or not is_home and r.away < r.home) as matches_lost,       coalesce(sum(r.home) filter (where is_home), 0) + coalesce(sum(r.away) filter (where not is_home), 0) as total_goals_scored,       coalesce(sum(r.away) filter (where is_home), 0) + coalesce(sum(r.home) filter (where not is_home), 0) as total_goals_conceded,       coalesce(sum(r.home - r.away) filter (where is_home), 0) + coalesce(sum(r.away - r.home) filter (where not is_home), 0) as goal_difference,   (3 * count(*) filter (where is_home and r.home > r.away or not is_home and r.away > r.home) +    count(*) filter (where r.home = r.away)    ) as points from public.matches m cross join lateral      (values (m.id_home, true), (m.id_away, false)     ) v(id_team, is_home) join      public.teams t     on t.id_team = v.id_team join      public.results r      on m.id_match = r.id_match group by t.club, t.id_team;"
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        lestvica: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//dodaj ekipo POST
app.post("/api/v1/vml/mostvo", validateToken, async (req, res) => {
  try {
    const results = await db.query(
      "insert into teams (club, shorthand) VALUES ($1, $2) returning *",
      [req.body.club, req.body.shorthand]
    );
    res.status(201).json({
      status: "success",
      data: {
        mostvo: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//posodobi ekipo
app.put("/api/v1/vml/mostvo/:id", validateToken, async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE teams SET club = $1, shorthand = $2 WHERE id_team = $3 returning *",
      [req.body.club, req.body.shorthand, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        team: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
  console.log(req.params.id);
  console.log(req.body);
});
//zbriši ekipo DELETE
app.delete("/api/v1/vml/mostvo/:id", validateToken, async (req, res) => {
  try {
    const results = await db.query("DELETE FROM teams where id_team = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.json({ error: err });
  }
});
//Zbriši igralca
app.delete(
  "/api/v1/vml/mostvo/:id_team/:id_igralec",
  validateToken,
  async (req, res) => {
    try {
      const results = await db.query(
        "DELETE FROM players where id_team = $1 and id_player=$2",
        [req.params.id_team, req.params.id_igralec]
      );

      res.status(204).json({
        statusText: "success",
      });
    } catch (err) {
      res.json({ error: err });
    }
  }
);

//zbriši ekipo
app.delete("/api/v1/vml/tekme/:id_match", validateToken, async (req, res) => {
  try {
    const results = await db.query("DELETE FROM matches where id_match = $1", [
      req.params.id_match,
    ]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//zbriši ekipo
app.delete(
  "/api/v1/vml/rezultat/:id_match",
  validateToken,
  async (req, res) => {
    try {
      const results = await db.query(
        "DELETE FROM results where id_match = $1",
        [req.params.id_match]
      );
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      res.json({ error: err });
    }
  }
);

//dodaj igralca
app.post("/api/v1/vml/igralec", validateToken, async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "insert into players (id_team, first_name, last_name, kit) VALUES ($1, $2, $3, $4) returning *",
      [req.body.id_team, req.body.first_name, req.body.last_name, req.body.kit]
    );
    res.status(201).json({
      status: "success",
      data: {
        igralec: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//Dodaj tekmo
app.post("/api/v1/vml/tekma", validateToken, async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "insert into matches (id_home, id_away, date_time) VALUES ($1, $2, $3) returning *",
      [req.body.id_home, req.body.id_away, req.body.date_time]
    );
    res.status(201).json({
      status: "success",
      data: {
        tekma: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//uredi rezultate
app.put("/api/v1/vml/rezultat/:id_match", validateToken, async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "UPDATE results set home = $1, away = $2 where id_match = $3 returning *",
      [req.body.home, req.body.away, req.params.id_match]
    );
    res.status(201).json({
      status: "success",
      data: {
        rezultat: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//uredi rezultate
app.post("/api/v1/vml/rezultat", validateToken, async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "insert into results (id_match) VALUES ($1) returning *",
      [req.body.id_match]
    );
    res.status(201).json({
      status: "success",
      data: {
        rezultat: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//uredi gole
app.post("/api/v1/vml/gol", validateToken, async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "insert into scores (id_match, id_team, id_player, goals, assists) VALUES ($1, $2, $3, $4, $5) returning *",
      [
        req.body.id_match,
        req.body.id_team,
        req.body.id_player,
        req.body.goals,
        req.body.assists,
      ]
    );
    res.status(201).json({
      status: "success",
      data: {
        rezultat: results.rows[0],
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//Posodobi Ekipo
//Posodobi Igralca
app.put(
  "/api/v1/vml/mostvo/:id_team/:id_player",
  validateToken,
  async (req, res) => {
    try {
      const results = await db.query(
        "UPDATE players SET first_name = $1, last_name = $2, kit = $3 WHERE id_team = $4 and id_player = $5 returning *",
        [
          req.body.first_name,
          req.body.last_name,
          req.body.kit,
          req.params.id_team,
          req.params.id_player,
        ]
      );
      res.status(200).json({
        status: "success",
        data: {
          igralec: results.rows[0],
        },
      });
    } catch (err) {
      res.json({ error: err });
    }
  }
);

//strelci in asistenti na tekmi
app.get("/api/v1/vml/tekme/goli/:id_match", async (req, res) => {
  try {
    const results = await db.query(
      "select id_score,first_name, last_name, club, goals, assists from scores natural join matches natural join teams natural join players where id_match = $1",
      [req.params.id_match]
    );

    console.log(results.rows);
    res.status(200).json({
      status: "success",
      data: {
        players: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

//Ibriši gole in asistence
app.delete(
  "/api/v1/vml/tekme/goli/:id_match/:id_score",
  validateToken,
  async (req, res) => {
    try {
      const results = await db.query(
        "DELETE FROM scores WHERE id_match = $1 AND id_score = $2",
        [req.params.id_match, req.params.id_score]
      );
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      res.json({ error: err });
    }
  }
);

//Posodobi Tekmo
//Posodobi Rezultat
//Posodobi Gole

//Prifobi statistiko
app.get("/api/v1/vml/statistika/tekme", async (req, res) => {
  try {
    const results = await db.query(
      "select count (*) as stevilo_tekem from matches"
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        numberofmatches: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

app.get("/api/v1/vml/statistika/ekipe", async (req, res) => {
  try {
    const results = await db.query(
      "select count (*) as stevilo_ekip from teams"
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        numberofteams: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

app.get("/api/v1/vml/statistika/igralci", async (req, res) => {
  try {
    const results = await db.query(
      "select count (*) as stevilo_igralcev from players"
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        numberofplayers: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

app.get("/api/v1/vml/statistika/goli", async (req, res) => {
  try {
    const results = await db.query(
      "select sum(goals) as golov, sum(assists) as asistenc from scores"
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        numberofgoalsandassists: results.rows,
      },
    });
  } catch (err) {
    res.json({ error: err });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server deluje in deluje na portu ${port}`);
});
