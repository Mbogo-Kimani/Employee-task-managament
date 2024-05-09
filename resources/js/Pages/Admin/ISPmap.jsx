import React,{useState,useEffect} from 'react'
import Maps from "../../Components/Maps/Maps"
import requestHandler from "../../services/requestHandler";
import SideNav from "../../Layouts/SideNav";
import { navItemsDeterminer, pageData as defaultPageData } from '../../data/indexNav';

const ISPmap = ({user}) => {
  const [navItems, setNavItems] = useState(defaultPageData);
  const [view,setView] = useState('satellite-streets-v11')

    useEffect(() => {
        setNavItems(
            navItemsDeterminer(user?.role, user?.clearance_level)
        );
        
    }, [])
  return (
    <SideNav navItems={navItems} user={user}>
        <div className='flex justify-between w-[30vw] mb-5'>
            <button onClick={() => setView('streets-v9')} className={`w-52 border rounded mr-5 hover:bg-green-200 cursor-pointer ${view == 'streets-v9' ? "bg-green-500" : "bg-transparent"}`}>
                Street view
            </button>
            <button onClick={() => setView('satellite-streets-v11')} className={`w-52 border rounded mr-5 hover:bg-green-200 cursor-pointer ${view == 'satellite-streets-v11' ? "bg-green-500" : "bg-transparent"}`}>
                Satellite view
            </button>
        </div>
        <Maps view={view}/>
    </SideNav>
  )
}

export default ISPmap