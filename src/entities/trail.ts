import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enigme } from "./enigme";

@Entity()
export class Trail {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Enigme, enigme => enigme.trail)
    enigmes: Enigme[]
}