import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Project from "./Project";
import User from "./User";

@Table({
  tableName: "time_tracker",
  modelName: "time_tracker",
  timestamps: true,
})
export default class TimeTracker extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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

  @BelongsTo(() => User, { foreignKey: "user_id", as: "user" })
  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare user_id: String;

  @BelongsTo(() => Project, { foreignKey: "project_id", as: "project" })
  @ForeignKey(() => Project)
  @Column({
    type: DataTypes.UUID,
  })
  declare project_id: String;

  @CreatedAt
  declare created_at?: Date;
}
