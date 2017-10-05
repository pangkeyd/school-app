'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = function(model){
    
  }

  return Subject;
};