// CRIA TABELA ORPHANAGES

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1611673685034 implements MigrationInterface {

  // UP vai fazer a alteração/criação
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        // campo ID
        {
          name: 'id',
          type: 'integer',
          unsigned: true, //p ñ iniciar num neg, sempre c/ num positivo
          isPrimary: true, // essa coluna é minha chave primaria
          isGenerated: true, // essa coluna é gerada automaticamente
          generationStrategy: 'increment', // autoincrementa os ids
        },
        
        // campo NAME
        {
          name: 'name',
          type: 'varchar', // string
        },

        // campo LATITUDE
        {
          name: 'latitude',
          type: 'decimal', // float
          scale: 10, // qtd num DEPOIS da virgula ex.2 = 23.00
          precision: 12, // qtd TOTAL num (antes+depois da virg) ex.7 = 23.12321
        },

        // campo LONGITUDE
        {
          name: 'longitude',
          type: 'decimal', // float
          scale: 10, // aqui como queremos 10 dig DEPOIS da virgula e,
          precision: 12, // queremos 2 ANTES da virgula, fica (12, 10)
        },

        // campo ABOUT
        {
          name: 'about',
          type: 'text', // string com mt mais caracteres
        },

        // campo INSTRUCTIONS
        {
          name: 'instructions',
          type: 'text', // string com mt mais caracteres
        },

        // campo OPENING_HOURS
        {
          name: 'opening_hours',
          type: 'varchar', // string
        },

        // campo OPEN_ON_WEEKENDS
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        },
      ],
    }));
  }

  // DOWN vai DESFAZER a alteração do UP, remove o que up modificou
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }

}
