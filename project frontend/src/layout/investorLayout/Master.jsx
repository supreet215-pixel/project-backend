import React from 'react'
import InvestorHeader from './InvestorHeader'
import { Outlet } from 'react-router-dom'

const InvestorMaster = () => {
  return (
    <>
        <InvestorHeader/>
        <Outlet/>
    
    </>
  )
}

export default InvestorMaster