
//Extract distinct values from an object by a key
export function distinctValues(object, key){

	var items = [];
	object.map((item, index) => {
		var value = item[key];
		if(!items.includes(value)){
			items  = [...items, value]
		}
	});

	return items;
}

export function utcToDate(utcString){
	if(utcString){
		var year = utcString.substring(0, 4);
		var month = utcString.substring(5, 7);
		var day = utcString.substring(8, 10);
		var dtStr = [day, month, year].join('.');
		return dtStr;
	}else{
		return null;
	}
}

//Get difference between two utc time strings in minutes
export function utcDuration(startStr, stopStr){

	//Start time in milliseconds
	var start = new Date(startStr);
	var startMs = start.getTime(start);

	//Stop time in milliseconds
	var stop = new Date(stopStr);
	var stopMs = stop.getTime(stop)

	//Milliseconds to minutes
	var dif = (stopMs - startMs)
	var min = dif/1000/60;
	var minRound = Math.round(min,0)

	return minRound;
}

//Takes a Javascript object and returns it as a dictionary
export function objectArrayToDict(objList, keyProp, valueProp){

	var items = [];

	//Loop objects in list
	objList.forEach(obj => {
		//Get value from key column
		var key = obj[keyProp]
		//Get value from value column
		var value = obj[valueProp]
		//Add to item
		items[key] = value;

	});

	return items;
}
