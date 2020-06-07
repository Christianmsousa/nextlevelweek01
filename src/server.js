const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta bublica

server.use(express.static("public") )


//utilizando template engine

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Rotas

server.get("/", (req, res) => {
  return res.render("index.html")
  // res.send("Cheguei aqui")
  
})


server.get("/create-point", (req, res) =>{

  // req.query: Query Strings da nossa url
  // console.log(req.query)

  return res.render("create-point.html")
})

server.post('/savepoint', (req,res) => {
  // req.body: o corpo do nosso formulário
  // console.log(req.body)

  // inserir dados no banco de daos

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]
  function afterInsertData(err) {
    if(err) {
      console.log(err)
      return res.send("Erro no cadastro!")
    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true})
  }

  db.run(query, values, afterInsertData)

})



server.get("/search", (req, res) => {

  const search = req.query.search
  if(search == "") {
    //pesquisa vazia

    return res.render("search-results.html", { total: 0})
  }

  // pegar dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err) {
      return console.log(err)
    }

    const total = rows.length
    // console.log("Aqui estão seus registros: ")
    // console.log(rows)

    // mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total})
  })

})

//ligar o servidor

server.listen(3000);




// anotações extras

// res.sendfile(__dirname + "/views/index.html")