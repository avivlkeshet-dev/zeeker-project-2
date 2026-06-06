import React from 'react'
import Header from '../components/Files/header.jsx'
import MyDocs from '../components/Files/MyDocs.jsx'
import Document from '../components/Files/Document.jsx'
import Titles from '../components/Files/Titles.jsx'
import Button from '../components/Files/Button.jsx'

function Pages() {
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