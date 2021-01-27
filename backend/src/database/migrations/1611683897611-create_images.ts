// CRIAR TABELA DE IMAGES
// ONDE VAI TER O RELACIONAMENTO DE ID DA TABELA IMAGES
// (orphanage_id) COM O ID (id) DA TABELA ORPHANAGES

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1611683897611 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
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
        // campo PATH
        {
          name: 'path',
          type: 'varchar',
        },
        // campo ID do orfanato. Pode ter varias IMG para um Organato
        // 1p/Muitos: 1 orf tem mts imagens | 1 imagem p/ apenas 1 orfanato
        // quando um orf tem varias imagens, precisamos armaz o ID do orf
        {
          name: 'orphanage_id',
          type: 'integer',
        },
      ],

      // RELACIONAMENTO: chave estrangeira
      foreignKeys: [
        {
          name: 'ImageOrphanage',
          // ImageOrphanage vai ser o RELACIONAMENTO 
          // entre a coluna 'orphanage_id' desta tabela (images)
          // com a coluna 'id' da tabela 'orphanages'. (ABAIXO)
          columnNames: ['orphanage_id'],
          referencedTableName: 'orphanages',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE', // se ID do orf muda, aqui os atualiza no relac.
          onDelete: 'CASCADE', // se ID/ORFANATO for excluido, remove tds imgs.
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
