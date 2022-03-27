import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = () => {

    const [filePath, setFilePath] = React.useState("");

    return (
        <div className="w-full select-text">
            <Viewer fileUrl={`app://getMediaFile/D:\\Desktop\\School\\Readings\\BrayGT.pdf`} />
        </div>
    );
}
// https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf
export default PdfViewer;