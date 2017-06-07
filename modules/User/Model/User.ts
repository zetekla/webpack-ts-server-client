import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// import Group from '../../Group/Model/Group';
const Group = mongoose.model('Group').schema;

/**
 * Schema
 */

let Schema1 = new Schema({
    Name: { type: String, trim: true, required: true },
    Email: { type: String, trim: true, required: true },
    FullName: { type: String, trim: true, required: true },
    Title: { type: String, trim: true },
    Company: { type: String, trim: true },
    City: { type: String, trim: true },
    Phone: {
        type: String,
        validate: {
            // `isAsync` is not strictly necessary in mongoose 4.x, but relying
            // on 2 argument validators being async is deprecated. Set the
            // `isAsync` option to `true` to make deprecation warnings go away.
            isAsync: true,
            validator: function(v, cb) {
                setTimeout(function() {
                    cb(/\d{3}-\d{3}-\d{4}/.test(v));
                }, 5);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    },
    Location: { type: String, trim: true }, // geolocation, IP
    Groups: [Group._id], // Ids of group participants
    Preference: [],
    LastSeenDate: Date,
    Activated: Boolean,
    Banned: Boolean,
    Deleted: Boolean,
    Password: { type: String, trim: true }
});

mongoose.model('User', Schema1);