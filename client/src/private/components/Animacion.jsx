import React from 'react'

export const Animacion = () => {
  return (
    <div className='flex'>
      <img src="/U.png" className='downU' alt="u" />
      <img src="/M.png" className='downM' alt="m" />
      <img src="/A.png" className='downA' alt="a" />

      <div className='w-[200px] h-[200px] bg-[#FE0000] heart'>
        <img  src="/banner.png" alt="banner" className='absolute -top-5 -left-5 z-30 -rotate-45 banner' />
      </div>
    </div>
  )
}
