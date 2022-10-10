const { Schema, model, Types } = require('mongoose');
//library for Date objects
const { DateTime } = require('luxon');
const dateFormat = require('../utils/dateFormat');

//Reaction Schema
const ReactionSchema = new Schema({
    //creates unique ID for each reaction using Mongoose built in ObjectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: DateTime.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
}
);

//Thought Schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: DateTime.now(),
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

//counts number of reactions per thought
ThoughtSchema.virtual('reactionCount').get(
    function() {
        return this.reactions.length;
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;