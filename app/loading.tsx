import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
        <ClimbingBoxLoader size={24} color='#00875F' className='-translate-y-full' />
    </div>
  )
}

export default Loading;