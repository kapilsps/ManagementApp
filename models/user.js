'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {through: models.Role_User, foreignKey:'user_id'});
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      set(value) {
        value = value.trim();
        this.setDataValue('name', value.toLowerCase());
      }
    },
    email: {
      type:DataTypes.STRING,
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};