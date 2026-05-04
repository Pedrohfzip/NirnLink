'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  RefreshToken.init({
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
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'refresh_tokens',
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};