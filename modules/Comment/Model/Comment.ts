import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = mongoose.model('User').schema;

let Comment = new Schema({
    DiscussionId: { type: Number, required: true},
    ParentId: { type: Number, required: true},
    CurrentSlug: { type: String, trim: true, required: true },
    ParentSlug: { type: String, trim: true, required: true },
    FullSlug: { type: String, trim: true, required: true },
    Sender: {
        Id: User._id,
        Email: User.Email,
        Name: User.Name,
        FullName: User.FullName,
        Title: User.Title
    },
    ToRecipients: []
    // LatestVersion: { type: String, trim: true, default: '1.0.0' },
});

mongoose.model('Comment', Comment);