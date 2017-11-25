
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