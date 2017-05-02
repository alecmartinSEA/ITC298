var expect = require("chai").expect;
var records = require("../lib/records");

describe("Records", function() {
	it("get returns searched record", function(){
		var result = records.get("crack down");
		expect(result).to.deep.equal({ artist:"psyche", title:"crack down", genre:"techno"});
	});

	it("get fails with a non-existing record", function() {
		var result = records.get("Not a record");
		expect(result).to.be.undefined;
	});
	it("deletes a certain title", function(){
		var result = records.delete("crack down");
		expect(result).to.deep.equal({ "action": 'deleted', "total": 2});
	});
	it("didn't delete title", function(){
		var result = records.delete("Wah");
		expect(result).to.deep.equal({ "action": "", "total": 2});
	});
	it("adds a new record", function(){
		var addTest = {artist: "cybotron", title: "cosmic cars", genre: "techno"};
		//var addTest = {artist: "cybotron", title: "cosmic cars", genre: "techno"};
		var result = records.add(addTest);
		expect(result).to.deep.equal({"Action": "updated", "total": 3});
	});
	it("didn't add title", function(){
		var result = records.add({ artist:"rennie foster", title:"patrolling the cypher", genre:"techno"});
		expect(result).to.be.undefined;
	});
	
});