import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'calendars',
    modelName: 'Calendar',
    timestamps: true
})
export default class Calendar extends Model {
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
    declare start: Date;

    @Column({
        type: DataTypes.DATE,
    })
    declare end: Date;

    @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
    @Column({
        type: DataTypes.UUID,
        allowNull: false
    })
    declare user_id: String;

    @CreatedAt
    declare created_at?: Date;
}