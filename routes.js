const express = require('express')
const routes = express.Router()
const recipes = require('./recipes')
const chefs = require('./chefs')

// USER

routes.get('/', recipes.home) // Mostrar home do usuario - Ok
routes.get('/about', recipes.about) // Mostrar página de informações do site - Ok
routes.get('/recipes/:id', recipes.recipes) // Exibir detalhes de uma receita - Ok

// ADMIM RECIPES

routes.get('/admin/recipes', recipes.index) // Mostrar a lista de receitas - Ok
routes.get('/admin/recipes/create', recipes.create) // Mostrar formulário de nova receita - Ok
routes.get('/admin/recipes/:id', recipes.show) // Exibir detalhes de uma receita - Ok
routes.get('/admin/recipes/:id/edit', recipes.edit) // Mostrar formulário de edição de receita - Ok
routes.post('/admin/recipes', recipes.post) // Cadastrar nova receita - Ok
routes.put('/admin/recipes', recipes.put) // Editar uma receita - Ok
routes.delete('/admin/recipes', recipes.delete) // Deletar uma receita - Ok

// ADMIN CHEFS

routes.get('/admin/chefs', chefs.index) // Mostrar a lista de chefes - Ok
routes.get('/admin/chefs/create', chefs.create) // Mostrar formulário de novo chefe - Ok
routes.get('/admin/chefs/:id', chefs.show) // Exibir detalhes de um chefe - Ok
routes.get('/admin/chefs/:id/edit', chefs.edit) // Mostrar formulário de edição de chefes - Ok
routes.post('/admin/chefs', chefs.post) // Cadastrar novo chefes - Ok
routes.put('/admin/chefs', chefs.put) // Editar um chefe - Ok
routes.delete('/admin/chefs', chefs.delete) // Deletar um chefe - Ok

module.exports = routes
