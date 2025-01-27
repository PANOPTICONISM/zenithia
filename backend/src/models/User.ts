import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
})
export default class User extends Model {
    @Column({
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare email: String;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare password: String;

    @CreatedAt
    declare created_at?: Date;
}