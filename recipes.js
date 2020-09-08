const fs = require('fs')
const data = require('./data.json')

// Rotas Usuário

exports.home = function (req, res) {
  return res.render('page-client/home', { recipes: data.recipes })
}

exports.about = function (req, res) {
  return res.render('page-client/about')
}

exports.recipes = function (req, res) {

  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return recipe.id == id
  })

  if (!foundRecipe) {
    return res.send("Receita não encontrada")
  }

  const recipe = {
    ...foundRecipe,
    ingredients: foundRecipe.ingredients.toString().split(','),
    preparations: foundRecipe.preparations.toString().split(',')
  }

  return res.render('page-client/recipe', { recipe })
}


// Rotas Administrativas

exports.index = function (req, res) {
  return res.render('page-admin/listing', { recipes: data.recipes })
}

exports.create = function (req, res) {
  return res.render('page-admin/create', { recipes: data.recipes.values })
}

exports.show = function (req, res) {
  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return recipe.id == id
  })
  if (!foundRecipe) {
    return res.send('Receita não encontrada')
  }

  const recipe = {
    ...foundRecipe,
    ingredients: foundRecipe.ingredients.toString().split(','),
    preparations: foundRecipe.preparations.toString().split(',')
  }

  return res.render('page-admin/detail', { recipe })
}

exports.edit = function (req, res) {
  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return recipe.id == id
  })
  if (!foundRecipe) {
    return res.send('Receita não encontrada')
  }

  const recipe = {
    ...foundRecipe,
    ingredients: foundRecipe.ingredients.toString().split(','),
    preparations: foundRecipe.preparations.toString().split(',')
  }

  return res.render("page-admin/edit", { recipe })
}

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

exports.put = function (req, res) {

  const { id } = req.body

  let index = 0

  const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    if (id == recipe.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundRecipe) {
    return res.send("Receita não encontrada")
  }

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(id)
  }

  data.recipes[index] = recipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.delete = function (req, res) {
  const { id } = req.body

  const filteredRecipes = data.recipes.filter(function (recipe) {
    return recipe.id != id
  })

  data.recipes = filteredRecipes

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }

    return res.redirect('/admin/recipes')
  })
}
