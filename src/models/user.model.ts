import { DataTypes } from "sequelize";
import { AfterCreate, BeforeBulkCreate, BeforeCreate, BeforeUpdate, Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";
import { UserAttributes } from "../interfaces/model/user.interface";
import bcrypt from "bcrypt";

@Table({
    timestamps: true,
    paranoid: true,
    tableName: "users",
    indexes: [],
})
export default class User extends Model<UserAttributes> implements UserAttributes {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    first_name: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    last_name: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: true,
    })
    email: string;

    @Column({
        type: DataTypes.STRING,
    })
    password: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }

    @BeforeBulkCreate
    static async hashBulkPasswords(instances: User[]) {
        for (const instance of instances) {
            if (instance.password) {
                instance.password = await bcrypt.hash(instance.password, 10);
            }
        }
    }

    @AfterCreate
    static async removePassword(user: User) {
        if (user) {
            console.log('user: ', user);
            delete user.password;
            delete user.created_at;
            delete user.updated_at;
            delete user.deleted_at;
            return user
        }
    }
}
