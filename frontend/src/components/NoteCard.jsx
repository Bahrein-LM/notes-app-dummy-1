import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {

  // declare the function for delete handler
  const handleDelete = async (id) => {

    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id)) // data will diseappear after deleting the data
      toast.success('Note deleted successfully')
    } catch (error) {

      console.log('Error deleting note: ', error)
      toast.error('Something went wrong')
    }
  }

  return (
    <Link 
        to={`/note/${note._id}`}
        className='card bg-base-300 hover:shadow-lg transition-all duration-300 border-t-10 border-secondary'
    >
      <div className='card-body'>
        <h3 className='text-primary/80 text-xl font-mono card-title mb-3'>
            {note.title}
        </h3>
        <p className='mx-3 text-secondary/70 line-clamp-3'>
            {note.content}
        </p>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-primary-content'>
                {formatDate(new Date(note.createdAt))}
            </span>
            <div className='flex items-center gap-2'>

                <PenSquareIcon className='size-5 hover:text-primary/50 text-primary/70' />

                <button 
                  className='btn btn-ghost btn-xs text-error hover:text-error/50'
                  onClick={(e) => {
                    e.preventDefault(); // get rid of the navigation behaviour
                    e.stopPropagation(); // prevent link navigation
                    handleDelete(note._id); // pass the real id
                  }}
                >
                    <Trash2Icon className='size-5' />
                </button>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
