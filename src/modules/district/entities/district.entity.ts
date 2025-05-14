import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Province } from "@/modules/province/entities/province.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Hotel } from "@/modules/hotels/entities/hotel.entity";
@Entity()
export class District {
    @PrimaryGeneratedColumn()
    dr_id: number;
    @Column()
    dr_name: string;
    @Column()
    dr_name_en: string;
    @ManyToOne(() => Province, (province) => province.districts)
    province: Province
    @OneToMany(() => User, (user) => user.district)
    users: User[]
    @OneToMany(() => Hotel, (hotel) => hotel.district)
    hotels: Hotel[]
}
