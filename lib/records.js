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
	var oldLen = records.length;
	//filter item
	var deleteRecords = records.filter( (item) => {
		return item.title !== title;
	});
	records = deleteRecords;
	var action = (records.length == oldLen) ? "" : "deleted";

    return { "action": action, "total": records.length};
}

	
exports.getAll = () => {
        return records;
}



    