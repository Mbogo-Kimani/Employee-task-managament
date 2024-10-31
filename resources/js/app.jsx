import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Loader from './Components/Common/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'mapbox-gl/dist/mapbox-gl.css';
import './i18n';
import { router } from '@inertiajs/react';
import { AppProvider } from './appContext';
import { BrowserRouter } from 'react-router-dom';

router.on("before", (ev) => {
	ev.detail.visit.headers["Authorization"] = `Bearer ${localStorage.getItem('auth_token')}`;
  ev.detail.visit.headers["accept"] = "application/json";
});


const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'ET~NET Ltd';

function isThemeDark() {
  const body = window.document.getElementsByTagName('body')[0];
  return body.className.includes('dark');
}

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <BrowserRouter>
      <AppProvider>
      <>
        <ToastContainer
          position='top-center'
          rtl={false}
          theme={isThemeDark() ? 'dark' : 'light'}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
        />
        <Loader />
        <App {...props} />
      </>
      </AppProvider>
      </BrowserRouter>
    );
  },
});
