import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    userNotesId: {
        type: String,
        required: true
    },

    allNotes: [
        {
            title: {
                type: String,
                required: true
            },

            body: {
                type: String,
                required: true
            },
        }
    ]
});

const schemaNotes = mongoose.model('notesSchema', notesSchema);

export default schemaNotes;