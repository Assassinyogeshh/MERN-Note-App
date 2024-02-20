import mongoose from "mongoose";
import schemaNotes from "../Model/schemaNote.js";


export const addNotes = async (req, res) => {
    try {

        const userId = req.userId;

        const postNote = req.body;


        if (!userId) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        const userDocument = await schemaNotes.findOne({ userNotesId: userId });

        if (!userDocument) {

            const addNewNote = new schemaNotes({ userNotesId: userId, allNotes: [postNote] })

            await addNewNote.save();

            return res.status(200).send("Successfully Notes Added")
        }

        userDocument.allNotes.push(postNote);
        await userDocument.save();

        return res.status(200).send("Successfully Notes Added")

    } catch (error) {
        console.log(error);
        return res.status(409).send('Failed To Add Note')
    }
}

export const fetchAllNotes = async (req, res) => {

    try {

        const userId = req.userId;
        const { page = 1 } = req.query;
        const pageSize = 6
        const skip = (page - 1) * pageSize;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        const getNotes = await schemaNotes.findOne({ userNotesId: userId })

           if (!getNotes) {
            console.log('not found');
            return res.status(404).json('Note not found')
        }

        const totalData = getNotes.allNotes;
        const totalNotes = totalData.length;
        const totalPage = Math.ceil(totalNotes / pageSize);
        const data = totalData.slice(skip, skip + parseInt(pageSize));

        return res.status(200).json({ data, totalPage })
    }
    catch (error) {
        return res.status(500).json({ message: "Failed To Fetch The Notes" })
    }

}

export const fetchEachNote = async (req, res) => {

    try {
        const { id: _id } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        if (!_id) {
            return res.status(404).json("Failed To Find Note");
        }

        const singleNote = await schemaNotes.findOne({ userNotesId: userId });

        const data = singleNote.allNotes.find(note => note._id.toString() === _id);


        return res.status(200).send(data);
    } catch (error) {

        return res.status(500).send("Failed to fetch Note")

    }
}
export const searchNotes = async (req, res) => {
    try {
        const { query } = req.query;

        const userId = req.userId;

        if (!query) {
            return res.status(404).send('Note Not Found')
        }

        const userNotes = await schemaNotes.findOne({ userNotesId: userId });

        if (!userNotes) {
            return res.status(404).json({ message: "User's notes not found" });
        }

        const filteredNotes = userNotes.allNotes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase())
        );

        return res.status(200).json(filteredNotes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateNote = async (req, res) => {
    try {

        const { title, body } = req.body;
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            console.log('Getting Error');
            return res.status(401).send('Invalid ID');
        }
        await schemaNotes.findOneAndUpdate(
            { "allNotes._id": _id },
            { $set: { "allNotes.$.title": title, "allNotes.$.body": body } }, { new: true }
        );


        return res.status(200).send('Successfully Update Note');
    } catch (error) {
        console.error('Error updating note:', error);
        return res.status(500).send('Failed to update note');
    }
};


export const deleteNotes = async (req, res) => {
    try {

        const { id: _id } = req.params;
        console.log(_id);
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(200).send('Failed To Find Note')
        }

        await schemaNotes.updateMany({}, { $pull: { allNotes: { _id } } });


        return res.status(200).json("Successfully Note Deleted");

    } catch (error) {
        return res.status(409).json("Failed To Delete Note")
    }
}
