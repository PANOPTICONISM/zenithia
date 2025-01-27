import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'tasks',
    modelName: 'Task',
    timestamps: true
})
export default class Task extends Model {
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
        type: DataTypes.STRING,
        allowNull: false
    })
    declare importance: String;

    @Column({
        type: DataTypes.DATE,
    })
    declare deadline: Date;

    @Column({
        type: DataTypes.UUID,
        allowNull: false
    })
    declare user_id: String;

    @Column({
        type: DataTypes.UUID,
    })
    declare project_id: String;
    @Column({
        type: DataTypes.STRING,
    })
    declare table_id: String;

    @CreatedAt
    declare created_at?: Date;
}