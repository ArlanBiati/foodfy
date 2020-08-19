const express = require("express")
const nunjucks = require("nunjucks")

const recipes = require("./data")

const server = express()

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})

server.get("/", function(req, res) {
    return res.render("home", { recipes })
})

server.get("/about", function(req, res) {
    return res.render("about")
})


server.get("/recipe/:id", function(req, res) {

    return res.render("recipe", { recipe: recipes.id })
})

server.listen(5000, function() {
    console.log("Server is running")
})