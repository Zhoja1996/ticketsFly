import { createRoot } from 'react-dom/client';
import '../App/App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import AppRouter from './AppRouter';

// 👇 Импортируем toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <>
      <RouterProvider router={AppRouter} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  </Provider>
);