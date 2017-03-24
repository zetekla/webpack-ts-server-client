import mongoose from 'mongoose';

let Schema = mongoose.Schema;

/**
 * Schema
 */

let Schema1 = new Schema({
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
});

let Schema2 = new Schema({
    EmailSet: [Schema1]
});

mongoose.model('Email', Schema1);
mongoose.model('EmailSet', Schema2); // EmailSet contains original message and multiple replies.
