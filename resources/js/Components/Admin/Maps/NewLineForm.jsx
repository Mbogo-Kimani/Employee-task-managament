import React, { useEffect, useState } from 'react'
import Modal from '../../Common/Modal';
import Icon from '../../Common/Icon';
import { displayErrors, handleFormChange } from '../../../data/utils';
import requestHandler from '../../../services/requestHandler';
import { toast } from 'react-toastify';

function NewLineForm({ show, onClose, fetchLines }) {
  const [newLine, setNewLine] = useState({
    pointALongitude: '',
    pointALatitude: '',
    pointBLongitude: '',
    pointBLatitude: '',
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);
  const [startPointClipboardClicked, setStartPointClipboardClicked] = useState(false);
  const [endPointClipboardClicked, setEndPointClipboardClicked] = useState(false);
  const [clipboardContent, setClipboardContent] = useState('');

  useEffect(() => {
    checkResponse();
  }, [response]);

  function parseCoordinate(point = '') {
    const textEnd = point[point.length - 1];
    if (textEnd === 'W' || textEnd === 'S') return -parseFloat(point);
    else if (textEnd === 'E' || textEnd === 'N') return parseFloat(point);
  }

  function parseClipboard(text = '', position = 'start') {
    if (text.split(' ').length === 2) {
      const lat = text.split(' ')[0];
      const long = text.split(' ')[1];
      const latEnd = lat[lat.length - 1];
      const longEnd = long[long.length - 1];

      if ((latEnd === 'S' || latEnd === 'N') && (longEnd === 'E' || longEnd === 'W')) {
        toast.success('Copied from clipboard');
        if (position === 'start') {
          setNewLine({...newLine, pointALatitude: parseCoordinate(lat), pointALongitude: parseCoordinate(long)});
        }
        else if (position === 'end') {
          setNewLine({...newLine, pointBLatitude: parseCoordinate(lat), pointBLongitude: parseCoordinate(long)});
        }
      }
    }
  }

  async function processClipboardOption(point = 'start') {
    try {
      const text = await navigator.clipboard.readText();
      
      if (text) {
        if (point === 'start') {
          setStartPointClipboardClicked(true);
          setTimeout(() => {
            setStartPointClipboardClicked(false);
          }, 4000);
        } else if (point === 'end') {
          setEndPointClipboardClicked(true);
          setTimeout(() => {
            setEndPointClipboardClicked(false);
          }, 4000);
        }
        parseClipboard(text, point);
        setClipboardContent(text);
      }
    } catch (error) {
      toast.error('Failed to copy from clipboard, please enable clipboard permissions');
    }
  }

  function checkResponse() {
    if (response) {
      toast.success('Coordinates added successfully');
      setNewLine({
        pointALongitude: '',
        pointALatitude: '',
        pointBLongitude: '',
        pointBLatitude: '',
      });
      fetchLines();
    }
  }

  function submitNewLine(e) {
    e.preventDefault();
    requestHandler.post('/api/map_lines', newLine, setResponse, setErrors);
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
        <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
          <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <span>
                <Icon src='lines' fill='#000' className='mx-3 h-5 w-5 opacity-80'/>
              </span>
              Register New Line
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-1 md:p-5 sm:p-3 w-full">
            <form className="space-y-4 sm:p-8" action="#">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">
                  Start Point
                </h1>
                <span
                  className={`text-md rounded-lg px-2 py-1 ${startPointClipboardClicked ? 'bg-green-500 text-gray-900' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => processClipboardOption('start')}
                > 
                  Paste from clipboard
                </span>
              </div>
              <div className="flex justify-around items-center">
                <div>
                  <label
                    htmlFor="pointALongitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="pointALongitude"
                    id="longitudeA"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter longitude"
                    value={newLine.pointALongitude}
                    onChange={(e) => handleFormChange(e, newLine, setNewLine)}
                  />
                  
                </div>

                <div>
                  <label
                    htmlFor="pointALatitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="pointALatitude"
                    id="latitudeA"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter latitude"
                    value={newLine.pointALatitude}
                    onChange={(e) => handleFormChange(e, newLine, setNewLine)}
                  />
                </div>
              </div>
              {
                (errors.pointALongitude || errors.errors?.pointALongitude) && 
                <p className="text-red-500 my-1 py-1">
                  { displayErrors(errors, 'pointALongitude') }
                </p>
              }
              {
                (errors.pointALatitude || errors.errors?.pointALatitude) && 
                <p className="text-red-500 my-1 py-1">
                  { displayErrors(errors, 'pointALatitude') }
                </p>
              }

              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">
                  End Point
                </h1>
                <span
                  className={`text-md rounded-lg px-2 py-1 ${endPointClipboardClicked ? 'bg-green-500 text-gray-900' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => processClipboardOption('end')}
                >
                  Paste from clipboard
                </span>
              </div>
              <div className="flex justify-around items-center">
                <div>
                  <label
                    htmlFor="pointBLongitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="pointBLongitude"
                    id="longitudeB"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter longitude"
                    value={newLine.pointBLongitude}
                    onChange={(e) => handleFormChange(e, newLine, setNewLine)}
                  />
                  
                </div>

                <div>
                  <label
                    htmlFor="pointBLatitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="pointBLatitude"
                    id="latitudeB"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter latitude"
                    value={newLine.pointBLatitude}
                    onChange={(e) => handleFormChange(e, newLine, setNewLine)}
                  />
                </div>
              </div>

              {
                (errors.pointBLatitude || errors.errors?.pointBLatitude) && 
                <p className="text-red-500 my-1 py-1">
                  { displayErrors(errors, 'pointBLatitude') }
                </p>
              }
              {
                (errors.pointBLongitude || errors.errors?.pointBLongitude) && 
                <p className="text-red-500 my-1 py-1">
                  { displayErrors(errors, 'pointBLongitude') }
                </p>
              }
              <div className="w-full flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                  onClick={(e) => submitNewLine(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewLineForm;
