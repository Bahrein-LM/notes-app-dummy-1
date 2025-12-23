import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftCircleIcon, Loader2Icon, Trash2Icon } from 'lucide-react';

// this file handle displays the details note


const NoteDetails = () => {

  // declare useState to handle note data
  const [note, setNote] = useState(null);

  // declare useState to handle loading process
  const [isLoading, setIsLoading] = useState(false);

  // declare useState to handle update data
  const [updating, setUpdating] = useState(false);

  // declare useNavigate to navigate from page to page
  const navigate = useNavigate();

  // declare useParams to use parameter when accessing the current index note
  // this case, we use useParams to get id from the URI
  const { id } = useParams();

  // checks the id can be detected or not
  // btw looks at the link, http://localhost:5173/note/(id)
  // console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {

      try {
        const res = await api.get(`/notes/${id}`)

        setNote(res.data.data);

        // checks the data
        console.log(res.data.data)
        
      } catch (error) {
        console.log('Error when fetching note ', error);
        toast.error('Failed to load note');
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();

  }, [id]);

  
  // checks the note data
  // console.log({ note })

  if (isLoading || !note) {
    return (
      <div className='h-screen bg-base-300 flex items-center justify-center'>
        <Loader2Icon className='size-10 animate-spin' />
      </div>
    )
  }

  // declare method handleDelete for handles delete operation
  const handleDelete = async () => {
    
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      
      await api.delete(`/notes/${id}`)
      
      toast.success('Note deleted successfully');
      
      navigate('/');

    } catch (error) {
      
      console.log('Error occured while deleting note: ', error);

      toast.error('Failed to delete note');
    }
  }

  // declare method handleUpdate for handles update operation
  const handleUpdate = async () => {

    if (!note.title.trim()) {
      toast.error('Please fill a title');
      return;
    }

    if (!note.content.trim()) {
      toast.error('Please fill a content');
      return;
    }

    setUpdating(true);

    try {
      await api.put(`/notes/${id}`, note);

      toast.success('Note updated successfully');
      
      navigate('/');

    } catch (error) {
      
      console.log('Error occured while updating note: ', error);

      toast.error('Failed to update note');

    } finally {

      setUpdating(false);
    }

  }

  return (
    <div className='h-screen bg-base-300'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-xl mx-auto'>
          
          <div className='flex items-center justify-between mb-6'>
            <Link to={'/'} className='btn btn-secondary'>
              <ArrowLeftCircleIcon className='size-7' />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-7' />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-200'>
            <div className='card-body'>
              
              <h2 className='card-title text-2xl text-primary mb-4'>
                Update Note
              </h2>

              <div className='fieldset mb-4'>
                <label className='fieldset-label text-secondary'>Title:</label>
                <input 
                  type="text" 
                  placeholder='Note Title'
                  className='input input-lg'
                  value={note.title}
                  onChange={(e) => setNote({
                    ...note,
                    title: e.target.value,
                  })}
                />
              </div>

              <div className='fieldset mb-4'>
                <label className='fieldset-label text-secondary'>Content:</label>
                <textarea  
                  placeholder='Update your content note here...'
                  className='textarea textarea-secondary h-30'
                  value={note.content}
                  onChange={(e) => setNote({
                    ...note,
                    content: e.target.value,
                  })}
                />
              </div>
              
              <div className='card-actions justify-end'>
                <button 
                  type='submit' 
                  className='btn btn-primary'
                  disabled={updating}
                  onClick={handleUpdate}
                >
                    { updating ? 'Updating...' : 'Note Updated' }
                </button>
              </div>
              
            </div> 
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default NoteDetails
