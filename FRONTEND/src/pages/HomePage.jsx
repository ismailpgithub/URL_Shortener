import React from 'react'
import Url_form from '../components/Url_form'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-50">
      <div className="max-w-xl w-full">
      <Url_form />
      </div>
    </div>
  )
}

export default HomePage
