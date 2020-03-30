'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DisqueraSchema extends Schema {
  up () {
    this.create('disqueras', (table) => {
      table.increments()
      table.string('nombre').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('disqueras')
  }
}

module.exports = DisqueraSchema
