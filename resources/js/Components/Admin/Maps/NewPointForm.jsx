import React, { useEffect, useState } from 'react'
import Modal from '../../Common/Modal';
import { displayErrors, handleFormChange } from '../../../data/utils';
import Icon from '../../Common/Icon';
import { toast } from 'react-toastify';
import requestHandler from '../../../services/requestHandler';

function NewPointForm({ show, onClose, fetchPoints }) {
  const [newPoint, setNewPoint] = useState({
    longitude: '',
    latitude: '',
  });
  const [errors, setErrors] = useState({});
  const [clipboardOptionClicked, setClipboardOptionClicked] = useState(false);
  const [clipboardContent, setClipboardContent] = useState('');
  const [response, setResponse] = useState(false);

  useEffect(() => {
    checkResponse();
  }, [response]);

  function checkResponse() {
    if (response) {
      toast.success('Point added successfully');
      setNewPoint({
        longitude: '',
        latitude: '',    
      });
      fetchPoints();
      onClose();
    }
  }

  function parseCoordinate(point = '') {
    const textEnd = point[point.length - 1];
    if (textEnd === 'W' || textEnd === 'S') return -parseFloat(point);
    else if (textEnd === 'E' || textEnd === 'N') return parseFloat(point);
  }

  function parseClipboard(text = '') {
    if (text.split(' ').length === 2) {
      const lat = text.split(' ')[0];
      const long = text.split(' ')[1];
      const latEnd = lat[lat.length - 1];
      const longEnd = long[long.length - 1];

      if ((latEnd === 'S' || latEnd === 'N') && (longEnd === 'E' || longEnd === 'W')) {
        toast.success('Copied from clipboard');
        setNewPoint({latitude: parseCoordinate(lat), longitude: parseCoordinate(long)});        
      }
    }
  }

  async function processClipboardOption() {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setClipboardOptionClicked(true);
        setTimeout(() => {
          setClipboardOptionClicked(false);
        }, 4000);
        
        parseClipboard(text);
        setClipboardContent(text);
      }
    } catch (error) {
      toast.error('Failed to copy from clipboard, please enable clipboard permissions');
    }
  }

  function submitNewPoint(e) {
    e.preventDefault();
    requestHandler.post('/api/map_points', newPoint, setResponse, setErrors);
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
        <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
          <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <span>
                <Icon src='pin' fill='#f00' className='mx-3 h-5 w-5 opacity-80'/>
              </span>
              Register New Point
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
              <div className="flex justify-end items-center">
                <span
                  className={`text-md rounded-lg px-2 py-1 ${clipboardOptionClicked ? 'bg-green-500 text-gray-900' : 'bg-gray-100 text-gray-700'}`}
                  onClick={processClipboardOption}
                >
                  Paste from clipboard
                </span>
              </div>
              <div className="flex justify-around items-center">
                <div>
                  <label
                    htmlFor="longitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter longitude"
                    value={newPoint.longitude}
                    onChange={(e) => handleFormChange(e, newPoint, setNewPoint)}
                    required
                  />
                  
                </div>

                <div>
                  <label
                    htmlFor="latitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter latitude"
                    value={newPoint.latitude}
                    onChange={(e) => handleFormChange(e, newPoint, setNewPoint)}
                    required
                  />
                </div>
              </div>
              {
                (errors.longitude || errors.errors?.longitude) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'longitude') }
                </p>
              }

              {
                (errors.latitude || errors.errors?.latitude) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'latitude') }
                </p>
              }
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                onClick={(e) => submitNewPoint(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewPointForm;
