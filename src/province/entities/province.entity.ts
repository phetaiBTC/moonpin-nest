import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { District } from '@/district/entities/district.entity';
@Entity()
export class Province {
    @PrimaryGeneratedColumn()
    pr_id: number;
    @Column()
    pr_name: string;
    @Column()
    pr_name_en: string;
    @OneToMany(() => District, (district) => district.province)
    districts: District[]
}
