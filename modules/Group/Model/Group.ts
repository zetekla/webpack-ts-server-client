import mongoose from 'mongoose';

let Schema = mongoose.Schema;

// import User from '../../User/Model/User';
/**
 * Schema
 */

let Schema1 = new Schema({
    Name: { type: String, trim: true, unique: true, required: true },
    Description: { type: String, trim: true }, // describe what this group is for
    Role: { type: Integer, required: true},
    Users: [User._id] // Ids of group participants
});

mongoose.model('Group', Schema1);