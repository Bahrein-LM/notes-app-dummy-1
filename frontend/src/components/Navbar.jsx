import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

// this files is to handle the display of Navbar components

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/20'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>Life_Notes_</h1>
            <div className='flex items-center gap-4'>
                <Link to={'/create'} className='btn btn-primary flex justify-baseline rounded-lg'>
                    <PlusIcon className='size-7' />
                    <span className='text-2xl font-mono font-semibold tracking-wider'>Add Note</span>
                </Link>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
