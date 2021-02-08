'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role_User.belongsTo(models.Role, {foreignKey: 'role_id', targetKey:'id'});
      Role_User.belongsTo(models.User, {foreignKey: 'user_id', targetKey:'id'});
    }
  };
  Role_User.init({
    role_id: {
      type:DataTypes.BIGINT(20).UNSIGNED,
      allowNull:false,
      references:{
        model:'roles',
        key:'id'
      }
    },
    user_id: {
      type:DataTypes.BIGINT(20).UNSIGNED,
      allowNull:false,
      references:{
        model:'users',
        key:'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }
  }, {
    sequelize,
    modelName: 'Role_User',
  });
  return Role_User;
};