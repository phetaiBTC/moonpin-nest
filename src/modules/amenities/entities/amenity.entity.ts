import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Amenity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
}
