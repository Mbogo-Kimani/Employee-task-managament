import React from 'react'

function TableComp({ columns, children }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {
          (Array.isArray(columns) ? columns : []).map((column, index) => {
            return (
              <th scope='col' key={ index || column } className="px-2 py-3">
                { column }
              </th>
            )
          })
        }
        </tr>
      </thead>
      <tbody>
        { children }
      </tbody>
    </table>
  )
}

export default TableComp;
