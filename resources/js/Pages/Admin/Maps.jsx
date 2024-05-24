import React, { useEffect, useState } from 'react'
import SideNav from "../../Layouts/SideNav";
import MapPlot from '../../Components/Admin/Maps/MapPlot';
import NewPointForm from '../../Components/Admin/Maps/NewPointForm';
import NewLineForm from '../../Components/Admin/Maps/NewLineForm';
import requestHandler from '../../services/requestHandler';

const Maps = () => {
  const [view, setView] = useState('satellite-streets-v11')
  const [newPointModal, setNewPointModal] = useState(false);
  const [newLineModal, setNewLineModal] = useState(false);
  const [mapPoints, setMapPoints] = useState([]);
  const [mapLines, setMapLines] = useState([]);

  useEffect(() => {
    fetchPoints();
    fetchLines();
  }, []);

  function fetchPoints() {
    requestHandler.get('/api/map_points', setMapPoints);
  }

  function fetchLines() {
    requestHandler.get('/api/map_lines', setMapLines);
  }

  const openNewPointModal = () => setNewPointModal(true);

  const closeNewPointModal = () => setNewPointModal(false);

  const openNewLineModal = () => setNewLineModal(true);

  const closeNewLineModal = () => setNewLineModal(false);

  return (
    <SideNav>
      <div className="flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 mx-3 text-gray-900 hover:text-gray-100"
          onClick={openNewPointModal}
        >
          Add New Point
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 mx-3 text-gray-900 hover:text-gray-100"
          onClick={openNewLineModal}
        >
          Add New Line
        </button>
      </div>

      <div className='flex justify-between w-[30vw] mb-5'>
        <button onClick={() => setView('streets-v9')} className={`w-52 border rounded mr-5 hover:bg-green-200 cursor-pointer ${view == 'streets-v9' ? "bg-green-500" : "bg-transparent"}`}>
          Street view
        </button>
        <button onClick={() => setView('satellite-streets-v11')} className={`w-52 border rounded mr-5 hover:bg-green-200 cursor-pointer ${view == 'satellite-streets-v11' ? "bg-green-500" : "bg-transparent"}`}>
          Satellite view
        </button>
      </div>

      <MapPlot view={view} mapPoints={mapPoints} mapLines={mapLines}/>
      <NewPointForm show={newPointModal} onClose={closeNewPointModal} fetchPoints={fetchPoints} />
      <NewLineForm show={newLineModal} onClose={closeNewLineModal} fetchLines={fetchLines} />
    </SideNav>
  )
}

export default Maps;
