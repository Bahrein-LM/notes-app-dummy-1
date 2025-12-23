import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI';
// import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

// this file handles displaying the Home Page

const Home = () => {
  
  // declare the useState for using RateLimiter
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  // declate the useState for handling notes
  const [notes, setNotes] = useState([]);

  // declare the useState for handling loading process
  const [isLoading, setIsLoading] = useState(false);

  // declare the useEffect for handling when fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
        try{
            // fetch notes from backend routes using axios
            const res = await api.get('/notes');

            // call useState setNotes set the notes data
            setNotes(res.data.data);

            // checks the data 
            console.log(res.data.data);

            // call useState setIsRateLimited and set false
            setIsRateLimited(false);

        } catch(error) {

            console.log("Error when fetching notes: ", error);

            if (error.response?.status === 429) {
              setIsRateLimited(true); 
            } else {
              toast.error('Failed to load notes')
            }
        } finally {
            setIsLoading(false);
        }
    }


    fetchNotes();
  }, [])

  return (
    <div>
      <Navbar />

      {/* call the useState value while calls the class "RateLimitUI" */}
      {isRateLimited && <RateLimitUI /> }

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        
        { isLoading && <div className='text-center text-primary py-10'>Loading...</div> }

        { notes.length === 0 && !isRateLimited && <NotesNotFound /> }

        { notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default Home
