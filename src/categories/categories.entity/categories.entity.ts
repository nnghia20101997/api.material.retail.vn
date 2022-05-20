import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "categories"
})

export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    user_id: number;

    @Column({ default: "" })
    code: string;

    @Column({ default: "" })
    name: string;

    @Column({ default: "" })
    prefix_name: string;

    @Column({ default: "" })
    normalize_name: string;

    @Column({ default: "" })
    description: string;

    @Column({ default: 0 })
    sort: number;

    @Column({ default: 0 })
    status: boolean;

    @CreateDateColumn()
    updated_at: Date;

    @UpdateDateColumn()
    created_at: Date;

}