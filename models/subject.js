'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: {
    	type: DataTypes.STRING,
    	unique: {
    		args: true,
    		msg: 'Subject Name already used!'
    	},
    	validate: {
    		notEmpty: {
    			args: true,
    			msg: 'Please fill this field!'
    		}
    	}
    }
  });

  Subject.associate = function(model){
    Subject.hasMany(model.Teacher, {foreignKey: 'subjectID'})
    Subject.hasMany(model.StudentSubject, {foreignKey: 'subjectID'})
    Subject.belongsToMany(model.Student, {through: 'StudentSubject', foreignKey: 'subjectID'})
  }

  return Subject;
};