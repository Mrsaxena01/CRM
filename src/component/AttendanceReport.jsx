import React from 'react'
import Layout from './Layout'

function AttendanceReport() {
  return (
    <Layout >
      <h2 className="text-2xl font-bold text-gray-800">Welcome to AttendanceReport</h2>
      <p className="mt-4 text-gray-600">
        This is your main AttendanceReport content.
      </p>

      <div className='w-full overflow-hidden flex gap-5 flex-wrap items-center justify-center'>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div><div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
    <div className='w-50 h-50 bg-red-400'></div>
      </div>

    </Layout>
  )
}

export default AttendanceReport