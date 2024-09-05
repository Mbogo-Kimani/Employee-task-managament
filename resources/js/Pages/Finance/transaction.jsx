import React, { useEffect, useState } from 'react'
import SideNav from '../../Layouts/SideNav';
import TableComp from '../../Components/Common/TableComp';
import TransactionsTableElem from '../../Components/Admin/TransactionsTableElem';
import requestHandler from '../../services/requestHandler';

const Transaction = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchTransactions()
    },[]);

    function fetchTransactions(){
        requestHandler.get('/api/transactions',setTransactions);
    } 
  return (
    <SideNav>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp  columns={['Account No.','Client Name','Phone Number','Amount', 'Payment Confirmation,', 'Date', 'Status', 'Action']}>
            {
              transactions?.map((elem, index) => {
                return (
                  <TransactionsTableElem
                    key={elem.id || index}
                    elem={elem}
                    // currentUser={userData}
                    // openModal={toggleOpenModal}
                    // openDeleteModal={() => deleteUser(elem.id)}
                  />
                );
              })
            }
          </TableComp>
          {/* <PaginatorNav state={clients} setState={setClients}/> */}
        </div>
      {/* </div>     */}
    </SideNav>
  )
}

export default Transaction