'use strict';

const helper = require('../helpers/teachers/fullname')

module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: {
    			args: true,
    			msg: 'Please input your First Name!'
    		}
    	}
    },
    last_name: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: {
    			args: true,
    			msg: 'Please input your Last Name!'
    		}
    	}
    },
    email: {
    	type: DataTypes.STRING,
    	unique: {
    		args: true,
    		msg: 'Email already used!'
    	},
    	validate: {
    		isEmail: {
    			args: true,
    			msg: 'Please input your valid Email Address!'
    		},
    		notEmpty: {
    			args: true,
    			msg: 'Please input your Email Address!'
    		}
    	}
    },
    subjectID: DataTypes.INTEGER
  });

  Teacher.associate = function(model){
  	Teacher.belongsTo(model.Subject, {foreignKey: 'subjectID'})
  }

  Teacher.prototype.fullName = function(){
  	return helper(this.first_name, this.last_name)
  }

  return Teacher;
};