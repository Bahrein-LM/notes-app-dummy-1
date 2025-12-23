import { ZapIcon } from 'lucide-react'
import React from 'react'

// this file is to handle displaying Rate Limiter UI

const RateLimitUI = () => {

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='bg-primary/10 border border-primary/30 rounded-lg shadow-md'>
            <div className='flex flex-col md:flex-row items-center p-6 gap-5'>
                <div className='shrink-0 bg-primary/20 p-4 rounded-lg shadow-md'>
                    <ZapIcon className='size-10 text-primary' />
                </div>
                <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-xl font-bold mb-2'>Rate Limit Reaches....!!!</h3>
                    <p className='text-base-content mb-1'>
                        Too much request. please wait a moment.
                    </p>
                    <p className='text-sm text-base-content/30'>
                        Try again in a few seconds for website to work again
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RateLimitUI
