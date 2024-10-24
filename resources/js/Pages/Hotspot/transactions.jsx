import React, { useEffect, useState } from 'react'
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import TableComp from '../../Components/Common/TableComp';
import { loaderSetter } from '../../Components/Common/Loader';
import requestHandler from '../../services/requestHandler';
import TransactionsTableElem from '../../Components/Admin/TransactionsTableElem';


const Transactions = () => {
    const [transactions,setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions()
    },[]);
    function fetchTransactions(){
        requestHandler.get('/api/transactions',setTransactions,null,loaderSetter);
    }
  return (
    <HotspotLayout>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
            <TableComp columns={[ 'Client', 'Phone No.', 'Amount', 'Date','Payment Confirmation','Status', 'Action']}>
            {
              transactions?.map((elem, index) => {
                return (
                  <TransactionsTableElem
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

export default Transactions