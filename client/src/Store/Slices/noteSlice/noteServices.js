import axios from "axios";

const api = 'http://localhost:3000';


const addNote = async (noteData) => {
    const data = JSON.parse(localStorage.getItem('user'))

    const token = data.token;

    if (!token) {
        throw new Error('unAuthorized User');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const response = await axios.post(`${api}/note/addNotes`, noteData, config);
    console.log(response);
}

const fetchNotes = async (pageNum) => {
    const data = JSON.parse(localStorage.getItem('user'))

    const token = data.token;

    if (!token) {
        throw new Error('unAuthorized User');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const response = await axios.get(`${api}/note/fetchNotes?page=${pageNum}`, config);

 
    return response.data
}


const fetchEachNote = async (id) => {
    const data = JSON.parse(localStorage.getItem('user'))

    const token = data.token;

    if (!token) {
        throw new Error('unAuthorized User');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const response = await axios.get(`${api}/note/eachNote/${id}`, config)

    return response.data;
}

const updateNote = async ({ values, id }) => {
    const response = await axios.patch(`${api}/note/editNote/${id}`, values);
    return response.data;
}

const deleteNote = async (id) => {

    await axios.delete(`${api}/note/deleteNotes/${id}`);

}

const noteServices = {
    addNote,
    fetchNotes,
    updateNote,
    deleteNote,
    fetchEachNote
}

export default noteServices;