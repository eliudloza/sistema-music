'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtistaSchema extends Schema {
  up () {
    this.create('artistas', (table) => {
      table.increments()
      table.string('nombre').notNullable()
      table.string('apellido_paterno').notNullable()
      table.string('apellido_materno').notNullable()
      table.integer('n_identificacion').notNullable()
      table.integer('nacionalidad_id').unsigned().references('id').inTable('nacionalidads');
      table.timestamps()
    })
  }

  down () {
    this.drop('artistas')
  }
}

module.exports = ArtistaSchema
