import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'clients',
    modelName: 'Client',
    timestamps: true
})
export default class Client extends Model {
    @Column({
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataTypes.STRING,
    })
    declare name: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare occupation: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare status: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare location: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare email: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare phone_number: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare company: String;

    @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
    @Column({
        type: DataTypes.UUID,
        allowNull: false
    })
    declare user_id: String;

    @CreatedAt
    declare created_at?: Date;
}