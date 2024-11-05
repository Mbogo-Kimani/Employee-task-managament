import React, { useEffect, useState } from 'react';
import TableComp from '../../Components/Common/TableComp';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import requestHandler from '../../services/requestHandler';
import { loaderSetter } from '../../Components/Common/Loader';
import ClientTableElem from '../../Components/Hotspot/ClientTableElem';
import { toast } from 'react-toastify';
import PaginatorNav from '../../Components/Common/PaginatorNav';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [response, setResponse] = useState();
  useEffect(() => {
    fetchClients();
  }, []);
  useEffect(() => {
    if(response && response.success){
      toast.success(response.message);
    }
  }, [response]);

  function fetchClients() {
    requestHandler.get('/api/hotspot/clients', setClients, null, loaderSetter);
  }
  function handleDelete(elem) {
    requestHandler.delete(`/api/hotspot/client/${elem.id}`, setResponse);
  }
  return (
    <HotspotLayout>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
        <TableComp
          columns={[
            'Name',
            'Email',
            'Phone No.',
            'Package',
            'Status',
            'Sessions',
            'Action',
          ]}
        >
          {clients?.data?.map((elem, index) => {
            return (
              <ClientTableElem
                key={elem.id || index}
                elem={elem}
                onDelete={handleDelete}
              />
            );
          })}
        </TableComp>
        <PaginatorNav state={clients} setState={setClients} />
      </div>
    </HotspotLayout>
  );
};

export default Clients;
