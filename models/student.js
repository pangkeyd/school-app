'use strict';

const fullName = require('../helpers/students/fullname')

module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input your First Name!'
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
    	type: DataTypes.STRING,
    	unique: {
    		args: true,
    		msg: 'Email already used!'
    	},
    	validate: {
    		isEmail: {
    			args: true,
    			msg: 'Please insert your valid email address!'
    		}
    	}
    }
  });

  Student.associate = function(model){
    Student.hasMany(model.StudentSubject, {foreignKey: 'studentID'})
    Student.belongsToMany(model.Subject, {through: 'StudentSubject', foreignKey: 'studentID'})
  }

  Student.prototype.getFullName = function(){
    return fullName(this.first_name, this.last_name)
  }

  return Student;
};