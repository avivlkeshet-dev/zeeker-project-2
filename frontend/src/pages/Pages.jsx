import React from 'react'
import Header from '../components/Files/header.jsx'
import MyDocs from '../components/Files/MyDocs.jsx'
import Document from '../components/Files/Document.jsx'
import Titles from '../components/Files/Titles.jsx'
import Button from '../components/Files/Button.jsx'
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
            <Titles />
            <Document />
            <Document />
            <Button />
        </div>
    )
}

export default Pages;