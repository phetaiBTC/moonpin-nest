import { BaseDatabase } from '@/common/database/BaseDatabase';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Booking extends BaseDatabase {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    checkin: Date;
    @Column()
    checkout: Date;
    @Column()
    room_id: number;
    @Column()
    user_id: number;
    @Column()
    state: string;
    @Column()
    total_price: number;
    @Column()
    payment_status: string;

}
