import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Province } from "@/province/entities/province.entity";
import { User } from "@/users/entities/user.entity";
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
    @OneToMany (()=>User,(user)=>user.district)
    users:User[]
}
