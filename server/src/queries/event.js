const { GraphQLID, GraphQLNonNull } = require('graphql');
const EventType = require('../types/event')
const Event = require('../db/event');

module.exports = {
    type: EventType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: (root, { id }, _, fieldASTs) => {
        return new Promise((resolve, reject) => {
            Event.findById(id)
                .select()
                .exec()
                .then(data => resolve(data))
                .catch(errors => reject(errors))
        })
    }
}