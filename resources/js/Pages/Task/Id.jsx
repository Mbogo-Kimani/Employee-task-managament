import React, { useEffect, useRef, useState } from 'react'
import { pageData as defaultPageData, navItemsDeterminer } from '../../data/indexNav'
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import Icon from '../../Components/Common/Icon';
import MessageElem from '../../Components/Task/MessageElem';
import { toast } from 'react-toastify';

function Id({ user }) {
  const [navItems, setNavItems] = useState(defaultPageData);
  const [currentTask, setCurrentTask] = useState({
    admin: {},
    department_head: {},
    handler: {},
    task: {},
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [scrolls, setScrolls] = useState(0);
  const messagesEnd = useRef(null);
  const chatContainer = useRef(null);
  
  const channel = window.Echo.channel('public.pusherbroadcast.1');

  const taskId = window.location.pathname.split('/')[2];

  useEffect(() => {
    setNavItems(navItemsDeterminer(user?.role, user?.clearance_level));
    fetchTask();
    fetchMessages();
  }, []);

  useEffect(() => {
    handleScrollToBottom()
  }, [messages])

  useEffect(() => {
    channel.subscribed(() => {
      console.log('subscribed');
    }).listen('.chat', (event) => {
      console.log(event.message);
      if (event.message && typeof(event.message) === 'string') {
        setMessages((prev) => [...prev, JSON.parse(event.message)]);
        scrollToLastMessage();
      }
    })
    return () => channel.unsubscribe('.chat');
  }, []);

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

  return (
    <SideNav navItems={navItems} user={user}>
      <div className='w-full h-10'>
        <h1 className="font-bold text-xl text-center">{currentTask.task.name}</h1>
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

        <form
          onSubmit={(e) => submitMessage(e)}
          className='w-full md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)] juice:w-full shadow-md flex justify-start'
        >
          <textarea
            name="new-message"
            rows="2"
            placeholder='Enter your message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="text-white focus:scale-90 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Icon src='send' className='h-4 w-4' fill='var(--gray)'/>
          </button>
        </form>
      </div>
    </SideNav>
  )
}

export default Id;
