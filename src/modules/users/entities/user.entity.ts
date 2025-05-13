import { BaseDatabase } from "@/common/database/BaseDatabase";
import { District } from "@/modules/district/entities/district.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}
@Entity()
export class User extends BaseDatabase {
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
    @Column({ default: false })
    isVerified: boolean;
    @Column({ type: 'enum', enum: Gender })
    gender: Gender;
    @ManyToOne(() => District, (district) => district.users, { nullable: false })
    district: District
    // @ManyToOne(() => District, (district) => district.users, { nullable: false })
    // district: District;
}
