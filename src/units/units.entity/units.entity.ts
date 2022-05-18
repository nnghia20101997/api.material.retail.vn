import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "units"
})

export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "" })
    name: string;

    @Column({ default: 0 })
    user_id: number;

    @Column({ default: "" })
    description: string;

    @Column({ default: 0 })
    status: number;

    @CreateDateColumn()
    updated_at: Date;

    @UpdateDateColumn()
    created_at: Date;
}