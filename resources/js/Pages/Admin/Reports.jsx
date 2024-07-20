import React, {useState,useEffect} from 'react'
import TableComp from "../../Components/Common/TableComp";
import PaginatorNav from "../../Components/Common/PaginatorNav";
import requestHandler from "../../services/requestHandler";
import SideNav from "../../Layouts/SideNav";
import { navItemsDeterminer, pageData as defaultPageData } from '../../data/indexNav';
import Modal from "../../Components/Common/Modal";
import { toast } from 'react-toastify';
import { loaderSetter } from '../../Components/Common/Loader';
import DropDown from '../../Components/Common/DropDown';
import { Menu } from '@headlessui/react';
import Icon from '../../Components/Common/Icon';


const Reports = () => {
  const [reports, setReports] = useState({})
  const [report, setReport] = useState({})
  const [navItems, setNavItems] = useState(defaultPageData);
  const [showModal, setShowModal] = useState(false);
  const [showReviewReportModal, setShowReviewReportModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getReports();
  },[]);



  function getReports(){
    requestHandler.get('/api/admin/reports',setReports);
  }

  const openModal = (report) => {
    setShowModal(true)
    setReport(report)
  }

  function openReviewReport(currentReport) {
    setShowReviewReportModal(true);
    setReport(currentReport);
  }

  function closeReviewReport() {
    setShowReviewReportModal(false);
  }

  function submitAdminAprroval(action) {
    const requestBody = { report_id: report.id, action };
    requestHandler.post('/api/admin/approve_report', requestBody, successDisplay, setErrors, loaderSetter);
  }

  function successDisplay(resp) {
    if (resp) {
      closeReviewReport();
      getReports();
      toast.success('Action successful');
    }
  }

  function openActionOptions () {
    // setActions(true)
  }

  return (
  <SideNav>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 z-10">
        <TableComp
            columns={["Title","Employee", "Department", "Task Name", "Task Type", "Date", "Action"]}
        >
            {(Array.isArray(reports.data) ? reports.data : []).map(
                (report, index) => {
                    return (
                        <tr
                            key={report.id || index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {report.title.length > 25 ? report.title.substr(0,25) + '...' : report.title}
                            </th>
                            <th
                                scope="row"
                                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {report.task_assignee.map((user) => {
                                    return (
                                      <p
                                      key={user.id}
                                      >
                                        {user.name}
                                      </p>
                                    )
                                 })
                                }
                            </th>
                            <th
                                scope="row"
                                title={report.department }
                                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {report.department}
                            </th>
                            <td className="px-2 py-4">
                                {report.task_name}
                            </td>
                            <td className="px-2 py-4">
                                {report.task_type}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                                {report.date}
                            </td>
                            <td className="px-2 py-4 cursor-pointer">
                              <DropDown>
                                <Menu.Item as={'button'} className='p-2 hover:bg-green-300 w-full' onClick={() => openReviewReport(report)}>
                                  <span className='flex justify-start items-center'>
                                    <Icon src='report' className="w-4 h-4" fill="var(--blue)"/>
                                    <p className='pl-2'>View Report</p>
                                  </span>
                                </Menu.Item>
                              </DropDown>
                            </td>
                        </tr>
                    );
                }
            )}
        </TableComp>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
          <button
            type="button"
            className="right-0 float-end end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowModal(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
            <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {report?.title}
              </h3>
                
            </div>
            <textarea
              rows={12}
              value={report?.content}
              className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
              disabled
            />
  
          </div>
        </div>
      </Modal>

      <Modal show={showReviewReportModal} onClose={closeReviewReport}>
        <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
          <button
            type="button"
            className="right-0 float-end end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeReviewReport}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="bg-white rounded-lg dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
            <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {report?.title}
              </h3>
                
            </div>

            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
              rows={12}
              value={report?.content}
              disabled
            />
  
          </div>
        </div>
      </Modal>
    </SideNav>
  )
}

export default Reports
