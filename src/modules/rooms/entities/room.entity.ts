import { BaseDatabase } from '@/common/database/BaseDatabase';
import { Hotel } from '@/modules/hotels/entities/hotel.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    @Column()
    status: string;
    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel
    @Column()
    bedroom: number
    @Column()
    bathroom: number
    @Column()
    kitchen: number
}
