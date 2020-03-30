'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TemaSchema extends Schema {
  up () {
    this.create('temas', (table) => {
      table.increments()
      table.string('titulo').notNullable()
      table.integer('year').notNullable()
      table.integer('idioma_id').unsigned().references('id').inTable('idiomas');
      table.integer('artista_id').unsigned().references('id').inTable('artistas');
      table.integer('genero_id').unsigned().references('id').inTable('generos');
      table.timestamps()
    })
  }

  down () {
    this.drop('temas')
  }
}

module.exports = TemaSchema
