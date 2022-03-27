import ReactDOM from 'react-dom';
import * as React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js">
      <App />
    </Worker>
  </React.StrictMode>,
  document.getElementById('root')
)
