import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    rating: number
    @Column()
    image: string
    @Column()
    latitude: number
    @Column()
    longitude: number
}
