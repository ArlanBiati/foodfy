const Recipe = require('../models/Recipe')

// Rotas Administrativas

module.exports = {
  async index(req, res) {
    let results = await Recipe.all()
    const recipes = results.rows

    return res.render('page-admin/recipes/listing', { recipes })
  },

  async create(req, res) {
    let results = await Recipe.chefsSelectOptions()
    const chefOptions = results.rows

    return res.render('page-admin/recipes/create', { chefOptions })
  },

  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.')
      }
    }

    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id

    return res.redirect(`/admin/recipes/${recipeId}`)
  },

  async show(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) {
      return res.send('Receita não encontrada')
    }

    return res.render('page-admin/recipes/detail', { recipe })
  },

  async edit(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) {
      return res.send('Receita não encontrada')
    }

    results = await Recipe.chefsSelectOptions()
    const chefOptions = results.rows

    return res.render('page-admin/recipes/edit', { recipe, chefOptions })
  },

  async put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos')
      }
    }

    await Recipe.update(req.body)

    return res.redirect(`/admin/recipes/${req.body.id}`)
  },

  async delete(req, res) {
    await Recipe.delete(req.body.id)

    return res.redirect('/admin/recipes')
  }
}
