import React from 'react'
import Header from '../components/Files/header.jsx'
import MyDocs from '../components/Files/MyDocs.jsx'
import Document from '../components/Files/Document.jsx'
import Titles from '../components/Files/Titles.jsx'
import Button from '../components/Files/Button.jsx'
import FilesFull from '../components/Files/FilesFull.jsx'
import OrderTitles from '../components/Files/OrderTitle.jsx'
import './css/pages.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const formatDateForDisplay = (dateValue) => {
  if (!dateValue) {
    return 'עודכן ב- --/--/----';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return 'עודכן ב- --/--/----';
  }

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `עודכן ב- ${dd}/${mm}/${yyyy}`;
};

const buildMockDocs = () => ({
  myDocs: [
    { id: 'my-1', title: 'רישיון נהיגה', updatedAt: 'עודכן ב- 18/07/2021', isManaged: false, sectionType: 'myDocs', errorMessage: '' },
    { id: 'my-2', title: 'רישיון נהיגה', updatedAt: 'עודכן ב- 18/07/2021', isManaged: false, sectionType: 'myDocs', errorMessage: '' },
    { id: 'my-3', title: 'רישיון נהיגה', updatedAt: 'עודכן ב- 18/07/2021', isManaged: false, sectionType: 'myDocs', errorMessage: '' },
  ],
  zeekrDocs: [
    { id: 'z-1', title: 'חשבונית רכב', updatedAt: 'עודכן ב- 18/07/2021', sectionType: 'zeekrDocs', isManaged: false, errorMessage: '' },
  ],
  orderDocs: [
    { id: 'o-1', title: 'חשבונית רכב', updatedAt: 'עודכן ב- 18/07/2022', sectionType: 'orderDocs', isManaged: false, errorMessage: '' },
    { id: 'o-2', title: 'קבלת תשלום', updatedAt: 'עודכן ב- 18/07/2022', sectionType: 'orderDocs', isManaged: false, errorMessage: '' },
  ],
});

const mapApiDocumentToUi = (documentItem) => ({
  id: documentItem._id,
  title: documentItem.fileName,
  updatedAt: formatDateForDisplay(documentItem.createdAt),
  isManaged: true,
  sectionType: documentItem.fileType,
  errorMessage: '',
});

const formatMockUpdatedAtFromFile = (file) => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const sizeMb = `${(file.size / (1024 * 1024)).toFixed(1)}MB`;

  return `עודכן ב- ${dd}/${mm}/${yyyy} ,${sizeMb}`;
};

