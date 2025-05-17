import { BaseDatabase } from "@/common/database/BaseDatabase";
import { District } from "@/modules/district/entities/district.entity";
import { Review } from "@/modules/reviews/entities/review.entity";
import { Room } from "@/modules/rooms/entities/room.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel extends BaseDatabase {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    rating: number
    @Column()
    image: string
    @Column()
    latitude: number
    @Column()
    longitude: number
    @ManyToOne(() => District, (district) => district.users, { nullable: false })
    district: District;
    @OneToMany(() => User, (user) => user.hotels)
    users: User[];
    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[]
    // @OneToMany(()=>Review,(review)=>review.hotel)
    // reviews: Review[]
}
