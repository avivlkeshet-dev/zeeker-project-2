import React from 'react'
import Header from '../components/Files/header.jsx'
import MyDocs from '../components/Files/MyDocs.jsx'
import Document from '../components/Files/Document.jsx'
import Titles from '../components/Files/Titles.jsx'
import Button from '../components/Files/Button.jsx'
import FilesFull from '../components/Files/FilesFull.jsx'
import OrderTitles from '../components/Files/OrderTitle.jsx'
import { useEffect } from 'react'

function Pages() {
        useEffect(() => {
      document.body.classList.add('pages-page');
      const previousBodyBackground = document.body.style.backgroundColor;
      const previousHtmlBackground = document.documentElement.style.backgroundColor;
      document.body.style.backgroundColor = '#000';
      document.documentElement.style.backgroundColor = '#000';

      return () => {
        document.body.classList.remove('pages-page');
        document.body.style.backgroundColor = previousBodyBackground;
        document.documentElement.style.backgroundColor = previousHtmlBackground;
      };
    }, []);
    return (
        <div className="min-vh-100 w-100" style={{ backgroundColor: '#000' }}>
          <Header />
          <MyDocs />
          <Document />
          <Document />
          <Document />
          <Titles />
          <Document />
          <OrderTitles />
          <Document />
          <Button />
        </div>
    )
}

export default Pages;