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
      // define association here
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
      }
    }
  }, {
    sequelize,
    modelName: 'Role_User',
  });
  return Role_User;
};