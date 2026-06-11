import FilesFull from '../components/Files/FilesFull.jsx'
import Titles from '../components/Files/Titles.jsx'
import MyDocs from '../components/Files/MyDocs.jsx'
import Header from '../components/Files/header.jsx'
import Document from '../components/Files/Document.jsx'
import Button from '../components/Files/Button.jsx'
import OrderTitles from '../components/Files/OrderTitle'
import { useEffect } from 'react'

function Pages() {
        useEffect(() => {
      document.body.classList.add('pages-page');
    
      return () => {
        document.body.classList.remove('pages-page');
      };
    }, []);
    return (
        <div>
          <Header />
          <MyDocs />
          <Document />
          <Document />
          <Document />
          <Titles />
          <Document />
          <OrderTitles />
          <Document />
          <Document />
          <Button />
        </div>
    )
}

export default Pages;