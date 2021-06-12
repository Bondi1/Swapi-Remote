const persons = require('../data/persons.json');
const {DataSource} =require('apollo-datasource');
const _ = require('lodash');

class PersonAPI extends DataSource {
    constructor(){
        super();
    }

    initialize(config){}

    getPersons(args){
        return _.filter(persons,  args);

    }

    getPersonById(id){
        const person = _.filter(persons, { id: id});
        return person[0];
    }

}

module.exports = PersonAPI;