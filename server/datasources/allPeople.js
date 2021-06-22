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

    getAllReviews(){
        return data.allReviews;
    }

    getReviewByType(type){
        const allReviews = data.allReviews.reviews;
        const review = _.filter(allReviews, {type: type})
        return review[0];
    }
    
    // TODO: Can improve this to be a findandcreate review
    createReview(typeObj){
        console.log(typeObj);
        const allReviews = data.allReviews.reviews;        
        const id = allReviews.length + 1;
        const newReview = {
            id : id,
            type : typeObj.type
        };
        allReviews.push( newReview );
        return newReview;
    }

}

module.exports = PeopleAPI;