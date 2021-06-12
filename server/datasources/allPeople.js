const data  = require('../data/allPeople.json');
const {DataSource} =require('apollo-datasource');
const _ = require('lodash');

class PeopleAPI extends DataSource {
    
    constructor(){
        super();
    }

    initialize(config){}

    getAllPeople(){
        return data.allPeople;
    }

    getPersonById(id){
        const persons = data.allPeople.people;
        const person = _.filter(persons, { id: id});
        return person[0];
    }

}

module.exports = PeopleAPI;