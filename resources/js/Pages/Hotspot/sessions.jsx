import React, { useEffect, useState } from 'react'
import TableComp from '../../Components/Common/TableComp'
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import requestHandler from '../../services/requestHandler';
import { loaderSetter } from '../../Components/Common/Loader';
import SessionTableElem from '../../Components/Hotspot/SessionTableElem';
import { toast } from 'react-toastify';


const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [response, setResponse] = useState();

    useEffect(() => {
      fetchActiveSessions()
    },[])
    useEffect(() => {
      if(response && response.success){
        toast.success(response.message);
        fetchActiveSessions()
      }else if (response){
        toast.error('An error occurred');
      }
    },[response]);

    function fetchActiveSessions(){
      requestHandler.get('/api/sessions/active',setSessions, null,loaderSetter)
    }

    function handleDelete(mac){     
      requestHandler.delete(`/api/hotspot/session/${mac}`,setResponse);
    }
  return (
    <HotspotLayout>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <TableComp columns={['User', 'IP address', 'Mac Address', 'Started At', 'Action']}>
            {
              sessions?.map((elem, index) => {
                return (
                  <SessionTableElem
                    key={elem.id || index}
                    elem={elem}
                    onDelete={handleDelete}
                  />
                );
              })
            }
            </TableComp>
        </div>
    </HotspotLayout>
  )
}

export default Sessions