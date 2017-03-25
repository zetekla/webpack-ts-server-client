import mongoose from 'mongoose';

let Schema = mongoose.Schema;

/**
 * Schema
 */

let Email = new Schema({
    Subject: { type: String, trim: true },
    Body: { type: String, trim: true },
    ToRecipients: [],
    Sender: {
        Email: { type: String, trim: true, required: true },
       /* PostedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        } // https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/*/
    },
    SentDate: Date
    // recipientGroups: []
    // system flags: *spammed*, *ads*, *junked*, *important*, *priority*
    // user preferences, custom folders and flags are saved with User model as they should be binding to the User
});

let EmailSet = new Schema({
    EmailSet: [Email._id]
});

mongoose.model('Email', Email);
mongoose.model('EmailSet', EmailSet); // EmailSet contains original message and multiple replies.
