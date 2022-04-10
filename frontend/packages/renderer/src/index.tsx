import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Worker } from '@react-pdf-viewer/core';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js">
            <Provider store={store}>
                <App />
            </Provider>
        </Worker>
    </React.StrictMode>,
    document.getElementById('root')
)
