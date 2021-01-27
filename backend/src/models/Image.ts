import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  // MANY TO ONE - Muitas IMAGENS pra UM orfanato
  // @ManyToOne(
  //  1. (func q retorna o TIPO (Orphanage) da outra TAB 'orphanage'), 
  //  2.  e relaciona com o CAMPO que vai RECEBER/LINKAR os dados pra lá (images)
  @ManyToOne(() => Orphanage, field => field.images )
  @JoinColumn({ name:'orphanage_id' })
  orphanage_id: Orphanage; // orf é um só, MuitasIMAGENS pra UM orf
}


// Regra para RELACIONAMENTO NO TYPEORM
// faz- se o link nas 2 entidades.
//
// Não coloca aqui a chave estrangeira dessa tabela
// que é campo do relacionamento: 'orphanage_id', 
// faz-se o relacionamento como aqui e na outra tabela ('orphanages')