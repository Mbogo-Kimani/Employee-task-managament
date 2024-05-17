import React, { useEffect, useState,useContext } from 'react'
import DashboardItem from '../Components/DashboardItem'
import SideNav from '../Layouts/SideNav';
import BarChart from '../Components/Charts/BarChart'
import ClientChart from '../Components/Charts/ClientsChart'
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../data/indexNav';
import requestHandler from '../services/requestHandler';
import departmentsEnum from '../data/enums/department';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../appContext';
import { loaderSetter } from '../Components/Common/Loader';


function Home() {
  const [day, setDay] = useState('');
  const [tasks,setTasks] = useState({})
  const [tasksDone,setTasksDone] = useState({})
  const [errors,setErrors] = useState({})
  const [clients, setClients] = useState([]);
  const [dateUK, setDateUK] = useState('');
  const [pendingDataSet, setPendingDataSet] = useState([]);
  const [ongoingDataSet, setOngoingDataSet] = useState([]);
  const [finishedDataSet, setFinishedDataSet] = useState([]);
  const [clientDataSet, setClientDataSet] = useState([]);
  const [pageItems, setPageItems] = useState(defaultPageData);
  const [dashboardNumbers, setDashboardNumbers] = useState({});
  const { userData } = useContext(AppContext)


  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setDay(date.toLocaleString('en-US', { weekday: 'long' }));
      setDateUK(date.toLocaleString('en-UK'))
    }, 1000);
    
    // Cleanup function to clear the interval when component unmounts or when state is set
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setPageItems(
      pageAndNavItemsDeterminer(userData?.role, userData?.clearance_level)
    );
    fetchTasks();
    fetchClients();
    fetchUserInfo();
  }, [])

  useEffect(() => {
    if(tasks.data){
      calculateStats(true)
      calculateStats(false)
    }
  },[tasks])
  useEffect(() => {
      if(clients.data){
        calculateStats(false,false,true)
      }
  },[clients])
  useEffect(() => {
    if(tasksDone.data){
      calculateStats(false,true)
    }
  },[tasksDone])

  function fetchUserInfo() {
    requestHandler.get(`/api/user_info`, setDashboardNumbers, null, loaderSetter);
  }
  
  const fetchTasks = () => {
    const filters = {
      type: '1',
      status: '1'
    }
    const filtersDone = {
      type: '1',
      status: '5'
    }
    requestHandler.post('/api/filter/tasks',filters, setTasks, setErrors)
    requestHandler.post('/api/filter/tasks',filtersDone, setTasksDone, setErrors)
    
  }
  function fetchClients() {
    requestHandler.get('/api/clients', setClients);
  }

  function getNumberOfTasksForMonth(tasks, year, month, pending = true) {
    // Filter tasks based on the year and month
    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.updated_at);
        return taskDate.getFullYear() === year && taskDate.getMonth() === month - 1 && ( pending ? !task.received_by_department_member : task.received_by_department_member);
    });

    // Return the number of filtered tasks
    return filteredTasks.length;
  }

  function getNumberOfClientsPerMonth(year,month){
   
    const filteredClients = clients?.data.filter(client => {
        const createdAt = new Date(client.created_at)
        return createdAt.getFullYear() === year && createdAt.getMonth() === month - 1;
      })
      return filteredClients.length
  }

  const calculateStats = (pending,done = false, clientStat = false) => {
    let year = 2024
    let months = [1,2,3,4,5]
    let dataSet = []
   
    months.forEach((month) => {
        if(clientStat){
          dataSet.push(getNumberOfClientsPerMonth(year,month))
        }else{
          dataSet.push(getNumberOfTasksForMonth(done ? tasksDone.data : tasks.data,year,month,pending))
        }
    })
    pending ? setPendingDataSet(dataSet) : setOngoingDataSet(dataSet)
    done && setFinishedDataSet(dataSet)
    clientStat && setClientDataSet(dataSet)
  }

  const { t } = useTranslation();

  return (
    <SideNav>
      <div>
        <div className="page-header text-gray-900 dark:text-gray-100">
          <span id="dayOfWeek" className="page-heading" style={{fontSize: '30px'}}>{ day }</span>
          <br/>
          <span id='ct7' className="page-heading text-[25px]" style={{fontSize: '25px'}}>{ dateUK }</span>
          <p className="text-lg animated-text"> <span>{t('greeting')}, </span>
            <span className="font-bold ">{ userData?.name }</span>
          </p>
          <hr/>
        </div>
        <section className="mb-3 lg:mb-5">
          <div className="flex flex-wrap mt-6">
            {
              (Array.isArray(pageItems.pageItems) ? pageItems.pageItems : []).map((item, idx) => {
                return (
                  <DashboardItem
                    key={idx}
                    numberToDisplay={item.numberToDisplay === '+' ? item.numberToDisplay : dashboardNumbers[item.numberToDisplay]}
                    textToDisplay={item.name}
                    pictureSrc={item.pictureSrc}
                    href={item.href}
                  />
                )
              })
            }
          </div>
        </section>
        <section className='flex'>
          {
            userData?.role == departmentsEnum.ADMIN && (
              <>
                <div className='w-[40vw] mt-5 mr-5'>
                  <h2 className='font-medium text-xl'>{t('installations')}</h2>
                  <BarChart pendingData={pendingDataSet} ongoingData={ongoingDataSet} finishedData={finishedDataSet}/>
                </div>
                <div className='w-[40vw] mt-5'>
                  <h2 className='font-medium text-xl'>{t('clients-onboarded')}</h2>
                  <ClientChart clientData={clientDataSet}/>
                </div>
              </>

            )
          }  
        </section>
      </div>
    </SideNav>
  )
}

export default Home
