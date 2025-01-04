import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entities";
import { ApiProperty } from '@nestjs/swagger';
import { Rol } from "src/rol.enum";

@Entity({ name: "users" })
export class Users {
    @ApiProperty({ description: 'Unique identifier for the user', type: String })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Email of the user', type: String, uniqueItems: true })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    email: string;

    @ApiProperty({ description: 'Name of the user', type: String })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string;

    @ApiProperty({ description: 'Password of the user', type: String, required: false })
    @Column({
        type: "varchar",
        length: 120,
        nullable: true // Permitir que sea nulo para usuarios autenticados con Google
    })
    password: string;

    @ApiProperty({ description: 'Address of the user', type: String })
    @Column({
        type: "text",
        nullable: true,
    })
    address: string;

    @ApiProperty({ description: 'Phone number of the user', type: Number })
    @Column({
        type: "int"
    })
    phone: number;

    @ApiProperty({ description: 'Country of the user', type: String })
    @Column({
        length: 50,
        type: "varchar",
        nullable: true,
    })
    country: string;

    @ApiProperty({ description: 'City of the user', type: String })
    @Column({
        type: "varchar",
        length: 50,
        nullable: true,
    })
    city: string;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: false,
        default: Rol.User, 
    })
    @ApiProperty({ description: 'Role of the user', enum: Rol })
    role: Rol;

    @ApiProperty({ description: 'Google ID of the user', type: String, required: false })
    @Column({
        type: "varchar",
        nullable: true, // Solo para usuarios autenticados con Google
        unique: true
    })
    googleId: string;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: false,
        default: 'form',
      })


    @ApiProperty({ description: 'Orders associated with the user', type: () => [Orders] })
    @OneToMany(() => Orders, (orders) => orders.user)
    @JoinColumn({ name: 'order_id' })
    orders: Orders[];
}
