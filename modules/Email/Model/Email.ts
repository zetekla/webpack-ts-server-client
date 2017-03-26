import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = mongoose.model('User').schema;
const Comment = mongoose.model('Comment').schema;

/**
 * Schema
 */

let Email = new Schema({
    Subject: { type: String, trim: true },
    Body: { type: String, trim: true },
    ToRecipients: [],
    Sender: {
        Id: User._id,
        Email: User.Email,
        Name: User.Name,
        FullName: User.FullName,
        Title: User.Title
       /* PostedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        } // https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/*/
    },
    SentDate: Date,
    Comments: [Comment]
    // recipientGroups: []
    // system flags: *spammed*, *ads*, *junked*, *important*, *priority*
    // user preferences, custom folders and flags are saved with User model as they should be binding to the User
});

let EmailSet = new Schema({
    UserId: User._id,
    EmailSet: [Email._id]
});

mongoose.model('Email', Email);
mongoose.model('EmailSet', EmailSet); // EmailSet is similar to inbox.
