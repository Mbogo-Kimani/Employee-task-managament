import React, {useState,useEffect} from 'react'
import TableComp from "../../Components/Common/TableComp";
import PaginatorNav from "../../Components/Common/PaginatorNav";
import requestHandler from "../../services/requestHandler";
import SideNav from "../../Layouts/SideNav";
import { navItemsDeterminer, pageData as defaultPageData } from '../../data/indexNav';
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import EmployeeChart from '../../Components/Charts/EmployeeChart'
import { loaderSetter } from '../../Components/Common/Loader';

const EmployeeStat = ({user}) => {
	const [pageItems, setPageItems] = useState(defaultPageData);
	const [users, setUsers] = useState({});
	const [response, setResponse] = useState(false);
	const [userDataSet, setUserDataSet] = useState([])
	const [navItems, setNavItems] = useState(defaultPageData);

	useEffect(() => {
		fetchUsersTaks()
	},[])

	useEffect(() => {
		if(users.length){
			calculateStats()
		}
	},[users])

	useEffect(() => {
		setNavItems(
		  navItemsDeterminer(user?.role, user?.clearance_level)
		);
	  }, []);

	function fetchUsersTaks() {
    requestHandler.get('/api/admin/tasks', setUsers, null, loaderSetter);
  	}

	function calculateStats(){
		let dataSet = []
		
		users?.forEach((user) => {
				dataSet.push(user.tasks.length)
		})
		console.log(dataSet);
		setUserDataSet(dataSet)
	}

	return (
		<SideNav navItems={navItems} user={user}>
			<div>
				<h2 className='text-center text-xl font-bold'>Employee Statistics</h2>
				<EmployeeChart users={users} data={userDataSet}/>
			</div>
		</SideNav>			
	)
}

export default EmployeeStat