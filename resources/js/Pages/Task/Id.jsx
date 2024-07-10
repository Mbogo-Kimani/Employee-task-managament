import React, { useEffect, useRef, useState } from 'react'
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import Icon from '../../Components/Common/Icon';
import MessageElem from '../../Components/Task/MessageElem';

function Id({ user }) {
  const [currentTask, setCurrentTask] = useState({
    admin: {},
    department_head: {},
    handler: [],
    task: {},
    client: {},
    can_edit: false,
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [scrolls, setScrolls] = useState(0);
  const [textareaHeight, setTextareaHeight] = useState(1);

  const messagesEnd = useRef(null);
  const chatContainer = useRef(null);
  
  const taskId = window.location.pathname.split('/')[2];

  useEffect(() => {
    fetchTask();
    fetchMessages();
  }, []);

  useEffect(() => {
    handleScrollToBottom()
  }, [messages])

  // useEffect(() => {
  //   const channel = window.Echo.channel('private.taskmessagechat.1');

  //   channel.subscribed().listen('.chat', (event) => {
  //     if (event.message && typeof(event.message) === 'string') {
  //       setMessages((prev) => [...prev, JSON.parse(event.message)]);
  //       scrollToLastMessage();
  //     }
  //   })
  //   return () => channel.unsubscribe('.chat');
  // }, []);

  function handleScrollToBottom() {
    if (messages.length && !scrolls) {
      scrollToLastMessage();
      setScrolls(1);
    }
  }

  function fetchTask() {
    requestHandler.get(`/api/get_task/${taskId}`, setCurrentTask);
  }

  function fetchMessages() {
    requestHandler.get(`/api/task_messages/${taskId}`, setMessages);
  }

  function submitMessage(e) {
    e.preventDefault();
    if (newMessage) {
      requestHandler.post('/api/messages', {message: newMessage, taskId: taskId});
      setNewMessage('');
    } else {
      toast.error('Cannot send an empty message');
    }
  }

  function scrollToLastMessage() {
    if (messagesEnd.current) {
      const bottomOffset = messagesEnd.current.getBoundingClientRect().top;

      if (messagesEnd.current.getBoundingClientRect().top > chatContainer.current.getBoundingClientRect().bottom) {
        chatContainer.current.scrollTo({
          top: bottomOffset,
          behavior: 'smooth',
        });
      }
    }
  }

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
    const { scrollHeight, clientHeight } = event.target;
    const newHeight = Math.min(5 * parseInt(getComputedStyle(event.target).lineHeight), scrollHeight);
    
    if (newHeight > clientHeight) {
      if (textareaHeight <= 5) setTextareaHeight((prev) => prev + 1);
    } else {
      if (textareaHeight > 1) setTextareaHeight((prev) => prev - 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      
      submitMessage(event);
    } else if (event.key === 'Enter' && event.shiftKey) {
      
      event.preventDefault();
      setNewMessage((prevValue) => prevValue + '\n');
    }
  };

  return (
    <SideNav>
      <div className='w-full'>
          <h1 className="font-bold text-xl text-lg text-center pl-3 mb-10">{currentTask.task?.name}</h1>
          <div className='flex float-right'>
            <span className='mr-1'>{currentTask.task?.from_date ?? ''}</span> - <span className='ml-1'>{currentTask.task?.from_date ?? ''}</span>
          </div>
          <div className='mb-5 '>
            <h1 className='font-normal text-lg'>Handlers</h1>
            <ol className='border rounded w-[40vw]'>
              {
                (Array.isArray(currentTask.handler) ? currentTask.handler : []).map((taskHandler, ind) => {
                  return (
                    <li key={taskHandler.id || ind} className="font-normal text-lg pl-3">- {taskHandler.name ?? ''}</li>
                  )
                })
              }
            </ol>
          </div>

          <h1 className='font-normal text-lg'>Description</h1>
          <div className='border h-[30vh] mb-5 rounded'>
             <h1 className="font-normal text-lg pl-3">{currentTask.task?.description || ''}</h1>
          </div>
      </div>
      <div>
       <h1 className='font-normal text-lg underline'>Reviewers</h1>
        <div className='flex'>
            <h1 className='italic text-lg'>Admin:</h1>
            <h1 className="font-normal text-lg text-center pl-3">{currentTask.admin?.name ?? 'N/A'}</h1>
        </div>
        <div className='flex'>
            <h1 className='italic text-lg'>Department Head:</h1>
            <h1 className="font-normal text-lg text-center pl-3">{currentTask.department_head?.name ?? 'N/A'}</h1>

        </div>
      </div>

      <div className="py-3 text-center">
        <p className="font-bold text-xl text-cyan-500">CHATS</p>
      </div>

      <div className="w-full">
        <div className="w-full rounded-md bg-white dark:bg-gray-900 h-[calc(100vh-200px)] overflow-y-scroll" ref={chatContainer}>
          {
            (Array.isArray(messages) ? messages : []).map((message, index) => {
              return (
                <MessageElem 
                  message={message} 
                  key={message.id || index} 
                  task={currentTask}
                  user={user}
                />
              )
            })
          }
          <div ref={messagesEnd} />
        </div>

        {
          (currentTask.can_edit) ?
          <form
            onSubmit={(e) => submitMessage(e)}
            className='w-full md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)] juice:w-full shadow-md flex justify-start'
          >
            <textarea
              name='new-message'
              value={newMessage}
              placeholder='Enter your message'
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              rows={textareaHeight}
              style={{ resize: 'none' }}
            />
            <button
              type="submit"
              className="text-white focus:scale-90 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Icon src='send' className='h-4 w-4' fill='var(--gray)'/>
            </button>
          </form>
          :
          <h1 className="text-lg text-gray-400 text-center">Cannot reply in this conversation</h1>
        }
      </div>
    </SideNav>
  )
}

export default Id;
