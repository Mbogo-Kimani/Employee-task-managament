import React, { useEffect, useState } from 'react'
import { pageData as defaultPageData, navItemsDeterminer } from '../../data/indexNav'
import SideNav from '../../Layouts/SideNav';
import { displayErrors } from '../../data/utils';
import requestHandler from '../../services/requestHandler';

function NewReport({ user }) {
  const [navItems, setNavItems] = useState(defaultPageData);
  const [newReport, setNewReport] = useState({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);

  useEffect(() => {
    setNavItems(
      navItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, []);

  useEffect(() => {
    checkResponse();
  }, [response]);

  function checkResponse() {
    if (response) {
      setNewReport({
        title: '',
        content: '',
      });
    }
  }

  function submitReport(e) {
    e.preventDefault();
    requestHandler.post('/api/task_reports', newReport, setResponse, setErrors);
  }

  function handleChange(e) {
    setNewReport({...newReport, [e.target.name]: e.target.value});
  }

  return (
    <SideNav navItems={navItems} user={user}>
      <div className="flex justify-center items-center">
        <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
          <div className="dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
            
            <div className="p-1 md:p-5 sm:p-3 w-full">
              <form className="space-y-4 sm:p-8" action="#">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="reportTitfirstle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter a title"
                    value={newReport.title}
                    onChange={handleChange}
                    required
                  />
                  {(errors.title || errors.errors?.title) && (
                    <p className='text-red-500 my-2 py-2'>
                      {displayErrors(errors, 'title')}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="report-content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Report
                  </label>
                  <textarea
                    id="report-content"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    placeholder="Write your report here..."
                    name='content'
                    onChange={handleChange}
                    value={newReport.content}
                  />
                  {(errors.content || errors.errors?.content) && (
                    <p className='text-red-500 my-2 py-2'>
                      {displayErrors(errors, 'content')}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                  onClick={(e) => submitReport(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  )
}

export default NewReport;
