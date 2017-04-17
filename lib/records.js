let records = [
 { artist:"rennie foster", title:"patrolling the cypher", genre:"techno"},
 { artist:"psyche", title:"crack down", genre:"techno"},
 { artist:"lakker", title:"tundra remixed", genre:"techno"}
];



exports.get = (title) => {
	return records.find((item) => {
		
	  	return item.title === title;
	});
}

exports.delete = (title) => {
	
	
	var len = records.length;
	//filter item
	
	records = records.filter( (item) => {
		return item.title !== title;
		len = records.legth;
		
	});
	var action = (records.length == len) ? "" : "deleted";
    return { "action": action, "total": records.length};
}

	

	/*exports.addRecords = (newRecord) => {
	//Get the total length
	var found = this.get(newRecord.records)
	//if string is not found
	if(!found) {
		newRecord.id = records.length;
		//put into string
		records.push(newRecord);
		var action = (found) ? "updated" : "added";
		return {"action": action, "total": records.length };
	}
	
	var action = (found) ? "updated" : "added";
	return {"action": action, "total": leads.length};
}	
	
*/

	

	exports.getAll = () => {
        return records;
}

    





