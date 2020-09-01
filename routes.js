const express = require('express')
const routes = express.Router()
const recipes = require('./recipes')

routes.get('/', function (req, res) {
  return res.render('page-client/home', { recipes })
})

routes.get('/about', function (req, res) {
  return res.render('page-client/about')
})

routes.get('/recipes/:id', function (req, res) {
  const recipeId = req.params.id

  const recipe = recipes.find((e) => e.id == recipeId)

  return res.render('page-client/recipe', { recipe })
})

routes.get('/admin/recipes', recipes.index) // Mostrar a lista de receitas - Ok

routes.get('/admin/recipes/:id', recipes.show) // Exibir detalhes de uma receita - Ok

routes.get('/admin/recipes/:id/edit', recipes.edit) // Mostrar formulário de edição de receita

routes.get('/admin/recipes/create', recipes.create) // Mostrar formulário de nova receita

routes.post('/admin/recipes', recipes.post) // Cadastrar nova receita - Ok

routes.put('/admin/recipes', recipes.put) // Editar uma receita

routes.delete('/admin/recipes', recipes.delete) // Deletar uma receita

module.exports = routes
