import React, { useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import Modal from '../../Components/Common/Modal';
import Icon from '../../Components/Common/Icon';
import requestHandler from '../../services/requestHandler';

const Tickets = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientNumber: '',
    dueDate: '',
    priority: 'medium',
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Handle form submission
    console.log('Submitting ticket:', formData);
    setError('');
    requestHandler.post('/api/hotspot/tickets');
  };
    
  return (
    <HotspotLayout>
      <button
        className='float-right w-[8rem] rounded bg-blue-500 text-white p-3'
        onClick={() => setShowModal(!showModal)}
      >
        Add New Ticket
      </button>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
        <TableComp
          columns={[
            'Name',
            'Duration',
            'Devices',
            'Cost',
            'Description',
            'Action',
          ]}
        >
        </TableComp>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className=''>
          <div className='bg-white rounded-lg shadow-lg w-full px-8 pb-8 mt-20'>
            <div className='flex items-center space-x-3 mb-6'>
              <Icon src='ticket' className='w-6 mr-2' fill='rgb(33 150 243)' />
              <h1 className='text-2xl font-bold text-blue-500'>
                Create Ticket
              </h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-7'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Title
                </label>
                <div className='relative rounded-md shadow-sm border'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    {/* <TicketIcon className="h-5 w-5 text-gray-400" /> */}
                  </div>
                  <input
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                    className='block w-full pl-5 pr-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter ticket title'
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  className='block w-full px-5 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  rows={3}
                  placeholder='Describe the issue'
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='clientName'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Client Phone Number
                </label>
                <div className='relative rounded-md shadow-sm border'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    {/* <UserIcon className="h-5 w-5 text-gray-400" /> */}
                  </div>
                  <input
                    type='text'
                    id='clientNumber'
                    name='clientNumber'
                    value={formData.clientNumber}
                    onChange={handleInputChange}
                    className='block w-full pl-5 pr-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Enter client number'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='dueDate'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Due Date
                  </label>
                  <div className='relative rounded-md shadow-sm border'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      {/* <CalendarIcon className="h-5 w-5 text-gray-400" /> */}
                    </div>
                    <input
                      type='date'
                      id='dueDate'
                      name='dueDate'
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className='block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='priority'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Priority
                  </label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      {/* <ClockIcon className="h-5 w-5 text-gray-400" /> */}
                    </div>
                    <select
                      id='priority'
                      name='priority'
                      value={formData.priority}
                      onChange={handleInputChange}
                      className='block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    >
                      <option value='low'>Low</option>
                      <option value='medium'>Medium</option>
                      <option value='high'>High</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </HotspotLayout>
  );
};

export default Tickets;
