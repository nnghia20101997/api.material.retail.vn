import { extend } from "lodash";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "materials"
})

export class Material extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "" })
    code: string;

    @Column({ default: "" })
    name: string;

    @Column({ default: "" })
    prefix_name: string;

    @Column({ default: "" })
    normaliza_name: string;

    @Column({ default: 0 })
    user_id: number;

    @Column({ default: "" })
    avatar: string;

    @Column({ default: "" })
    avatar_thumb: string;

    @Column({ default: 0 })
    category_id: number;

    @Column({ default: 0 })
    unit_id: number;

    @Column({ default: 0 })
    wastage_rate: number;

    @Column({ default: 0 })
    out_stock_alert_quantity: number;

    @Column({ default: 0 })
    retail_price: number;

    @Column({ default: 0 })
    cost_price: number;

    @Column({ default: 0 })
    status: number;

    @CreateDateColumn()
    updated_at: Date;

    @UpdateDateColumn()
    created_at: Date;

}