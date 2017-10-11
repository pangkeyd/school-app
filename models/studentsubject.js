'use strict';

const helper = require('../helpers/studentSubject/describeScore')

module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    studentID: DataTypes.INTEGER,
    subjectID: {
      type: DataTypes.INTEGER
    },
    score: DataTypes.INTEGER
  });

  StudentSubject.associate = function(model){
    StudentSubject.belongsTo(model.Student, {foreignKey: 'studentID'})
    StudentSubject.belongsTo(model.Subject, {foreignKey: 'subjectID'})
  }

  StudentSubject.prototype.getDesc = function() {
    return helper(this.score)
  };

  return StudentSubject;
};
