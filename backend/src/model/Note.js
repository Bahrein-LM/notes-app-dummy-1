import mongoose from "mongoose";

// this file is to handle creating model each table in database "notes_db" and to be specific is for creating a schema model "noteSchema"

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model("Note", noteSchema);

export default Note;