const fs = require('fs')
const data = require('./data.json')

exports.index = function (req, res) {
  return res.render('page-admin/listing', { recipes: data.recipes })
}

exports.create = function (req, res) {
  return res.render('page-admin/create', { recipes: data.recipes.values })
  // erro de direcionamento
}

exports.show = function (req, res) {
  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return recipe.id == id
  })
  if (!foundRecipe) {
    return res.send('Receita não encontrada')
  }

  return res.render('page-admin/detail', { recipe: foundRecipe })
}

exports.edit = function (req, res) {}

exports.post = function (req, res) {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Por favor, preencha todos os campos.')
    }
  }

  let { image, title, ingredients, preparations, information } = req.body

  const id = Number(data.recipes.length + 1)

  data.recipes.push({
    id,
    image,
    title,
    ingredients,
    preparations,
    information,
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send('Erro de escrita do arquivo')
    }
    return res.redirect('/admin/recipes')
  })
}

exports.put = function (req, res) {}

exports.delete = function (req, res) {}
