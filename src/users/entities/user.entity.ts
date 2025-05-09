import { District } from "@/district/entities/district.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    phone: string;
    @Column()
    isVerified: boolean;
    @ManyToOne(() => District, (district) => district.users)
    district: District
}
