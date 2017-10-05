'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
    	type: DataTypes.STRING,
    	unique: {
    		args: true,
    		msg: 'Email already used!',
    		fields: [sequelize.fn('lower', sequelize.col('email'))]
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
    
  }

  Student.prototype.getFullName = function(){
  	let fN = this.first_name + ' ' + this.last_name
  	return fN
  }

  return Student;
};