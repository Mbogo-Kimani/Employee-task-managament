import React, { useEffect, useState } from 'react'
import DashboardItem from '../Components/DashboardItem'
import SideNav from '../Layouts/SideNav';
import BarChart from '../Components/Charts/BarChart'
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../data/indexNav';
import requestHandler from '../services/requestHandler';

function Home(props) {
  const [day, setDay] = useState('');
  const [tasks,setTasks] = useState({})
  const [tasksDone,setTasksDone] = useState({})
  const [errors,setErrors] = useState({})
  const [dateUK, setDateUK] = useState('');
  const [pendingDataSet, setPendingDataSet] = useState([]);
  const [ongoingDataSet, setOngoingDataSet] = useState([]);
  const [finishedDataSet, setFinishedDataSet] = useState([]);
  const [pageItems, setPageItems] = useState(defaultPageData);

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
      pageAndNavItemsDeterminer(props.user?.role, props.user?.clearance_level)
    );
    fetchTasks()
  }, [])

  useEffect(() => {
    if(tasks.data){
      calculateStats(true)
      calculateStats(false)

    }
  },[tasks])

  useEffect(() => {
    if(tasksDone.data){
      calculateStats(false,true)
    }
  },[tasksDone])
  
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
  const fetchTasksDone = () => {
    
  }

  function getNumberOfTasksForMonth(tasks, year, month, pending = true) {
    // Filter tasks based on the year and month
    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.updated_at);
        return taskDate.getFullYear() === year && taskDate.getMonth() === month - 1 && (pending ? !task.received_by_department_member : task.received_by_department_member);
    });

    // Return the number of filtered tasks
    return filteredTasks.length;
  }

  const calculateStats = (pending,done = false) => {
    let year = 2024
    let months = [1,2,3,4]
    let dataSet = []
   
    months.forEach((month) => {
        dataSet.push(getNumberOfTasksForMonth(done ? tasksDone.data : tasks.data,year,month,pending))

    })
    pending ? setPendingDataSet(dataSet) : setOngoingDataSet(dataSet)
    done && setFinishedDataSet(dataSet)
  }

  return (
    <SideNav navItems={pageItems.navItems} user={props?.user}>
      <div>
        <div className="page-header text-gray-900 dark:text-gray-100">
          <span id="dayOfWeek" className="page-heading" style={{fontSize: '30px'}}>{ day }</span>
          <br/>
          <span id='ct7' className="page-heading text-[25px]" style={{fontSize: '25px'}}>{ dateUK }</span>
          <p className="text-lg animated-text"> <span>Hello, </span>
            <span className="font-bold ">{ props.user?.name }</span>
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
                    numberToDisplay={item.numberToDisplay === '+' ? item.numberToDisplay : props[item.numberToDisplay]}
                    textToDisplay={item.name}
                    pictureSrc={item.pictureSrc}
                    href={item.href}
                  />
                )
              })
            }
          </div>
        </section>
        <section>
          <div className='w-[50vw] mt-5'>
            <h2 className='font-medium text-xl'>Installations</h2>
            <BarChart pendingData={pendingDataSet} ongoingData={ongoingDataSet} finishedData={finishedDataSet}/>
          </div>
           
        </section>
      </div>
    </SideNav>
  )
}

export default Home
