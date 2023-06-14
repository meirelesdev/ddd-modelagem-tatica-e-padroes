import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare points: number;

  @Column({ allowNull: true })
  declare street?: string;

  @Column({ allowNull: true })
  declare number?: string;

  @Column({ allowNull: true })
  declare city?: string;

  @Column({ allowNull: true })
  declare zipcode?: string;

  @Column({ allowNull: true })
  declare state?: string;

  @Column({ allowNull: false, field: "created_at" })
  declare createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  declare updatedAt: Date;
}
