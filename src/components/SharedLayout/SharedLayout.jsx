// SharedLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SharedLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}
