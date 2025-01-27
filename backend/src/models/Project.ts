import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

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

    @Column({
        type: DataTypes.STRING,
    })
    declare client_id: String;

    @Column({
        type: DataTypes.STRING,
    })
    declare user_id: String;

    @CreatedAt
    declare created_at?: Date;
}