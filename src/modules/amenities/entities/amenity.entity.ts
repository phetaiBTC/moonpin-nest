import { BaseDatabase } from "@/common/database/BaseDatabase";
import { Hotel } from "@/modules/hotels/entities/hotel.entity";
import { Room } from "@/modules/rooms/entities/room.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
@Entity()
export class Amenity extends BaseDatabase {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => Room, (room) => room.amenities)
    rooms: Room[]
    @ManyToOne(() => Hotel, (hotel) => hotel.amenities)
    hotel: Hotel; // ชื่อควรเป็นเอกพจน์และเป็น object ไม่ใช่ array

}
