import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import Project from './Project';
import User from './User';

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
    })
    declare importance: String;

    @Column({
        type: DataTypes.DATE,
    })
    declare deadline: Date;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare column_id: String;

    @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
    @ForeignKey(() => User)
    @Column({
        type: DataTypes.UUID,
        allowNull: false
    })
    declare user_id: String;

    @BelongsTo(() => Project, { foreignKey: 'project_id', as: 'project' })
    @ForeignKey(() => Project)
    @Column({
        type: DataTypes.UUID,
    })
    declare project_id: String;

    @CreatedAt
    declare created_at?: Date;
}