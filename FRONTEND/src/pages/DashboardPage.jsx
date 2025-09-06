import React from 'react'
import Url_form from '../components/Url_form'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-50">
      <div className="max-w-2xl w-full">
      <Url_form />
      <UserUrl/>
      </div>
    </div>
  )
}

export default DashboardPage
