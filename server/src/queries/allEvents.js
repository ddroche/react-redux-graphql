const { GraphQLList } = require('graphql');
const EventType = require('../types/event')
const Event = require('../db/event');

module.exports = {
    type: new GraphQLList(EventType),
    resolve: (root, args, options) => {
        return new Promise((resolve, reject) => {
            Event.find({})
                .select()
                .exec()
                .then(data => resolve(data))
                .catch(errors => reject(errors))
        })
    }
}