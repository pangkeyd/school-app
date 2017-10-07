function describeScore(score){

	if(score > 85){
		return 'A'
	}else if(score > 70){
		return 'B'
	}else if(score > 55){
		return 'C'
	}else if(score <= 55){
		return 'E'
	}else{
		return 'Tidak ada nilai!'
	}

	// console.log('kiw')

}

module.exports = describeScore