'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PasswordResetToken extends Model {
    static associate(models) {
      PasswordResetToken.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  PasswordResetToken.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    token: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'password_reset_tokens',
    modelName: 'PasswordResetToken',
  });

  return PasswordResetToken;
};