function Pages() {
    const [myDocs, setMyDocs] = useState([]);
    const [zeekrDocs, setZeekrDocs] = useState([]);
    const [orderDocs, setOrderDocs] = useState([]);
    const [documentsError, setDocumentsError] = useState('');

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

    useEffect(() => {
      const loadDocuments = async () => {
        try {
          const userId = localStorage.getItem('userId');

          if (!userId) {
            throw new Error('משתמש לא מחובר, מוצגים נתוני הדגמה');
          }

          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents/${userId}`);
          const documents = Array.isArray(response.data) ? response.data : [];

          if (documents.length === 0) {
            const mockData = buildMockDocs();
            setMyDocs(mockData.myDocs);
            setZeekrDocs(mockData.zeekrDocs);
            setOrderDocs(mockData.orderDocs);
            setDocumentsError('');
            return;
          }

          const mappedDocs = documents.map(mapApiDocumentToUi);

          setMyDocs(mappedDocs.filter((doc) => doc.sectionType === 'myDocs'));
          setZeekrDocs(mappedDocs.filter((doc) => doc.sectionType === 'zeekrDocs'));
          setOrderDocs(mappedDocs.filter((doc) => doc.sectionType === 'orderDocs'));
          setDocumentsError('');
        } catch (error) {
          const message = error.response?.data?.message || error.message || 'שגיאה בטעינת מסמכים';
          setDocumentsError(message);

          const mockData = buildMockDocs();
          setMyDocs(mockData.myDocs);
          setZeekrDocs(mockData.zeekrDocs);
          setOrderDocs(mockData.orderDocs);
        }
      };

      loadDocuments();
    }, []);

    const getCurrentUserId = () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setDocumentsError('משתמש לא מחובר, נא להתחבר');
        return null;
      }
      return userId;
    };

    const getSectionSetter = (sectionType) => {
      if (sectionType === 'myDocs') return setMyDocs;
      if (sectionType === 'zeekrDocs') return setZeekrDocs;
      return null;
    };

    const handleUploadFromMyDocs = async (file) => {
      try {
        setDocumentsError('');
        const userId = getCurrentUserId();
        if (!userId) {
          throw new Error('משתמש לא מחובר, מוצגים נתוני הדגמה');
        }

        const formData = new FormData();
        formData.append('document', file);
        formData.append('userId', userId);
        formData.append('fileType', 'myDocs');

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, formData);
        const savedDocument = response.data.document;

        const appendedItem = {
          id: savedDocument._id,
          title: file.name,
          updatedAt: formatDateForDisplay(savedDocument.createdAt),
          isManaged: true,
          sectionType: 'myDocs',
          errorMessage: '',
        };

        setMyDocs((prev) => [...prev, appendedItem]);
      } catch (error) {
        const message = error.response?.data?.message || 'שגיאה בהעלאת המסמך';
        setDocumentsError(message);

        const mockFallbackItem = {
          id: `mock-${Date.now()}-${file.name}`,
          title: file.name,
          updatedAt: formatMockUpdatedAtFromFile(file),
          isManaged: false,
          sectionType: 'myDocs',
          errorMessage: message,
        };

        setMyDocs((prev) => [...prev, mockFallbackItem]);
      }
    };

    const handleDeleteDoc = async (docId, sectionType, isManaged) => {
      try {
        setDocumentsError('');
        const setDocs = getSectionSetter(sectionType);
        if (!setDocs) {
          return;
        }

        if (isManaged) {
          const userId = getCurrentUserId();
          if (!userId) {
            return;
          }

          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/documents/${docId}`, {
            data: { userId },
          });
        }

        setDocs((prev) => prev.filter((doc) => doc.id !== docId));
      } catch (error) {
        const message = error.response?.data?.message || 'שגיאה במחיקת המסמך';
        setDocumentsError(message);

        const setDocs = getSectionSetter(sectionType);
        if (setDocs) {
          setDocs((prev) =>
            prev.map((doc) =>
              doc.id === docId
                ? {
                    ...doc,
                    errorMessage: message,
                  }
                : doc
            )
          );
        }
      }
    };

    const handleReplaceDoc = async (docId, file, sectionType, isManaged) => {
      try {
        setDocumentsError('');
        const userId = getCurrentUserId();
        if (!userId) {
          throw new Error('משתמש לא מחובר, מוצגים נתוני הדגמה');
        }

        const setDocs = getSectionSetter(sectionType);
        if (!setDocs) {
          return;
        }

        const formData = new FormData();
        formData.append('document', file);
        formData.append('userId', userId);
        formData.append('fileType', 'myDocs');

        if (!isManaged) {
          const uploadResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, formData);
          const uploadedDoc = uploadResponse.data.document;

          setDocs((prev) =>
            prev.map((doc) =>
              doc.id === docId
                ? {
                    ...doc,
                    id: uploadedDoc._id,
                    title: file.name,
                    updatedAt: formatDateForDisplay(uploadedDoc.createdAt),
                    isManaged: true,
                    sectionType: 'myDocs',
                    errorMessage: '',
                  }
                : doc
            )
          );

          return;
        }

        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/documents/${docId}/replace`,
          formData
        );

        const replacedDoc = response.data.document;
        setDocs((prev) =>
          prev.map((doc) =>
            doc.id === docId
              ? {
                  ...doc,
                  title: file.name,
                  updatedAt: formatDateForDisplay(replacedDoc.createdAt),
                  isManaged: true,
                  sectionType: 'myDocs',
                  errorMessage: '',
                }
              : doc
          )
        );
      } catch (error) {
        const message = error.response?.data?.message || 'שגיאה בהחלפת המסמך';
        setDocumentsError(message);

        setDocs((prev) =>
          prev.map((doc) =>
            doc.id === docId
              ? {
                  ...doc,
                  title: file.name,
                  updatedAt: formatMockUpdatedAtFromFile(file),
                  isManaged: false,
                  sectionType: 'myDocs',
                  errorMessage: message,
                }
              : doc
          )
        );
      }
    };

    return (
        <div className="pages-shell" style={{ backgroundColor: '#000' }}>
          <Header />
          <div className="pages-content">
            {documentsError && (
              <p className="text-danger text-end mt-2 mb-2">{documentsError}</p>
            )}
            <MyDocs numOfFiles={myDocs.length} onUploadFile={handleUploadFromMyDocs} />
            {myDocs.map((doc) => (
              <Document
                key={doc.id}
                title={doc.title}
                updatedAt={doc.updatedAt}
                errorMessage={doc.errorMessage}
                showMenu={doc.sectionType !== 'orderDocs'}
                onDelete={() => handleDeleteDoc(doc.id, doc.sectionType, doc.isManaged)}
                onReplace={(file) => handleReplaceDoc(doc.id, file, doc.sectionType, doc.isManaged)}
              />
            ))}
            <Titles numOfFiles={zeekrDocs.length} />
            {zeekrDocs.map((doc) => (
              <Document
                key={doc.id}
                title={doc.title}
                updatedAt={doc.updatedAt}
                errorMessage={doc.errorMessage}
                showMenu
                onDelete={() => handleDeleteDoc(doc.id, doc.sectionType, doc.isManaged)}
                onReplace={(file) => handleReplaceDoc(doc.id, file, doc.sectionType, doc.isManaged)}
              />
            ))}
            <OrderTitles numOfFiles={orderDocs.length} />
            {orderDocs.map((doc) => (
              <Document key={doc.id} title={doc.title} updatedAt={doc.updatedAt} errorMessage={doc.errorMessage} showMenu={false} />
            ))}
            <Button />
          </div>
        </div>
    )
}

export default Pages;