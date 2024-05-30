import React, { useEffect, useState } from "react";
import SideNav from "../../Layouts/SideNav";
import requestHandler from "../../services/requestHandler";
import PaginatorNav from "../../Components/Common/PaginatorNav";
import TableComp from "../../Components/Common/TableComp";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import departmentsEnum from '../../data/enums/department';
import equipmentsEnum,{equipmentCondition} from '../../data/enums/equipmentStatus';
import Icon from '../../Components/Common/Icon';
import DropDown from "../../Components/Common/DropDown";
import { Menu } from "@headlessui/react";
import Modal from "../../Components/Common/Modal";
import SelectComp from "../../Components/Common/SelectComp";

function Stocks() {
    const [stocks, setStocks] = useState({});
    const [response, setResponse] = useState(false);
    const [showThresholdModal, setShowThresholdModal] = useState(false);
    const [threshold, setThreshold] = useState({
        id:  '',
        count: 0
    });
    const [condition, setCondition] = useState()
    const [serialNo, setSerialNo] = useState('')
    const [description, setDescription] = useState('')
    const [equipment, setEquipment] = useState({})


    useEffect(() => {
        fetchStocks();
    }, []);

    useEffect(() => {
        checkResponse()
    },[response])
 

    function checkResponse() {
        toast.success(response.message,{
            position: "top-center"
        });
    }

    function openModal(id){
        setThreshold({['id']: id})
        setShowThresholdModal(true)
    }

    function fetchStocks()
    {
        requestHandler.get("/api/equipments/stocks", setStocks);
       
    }

    function submitThreshold(e){
        e.preventDefault();
        requestHandler.patch('/api/equipments/stocks/update',threshold,setResponse)
        fetchStocks();
        setShowThresholdModal(false)
      }


    return (
        <SideNav >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Category","Model", "Current Stock", "Stock In", "Stock Out", "Threshold", "Action"]}
                >
                    {(Array.isArray(stocks.data) ? stocks.data: []).map(
                        (stock, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {stock.category}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {stock.model}
                                    </th>
                                    <th
                                        scope="row"
                                        title={
                                            stock.current_stock
                                        }
                                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                                    >
                                        {stock.current_stock}
                                    </th>
                                    <td className="px-2 py-4 text-center">
                                        {stock.stock_in}
                                    </td>
                                    <td className="px-2 py-4 text-center">
                                        {stock.stock_out}
                                    </td>
                                    <td
                                            className="px-2 py-4 text-center"
                                        >
                                           {stock.min_stock ?? '-'}
                                    </td>
                                    <td className="px-2 py-4">
                                      <DropDown>
                                        <Menu.Item>
                                          {({ active }) => (
											<button
                                              className={`${
                                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
											  title="Confirm Item Assigned"
                                              onClick={() => openModal(stock.type_id)}
                                            >
                                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                                              <span className='block py-3 px-2'>Set Threshold</span>   
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </DropDown>
								</td>
                                </tr>
                            );
                        }
                    )}
                </TableComp>
            </div>
            <Modal show={showThresholdModal} onClose={() => setShowThresholdModal(false)}>
          <div className='p-4 min-h-[50vh]'>
            <h2 className='text-center text-xl font-bold'>Equipments List</h2>
            <button
              type="button"
              className="absolute top-3 right-3 end-2.5 float-right  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowThresholdModal(false)}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <form className="space-y-5 px-4 py-2" action="#">
              <div>
                <label
                  htmlFor="count"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Set Threshold Level
                </label>
                <input
                  type="number"
                  name="count"
                  className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  // placeholder="Enter employee's name"
                  value={threshold.count}
                  onChange={(e) => setThreshold({...threshold,[e.target.name]: Number(e.target.value)})}
                  required
                />
              </div>

              <div className='w-full flex items-center'>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8 ml-auto"
                  onClick={(e) => submitThreshold(e)}
                >
                  Submit
                </button>
              </div>
            </form> 
          </div>
        </Modal>
        </SideNav>
    );
}

export default Stocks;
