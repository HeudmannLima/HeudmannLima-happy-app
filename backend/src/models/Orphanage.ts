import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({type: 'real'})
  latitude: string;

  @Column({type: 'real'})
  longitude: string;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  // ONE TO MANY - Um orfanato para MUITAS imagens
  // @OneToMany(
  //  1. (func q retorna o TIPO (Image) da outra TAB 'images'), 
  //  2.  e relaciona com o CAMPO que vai RECEBER/LINKAR os dados pra lá (orphanage_id),
  //  3. cascade [insert (ao cadastrar orf), update (atualizar orf)] atualiza nas 2 colunas
  //     ou seja, sempre mantem o relacionamento atualizado dos 2 lados. 
  @OneToMany(() => Image, field => field.orphanage_id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' }) // campo da OUTRA tab q faz o relacionamento
  images: Image[]; // images são muitas por isso Array[], UM ORF p/ MUITAS Imagens
}


