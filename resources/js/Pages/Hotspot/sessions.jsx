import React, { useEffect, useState } from 'react'
import TableComp from '../../Components/Common/TableComp'
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import requestHandler from '../../services/requestHandler';
import { loaderSetter } from '../../Components/Common/Loader';
import SessionTableElem from '../../Components/Hotspot/SessionTableElem';


const Sessions = () => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        fetchActiveSessions()
    },[])
    function fetchActiveSessions(){
        requestHandler.get('/api/sessions/active',setSessions, null,loaderSetter)
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