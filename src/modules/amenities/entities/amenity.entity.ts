import { BaseDatabase } from "@/common/database/BaseDatabase";
import { Room } from "@/modules/rooms/entities/room.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class Amenity extends BaseDatabase {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => Room, (room) => room.amenities)
    rooms: Room[]
}
