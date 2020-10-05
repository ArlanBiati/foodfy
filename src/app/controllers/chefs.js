const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
  async index(req, res) {
    let results = await Chef.all()
    const chefs = results.rows

    return res.render('page-admin/chefs/listing', { chefs })
  },

  create(req, res) {
    return res.render('page-admin/chefs/create')
  },

  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.')
      }
    }

    let results = await Chef.create(req.body.id)
    const chefId = results.rows[0]

    return res.redirect(`/admin/chefs/${chefId}`)
  },

  async show(req, res) {
    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]
    if (!chef) {
      return res.send('Chef não encontrada')
    }

    results = await Recipe.showRecipes(req.params.id)
    const recipes = results.rows

    return res.render('page-admin/chefs/detail', { chef, recipes })
  },

  async edit(req, res) {
    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]
    if (!chef) {
      return res.send('Receita não encontrada')
    }

    return res.render('page-admin/chefs/edit', { chef })
  },

  async put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos')
      }
    }

    await Chef.update(req.body)

    return res.redirect(`/admin/chefs/${req.body.id}`)
  },

  async delete(req, res) {

    await Chef.delete(req.body.id)

    return res.redirect('/admin/chefs')
  }
}
