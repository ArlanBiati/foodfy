const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const recipes = require("./data")

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
server.get("/recipes", function(req, res) {
    return res.render("recipes", { recipes })
})

server.listen(5000, function() {
    console.log("Server is running")
})