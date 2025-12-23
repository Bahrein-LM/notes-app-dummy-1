// import axios from 'axios';
import api from '../lib/axios';
import { ArrowLeftCircle, CheckCircle, Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

// this file helps displaying the CreateNote page

const CreateNote = () => {
  
  // declare useNavigate to navigate from page to page
  const navigate = useNavigate();
  
  // declare useState for intialState "title" value
  const [title, setTitle] = useState('');

  // declare useState for intialState "content" value
  const [content, setContent] = useState('');

  // declare useState again to handle loading process
  const [isLoading, setIsLoading] = useState(false)

  // declare some condition for loading process
    if (isLoading) {
        return (
        <div className='h-screen bg-base-300 flex items-center justify-center'>
            <Loader2Icon className='size-10 animate-spin' />
        </div>
        )
    }
  
  // declare the function for handling the submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // validate that title or content exist or not
    if (!title.trim() || !content.trim()) {
        toast.error('Fields is empty.');
        return;
    }
    
    setIsLoading(true);

    try {
        await api.post('/notes', {
            title,
            content
        });

        // console.log(req)

        toast.success('Note created successfully');
        
        navigate('/')

    } catch(error) {
        
        console.log('Error when creating note:', error);
        if (error.response.status === 429) {
            
            toast.error("Slow down! You're creating notes too fast.", {
                duration: 3000,
                icon: '⏳',
            })
        } else {
            toast.error('Failed to create note');
        }
    } finally {

        setIsLoading(false);
    }

  }

  return (
    <div className='min-h-screen bg-base-300'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-xl mx-auto'>
                <Link to={'/'} className='btn btn-ghost btn-secondary mb-5'>
                    <ArrowLeftCircle className='size-5' />
                    Back to Notes
                </Link>

                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl text-primary mb-4'>
                            Create New Note
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className='fieldset mb-4'>
                                <label className='fieldset-label text-secondary'>Title:</label>
                                <input 
                                    type="text" 
                                    placeholder='Note Title'
                                    className='input input-neutral'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='fieldset mb-4'>
                                <label className='fieldset-label text-secondary'>Content:</label>
                                <textarea
                                    placeholder='Write your note here...'
                                    className='textarea textarea-neutral h-40'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            
                            <div className='card-actions justify-end'>
                                <button type='submit' className='btn btn-primary'>
                                    Create Note
                                    <CheckCircle className='size-5' />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateNote
