import Note from "../model/Note.js";

// for handling how the transfering data works

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // use the sort method, then call {} while inside it call object "createdAt" and input it in "-1" value to get the data by newest first
        
        res.status(200).json({
            message: 'get all notes successfully',
            data: notes, 
        });
    } catch (error) {
        
        console.error("Error fetching notes:", error);

        res.status(500).send({
            message: 'Internal server error'
        });
    }
}

export const getDetailNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const detailNotes = await Note.findById(id);
        
        // now to give condition when the id not found
        if (!detailNotes) return res.status(404).send({
            message: 'Note not found',
        })


        res.status(201).json({
            message: 'detail notes successfully retrieved',
            data: detailNotes, 
        });
    } catch (error) {
        
        console.error("Error fetching details note:", error);

        res.status(500).send({
            message: 'Internal server error'
        });
    }
}

export const createNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const newNote = new Note({
            title,
            content
        })

        const savedNote = await newNote.save();

        // console.log(newNote); // it will return "undefined"

        res.status(201).json({
            message: 'new note has been created successfully',
            data: savedNote
        });

    } catch (error) {
        console.error("Error posting notes: ", error);
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}

export const updateNoteId = async (req, res) => {
    try{
        const { title, content } = req.body;
        const { id } = req.params;
        
        // because when updating current data so you need to find the "id" of the data
        // -> to do that, call your model schema and call "findByIdAndUpdate" from mongoose
        // -> then for second parameter, call your data parameter that you sets in "createNotes" function 
        const updateNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true});

        // now to handle when the condition where the id cannot be found
        if(!updateNote) return res.status(404).send({
            message: 'Note not found',
        })

        res.status(201).json({
            message: 'post updated successfully',
            updateNote,
        });
    } catch(error) {
        console.error("Error updating notes: ", error);
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}

export const deleteNoteId = async (req, res) => {
    try {
        const { id } = req.params;

        // you need to get the id of data so you can delete the current data
        const deleteNote = await Note.findByIdAndDelete(id);

        // now to give condition when the id not found
        if (!deleteNote) return res.status(404).send({
            message: 'Note not found',
        })

        res.status(201).json({
            message: 'post deleted successfully'
        });
    } catch(error) {
        console.error("Error deleting notes: ", error);
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}