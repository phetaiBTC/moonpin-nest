import { BaseDatabase } from '@/common/database/BaseDatabase';
import { Amenity } from '@/modules/amenities/entities/amenity.entity';
import { Hotel } from '@/modules/hotels/entities/hotel.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
export enum Status {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable'
}
@Entity()
export class Room extends BaseDatabase {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    room_number: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column()
    image: string;
    @Column({ type: 'enum', enum: Status , default: Status.AVAILABLE })
    status: Status;
    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel
    @Column()
    bedroom: number
    @Column()
    bathroom: number
    @Column()
    kitchen: number
    @ManyToMany(() => Amenity, (amenity) => amenity.rooms, { cascade: true })
    @JoinTable({name:"room_amenities"})
    amenities: Amenity[]
}
