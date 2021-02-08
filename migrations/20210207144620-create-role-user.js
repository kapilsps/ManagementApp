'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Role_Users', {
      role_id: {
        allowNull:false,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        references:{
          model:{
            tableName: 'roles'
          },
          key:'id'
        }
      },
      user_id: {
        allowNull:false,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        references:{
          model:{
            tableName: 'users'
          },
          key:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Role_Users');
  }
};