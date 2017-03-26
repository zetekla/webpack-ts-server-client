import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// import User from '../../User/Model/User';

const User = mongoose.model('User').schema;

/**
 * Schema
 */

let Schema1 = new Schema({
    Name: { type: String, trim: true, unique: true, required: true },
    Description: { type: String, trim: true }, // describe what this group is for
    Role: { type: Number, required: true},
    Users: [User._id] // Ids of group participants
});

mongoose.model('Group', Schema1);