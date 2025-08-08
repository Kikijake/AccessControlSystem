'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Module, { foreignKey: 'ModuleId' });
      this.belongsToMany(models.Role, { through: "RolePermissions" });
    }
  }
  Permission.init({
    action: DataTypes.STRING,
    ModuleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};