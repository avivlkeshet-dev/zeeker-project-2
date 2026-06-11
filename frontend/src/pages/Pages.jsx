import React from 'react'
import Header from '../components/Files/header.jsx'
import MyDocs from '../components/Files/MyDocs.jsx'
import Document from '../components/Files/Document.jsx'
import Titles from '../components/Files/Titles.jsx'
import Button from '../components/Files/Button.jsx'
import FilesFull from '../components/Files/FilesFull.jsx'
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
          <FilesFull />
        </div>
    )
}

export default Pages;