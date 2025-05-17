import { BaseDatabase } from "@/common/database/BaseDatabase";
import { District } from "@/modules/district/entities/district.entity";
import { Hotel } from "@/modules/hotels/entities/hotel.entity";
import { Review } from "@/modules/reviews/entities/review.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
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
    @Column({ unique: true })
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
    district: District;
    @ManyToOne(() => Hotel, (hotel) => hotel.users)
    hotels: Hotel
    @OneToMany(()=>Review,(review)=>review.users)
    review:Review[];
    
    // @ManyToOne(() => District, (district) => district.users, { nullable: false })
    // district: District;
}
