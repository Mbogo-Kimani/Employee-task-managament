import React, { useContext, useEffect, useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import { AppContext } from '../../appContext';
import { useTranslation } from 'react-i18next';
import IncomeChart from '../../Components/Charts/IncomeChart'
import requestHandler from '../../services/requestHandler';

const Dashboard = () => {
  const [hotspotUsers, setHotspotUsers] = useState();
  const [plans, setPlans] = useState();
  const [income, setIncome] = useState();
  const [dailyIncome, setDailyIncome] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const { userData } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetchHotspotUsers();
    fetchActiveProfiles();
    requestHandler.get('/api/get-stat?period=daily',setDailyIncome)
    requestHandler.get('/api/get-stat?period=monthly',setMonthlyIncome)
    
  },[])

  function fetchHotspotUsers(){
    requestHandler.get('/api/hotspot/users',setHotspotUsers);
  }
  function fetchActiveProfiles(){
    requestHandler.get('/api/hotspot/profiles/active',setPlans);
  }

  function getIncome(string){
    requestHandler.get('/api/get-stat?period=${string}',setIncome)
    return income
  }

  return (
    <HotspotLayout>
      
<div className="overflow-y-auto h-screen p-3 pb-6">
<h1 className='text-2xl font-bold'>
        <span>{t('greeting')}, </span>
        <span className='font-bold '>{userData?.name}</span>
      </h1>
      <p>Welcome to the Hotspot Management System!</p>



  {/* Card container - gap and padding adjusted */}
  <div className="flex flex-wrap justify-between gap-2 pb-2">  {/* Adjusted for spacing */}
    
    {/* Daily Income Report Card */}
    <div className="border rounded mt-3 w-full sm:w-[48%] md:w-[23%] lg:w-[23%] p-2 shadow-md bg-blue-100">
      <h1 className="text-xl font-bold text-blue-800 flex items-center">
        <span className="mr-2"><i className="fas fa-coins"></i></span> Daily Income Report
      </h1>
      <hr className="my-2" />
      <div className="flex items-center justify-between mt-3">
        <p className="text-3xl font-semibold">Ksh {dailyIncome?.amount}</p>
        <span className="text-green-600 font-bold">+5%</span>
      </div>
      <p className="text-gray-600 text-sm">Compared to yesterday</p>
    </div>

    {/* Monthly Income Report Card */}
    <div className="border rounded mt-3 w-full sm:w-[48%] md:w-[23%] lg:w-[23%] p-2 shadow-md bg-green-100">
      <h1 className="text-xl font-bold text-green-800 flex items-center">
        <span className="mr-2"><i className="fas fa-calendar-alt"></i></span> Monthly Income Report
      </h1>
      <hr className="my-2" />
      <div className="flex items-center justify-between mt-3">
        <p className="text-3xl font-semibold">Ksh {monthlyIncome?.amount}</p>
        <span className="text-green-600 font-bold">+12%</span>
      </div>
      <p className="text-gray-600 text-sm">Compared to last month</p>
    </div>

    {/* Active Plans Card */}
    <div className="border rounded mt-3 w-full sm:w-[48%] md:w-[23%] lg:w-[23%] p-2 shadow-md bg-yellow-100">
      <h1 className="text-xl font-bold text-yellow-800 flex items-center">
        <span className="mr-2"><i className="fas fa-users"></i></span> Active Plans
      </h1>
      <hr className="my-2" />
      <div className="flex items-center justify-between mt-3">
        <p className="text-3xl font-semibold">{plans?.count}</p>
        <span className="text-red-600 font-bold">-2%</span>
      </div>
      <p className="text-gray-600 text-sm">Compared to last week</p>
    </div>

    {/* Total Users Card */}
    <div className="border rounded mt-3 w-full sm:w-[48%] md:w-[23%] lg:w-[23%] p-2 shadow-md bg-purple-100">
      <h1 className="text-xl font-bold text-purple-800 flex items-center">
        <span className="mr-2"><i className="fas fa-user-plus"></i></span> Total Users
      </h1>
      <hr className="my-2" />
      <div className="flex items-center justify-between mt-3">
        <p className="text-3xl font-semibold">{hotspotUsers?.length}</p>
        <span className="text-green-600 font-bold">+0%</span>
      </div>
      <p className="text-gray-600 text-sm">Growth this month</p>
    </div>
  </div>

  {/* Charts Section - adjusted for vertical stacking and spacing on smaller screens */}
  <div className="flex flex-col sm:flex-row w-full justify-between pb-10  mt-4">
    <div className="w-full sm:w-[48%] ">  {/* Added bottom margin to prevent cutoff */}
      <IncomeChart clientData={[]} title='Clients' />
    </div>
    <div className="w-full sm:w-[48%]">  {/* Added bottom margin to prevent cutoff */}
      <IncomeChart clientData={[]} title="Income" />
    </div>
  </div>
</div>

    </HotspotLayout>
  );
}; 

export default Dashboard;