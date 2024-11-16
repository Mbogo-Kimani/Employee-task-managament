import React, { useEffect, useState } from 'react'
import TableComp from '../../Components/Common/TableComp';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import requestHandler from '../../services/requestHandler';
import { loaderSetter } from '../../Components/Common/Loader';
import ClientTableElem from '../../Components/Hotspot/ClientTableElem'


const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    },[])

    function fetchClients(){
        requestHandler.get('/api/hotspot/clients',setClients,null, loaderSetter)
    }
  return (
    <HotspotLayout>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 mb-20">
            <TableComp columns={['Name', 'Email', 'Phone No.', 'Package', 'Status','Sessions', 'Action']}>
            {
              clients?.data?.map((elem, index) => {
                return (
                  <ClientTableElem
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

export default Clients