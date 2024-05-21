import React,{useState} from 'react'
import {taskStatusKeys as taskStatus} from '../../data/enums/taskStatus';
import SelectComp from '../../Components/Common/SelectComp';
import i18next from '../../i18n'
import departmentsEnum from '../../data/enums/department';



const SortElem = ({sortParams,filterFn}) => {
  const [filters, setFilters] = useState({});

  function handleFilters(e){
    console.log(Object.keys(filters).includes('departmentId'))
    setFilters({...filters, [e.target.name]: e.target.value})
  }

  return (
    <div>
        <div className="flex space-x-4">
        { Object.keys(sortParams).includes('departmentId') && <SelectComp
        name="departmentId"
        id="departmentId"
        className={`focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${Object.keys(filters).includes('departmentId') ? "bg-green-400" : "bg-transparent"}`}
        onChange={(e) => handleFilters(e)}
        >
            <option value="" className={`bg-transparent text-gray-900 dark:text-red-300 `}>{i18next.t('departments')}</option>
            {
            (Array.isArray(sortParams.departmentId) ? sortParams.departmentId : []).map((type, index) => {
                return (
                <option
                    key={ type.id || index }
                    value={ departmentsEnum[type.enum_key] }
                    className='text-gray-900'
                >
                    { type.name }
                </option>
                )
            })
            }
        </SelectComp>}
           { Object.keys(sortParams).includes('type') && <SelectComp
              name="type"
              id="taskType"
              // value={newTask.taskType}
              onChange={(e) => handleFilters(e)}
              required={true}
              className={`focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${Object.keys(filters).includes('type') ? "bg-green-400" : "bg-transparent"}`}
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>{i18next.t('task-types')}</option>
              {
                (Array.isArray(sortParams.type) ? taskTypes : [red]).map((type, index) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ type.id || index }
                      value={ type.id }
                      title={ type.description || '' }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { type.name }
                    </option>
                  )
                })
              }
            </SelectComp>}
            <SelectComp
              name="status"
              id="status"
              // value={newTask.taskType}
              onChange={(e) => handleFilters(e)}
              required={true}
              className={`focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${Object.keys(filters).includes('status') ? "bg-green-400" : "bg-transparent"}`}
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>{i18next.t('task-status')}</option>
              {
                Object.keys(taskStatus).map((key) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ key }
                      value={ key }
                      title={ key }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { taskStatus[key]}
                    </option>
                  )
                })
              }
            </SelectComp>
            <button
              className={`bg-green-400 to-green-300 hover:from-green-500 hover:to-green-600 px-4 py-2 rounded-md `}
              onClick={(e) => filterFn(e)}
            >
              {i18next.t('filters')}({Object.keys(filters).length})
            </button>
        </div>
    </div>
  )
}

export default SortElem