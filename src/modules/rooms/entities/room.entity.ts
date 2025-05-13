import { BaseDatabase } from '@/common/database/BaseDatabase';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Room extends BaseDatabase {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column()
    image: string;
    @Column()
    status: string;
}
