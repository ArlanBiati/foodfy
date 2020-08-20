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


server.get("/recipes/:id", function(req, res) {

    const recipeId = req.params.id

    const recipe = recipes.find(e => e.id == recipeId )

    return res.render("recipe", { recipe })

    //http://localhost:5000/recipes/Triplo bacon burger

})

server.listen(5000, function() {
    console.log("Server is running")
})