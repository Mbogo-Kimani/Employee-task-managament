import React, { useEffect, useRef, useState } from 'react';
import SideNav from '../../../Layouts/SideNav';
import {
  pageData as defaultPageData,
  navItemsDeterminer,
} from '../../../data/indexNav';
import { toast } from 'react-toastify';
import { displayErrors, handleFormChange } from '../../../data/utils';
import requestHandler from '../../../services/requestHandler';
import { loaderSetter } from '../../../Components/Common/Loader';
import department from '../../../data/enums/department';

function NewCircular({ user }) {
  const [navItems, setNavItems] = useState(defaultPageData.navItems);
  const [newCircular, setNewCircular] = useState({
    title: '',
    content: '',
    to_whom: [],
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);

  const allDepartments = [
    {
      id: 0,
      enumKey: 'ALL',
      text: 'All',
    },
    {
      id: department.ADMIN,
      enumKey: 'ADMIN',
      text: department[1],
    },
    {
      id: department.MARKETING,
      enumKey: 'MARKETING',
      text: department[2],
    },
    {
      id: department.TECHNICIANS,
      enumKey: 'TECHNICIANS',
      text: department[3],
    },
    {
      id: department.ACCOUNTING_AND_FINANCE,
      enumKey: 'ACCOUNTING_AND_FINANCE',
      text: department[4],
    },
    {
      id: department.INVENTORY,
      enumKey: 'INVENTORY',
      text: department[5],
    },
    {
      id: department.CUSTOMER_SERVICE,
      enumKey: 'CUSTOMER_SERVICE',
      text: department[6],
    },
    {
      id: department.PROJECT_MANAGEMENT,
      enumKey: 'PROJECT_MANAGEMENT',
      text: department[7],
    },
  ];
  
  const refs = Array.from({ length: allDepartments.length }, () => useRef(null));


  useEffect(() => {
    checkResponse();
  }, [response]);

  function checkResponse() {
    if (response) {
      setNewCircular({
        title: '',
        content: '',
        to_whom: [],
      });

      refs.forEach(ref => {
        if (ref.current.checked) ref.current.checked = false;
      });
    }
  }

  function toastSuccess() {
    setResponse(true);
    toast.success('Circular Saved Successfully');
  }

  function toastError(error) {
    setErrors(error);
    toast.error('Not Saved');
  }

  function submitNewCircular(e) {
    e.preventDefault();
    requestHandler.post(
      '/api/circular',
      newCircular,
      toastSuccess,
      toastError,
      loaderSetter
    );
  }

  function handleChange(e) {
    if (e.target.name == 0) {
      if (e.target.checked) {
        refs.forEach(ref => ref.current.checked = true);
        setNewCircular({...newCircular, to_whom: ['1', '2', '3', '4', '5', '6', '7']})
      } else {
        refs.forEach(ref => {
          if (ref.current.checked) ref.current.checked = false;
        });
        setNewCircular({...newCircular, to_whom: []})
      }
    } else {
      if (e.target.checked) {
        setNewCircular({...newCircular, to_whom: [...newCircular.to_whom, e.target.name]})
      } else {
        const editedArr = newCircular.to_whom.filter(elem =>  elem !== e.target.name);
        setNewCircular({...newCircular, to_whom: editedArr});
      }
    }
  }

  return (
    <SideNav >
      <div className='p-1 md:p-5 sm:p-3 w-full'>
        <form className='space-y-4 sm:p-8' action='#'>
          <div>
            <label
              htmlFor='title'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Title
            </label>
            <input
              type='text'
              name='title'
              id='circularTitle'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none'
              placeholder='Enter a title'
              value={newCircular.title}
              onChange={e => handleFormChange(e, newCircular, setNewCircular)}
              required
            />
            {(errors.title || errors.errors?.title) && (
              <p className='text-red-500 my-1 py-2'>
                {displayErrors(errors, 'title')}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='content'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Content
            </label>
            <textarea
              id='content'
              rows='4'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
              placeholder='Circular content...'
              name='content'
              onChange={e => handleFormChange(e, newCircular, setNewCircular)}
              value={newCircular.content}
            />
            {(errors.content || errors.errors?.content) && (
              <p className='text-red-500 my-1 py-2'>
                {displayErrors(errors, 'content')}
              </p>
            )}
          </div>

          <div>
            <p className='my-3'>Which department(s) should the circular reach?</p>

            <div>
              {
                (Array.isArray(allDepartments) ? allDepartments : []).map((dep, idx) => {
                  return (
                    <div className='flex w-fit items-center my-2' key={dep.id || idx}>
                      <input
                        type="checkbox"
                        name={dep.id}
                        id={dep.enumKey}
                        ref={refs[idx]}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        onChange={(e) => handleChange(e)}
                      />
                      <label
                        htmlFor={dep.enumKey}
                        id={dep.id}
                        className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        {dep.text}
                      </label>
                    </div>
                  );
                })
              }
              {(errors.to_whom || errors.errors?.to_whom) && (
                <p className='text-red-500 my-1 py-2'>
                  {displayErrors(errors, 'to_whom')}
                </p>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800'
            onClick={e => submitNewCircular(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </SideNav>
  );
}

export default NewCircular;
