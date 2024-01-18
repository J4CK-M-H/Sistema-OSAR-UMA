import React from 'react'
import { Outlet } from 'react-router-dom'

export const Admision = () => {
  return (
    <div className='admision block-scroll check'>
      <Outlet />
    </div>
  )
}
