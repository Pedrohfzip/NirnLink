'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.RefreshToken, {
        foreignKey: 'user_id',
        as: 'refreshTokens'
      });
      User.hasMany(models.PasswordResetToken, {
        foreignKey: 'user_id',
        as: 'passwordResetTokens'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};