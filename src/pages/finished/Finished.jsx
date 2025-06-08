import React from 'react'
import Navigator from '../../components/navigator'

export default function Finished() {
  return (
    <div className='flex flex-col items-center justify-center bg-light-grey h-screen max-w-md relative mx-auto'>
      <img className='mb-8' src="illustration(5).svg" alt="" />
      <h2 className='mb-4'>Coming Soon</h2>
      <span className='text-sm text-dark-grey mb-8'>this feature for future, for create new, click this button</span>
      <img src="Arrow.svg" alt="" />
      <Navigator className="absolute bottom-0 w-full" />
    </div>
  )
}
