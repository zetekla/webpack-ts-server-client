import mongoose from 'mongoose';

let Schema = mongoose.Schema;

// import Group from '../../Group/Model/Group';

/**
 * Schema
 */

let Schema1 = new Schema({
    Name: { type: String, trim: true, required: true },
    FullName: { type: String, trim: true, required: true },
    Title: { type: String, trim: true },
    Company: { type: String, trim: true },
    City: { type: String, trim: true },
    Location: { type: String, trim: true },
    Groups: [Group._id], // Ids of group participants
    Description: { type: String, trim: true }, // describe what this group is for
    Preference: [],
    LastSeenDate: Date,
    Activated: Boolean,
    Banned: Boolean,
    Deleted: Boolean,
    Password: { type: String, trim: true }
});

mongoose.model('User', Schema1);