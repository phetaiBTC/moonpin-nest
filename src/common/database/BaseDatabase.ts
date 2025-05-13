import { CreateDateColumn, UpdateDateColumn, } from 'typeorm';
export class BaseDatabase {
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}