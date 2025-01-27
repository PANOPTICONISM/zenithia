import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import Client from './Client';
import User from './User';

@Table({
    tableName: 'projects',
    modelName: 'Project',
    timestamps: true
})
export default class Project extends Model {
    @Column({
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataTypes.STRING,
    })
    declare title: String;

    @Column({
        type: DataTypes.DATE,
    })
    declare start_date: Date;

    @Column({
        type: DataTypes.DATE,
    })
    declare finish_date: Date;

    @Column({
        type: DataTypes.STRING,
    })
    declare status: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare revenue: String;

    @Column({
        type: DataTypes.INTEGER,
    })
    declare base_price: number;

    @Column({
        type: DataTypes.STRING,
    })
    declare currency: String;

    @BelongsTo(() => Client, { foreignKey: 'client_id', as: 'client' })
    @Column({
        type: DataTypes.UUID,
    })
    declare client_id: string;

    @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
    @Column({
        type: DataTypes.UUID,
    })
    declare user_id: string;

    @CreatedAt
    declare created_at?: Date;
}