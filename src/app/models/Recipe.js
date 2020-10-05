const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all() {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes 
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY title ASC
      `)
  },

  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparations,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      date(Date.now()).iso
    ]

    return db.query(query, values)
  },

  find(id) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes 
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1
      `, [id])
  },

  findBy(filter) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes 
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'
      `)
  },

  showRecipes(id) {
    return db.query(`
      SELECT image, title, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.chef_id = $1
    `, [id])
  },

  update(data) {
    const query = `
      UPDATE recipes SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparations=($4),
        information=($5),
        chef_id=($6)
      WHERE id = $7
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparations,
      data.information,
      data.chef,
      data.id
    ]

    return db.query(query, values)
  },

  delete(id) {
    return db.query(`
      DELETE 
      FROM recipes 
      WHERE id = $1
      `, [id])
  },

  chefsSelectOptions() {
    return db.query(`
      SELECT name, id 
      FROM chefs
      `)
  }
}