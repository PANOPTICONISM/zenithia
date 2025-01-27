import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Timetracker',
    modelName: 'timetracker',
    timestamps: true
})
export default class TimeTracker extends Model {
    @Column({
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataTypes.DATE,
    })
    declare date: Date;

    @Column({
        type: DataTypes.STRING,
    })
    declare total: String;

    @Column({
        type: DataTypes.DATE,
    })
    declare start_time: Date;

    @Column({
        type: DataTypes.DATE,
    })
    declare finish_time: Date;

    @Column({
        type: DataTypes.UUID,
        allowNull: false
    })
    declare user_id: String;

    @Column({
        type: DataTypes.UUID,
    })
    declare project_id: String;

    @CreatedAt
    declare created_at?: Date;
}