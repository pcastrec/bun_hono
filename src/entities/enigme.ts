import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Trail } from "./trail";

@Entity()
export class Enigme {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

    @Column("decimal")
    latitude: number

    @Column("decimal")
    longitude: number

    @Column()
    order: number

    @ManyToOne(() => Trail, trail => trail.enigmes, { onDelete: "CASCADE" })
    trail: Trail
}