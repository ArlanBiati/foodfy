const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  async home(req, res) {
    let results = await Recipe.all()
    const recipes = results.rows

    return res.render('page-client/home', { recipes })
  },

  about(req, res) {
    return res.render('page-client/about')
  },

  async chefs(req, res) {
    let results = await Chef.all()
    const chefs = results.rows
    return res.render('page-client/chefs', { chefs })
  },

  async recipes(req, res) {
    let results = await Recipe.all()
    const recipes = results.rows

    return res.render('page-client/recipes', { recipes })
  },

  async search(req, res) {
    const { filter } = req.query

    if (filter) {
      let results = await Recipe.findBy(filter)
      const recipes = results.rows
      return res.render('page-client/search', { recipes, filter })

    } else {
      let results = await Recipe.all()
      const recipes = results.rows
      return res.render('page-client/search', { recipes })
    }
  },

  async recipe(req, res) {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) {
      return res.send('Receita não encontrada')
    }
    return res.render('page-client/recipe', { recipe })
  }
}
