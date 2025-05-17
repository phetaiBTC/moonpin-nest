import { Hotel } from "@/modules/hotels/entities/hotel.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
export enum status{
    visible='visible',
    hidden ='hidden'
}
@Entity()
export class Review {
@PrimaryGeneratedColumn()
id:number
@Column()
rating:number
@Column()
comments:string
@Column({type:'enum',enum:status,default:status.visible})
status:status
@ManyToOne(()=>Hotel,(hotel)=> hotel.review)
hotels:Hotel
@ManyToOne(()=> User,(users)=>users.review)
users:User
}
