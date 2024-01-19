import React, { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import * as XLSX from 'xlsx';

const Table = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'athlete', filter: 'agTextColumnFilter', minWidth: 200 },
        { field: 'age' },
        { field: 'country', minWidth: 180 },
        { field: 'year' },
        { field: 'date', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);

    const fileInputRef = useRef(null);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            // allow every column to be aggregated
            enableValue: true,
            // allow every column to be grouped
            enableRowGroup: true,
            // allow every column to be pivoted
            enablePivot: true,
            filter: true,
            filterParams: {
                buttons: ['apply', 'reset', 'cancel'],
                closeOnApply: true,
              },
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    const handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Extract header row and convert it to an array of column names
            const headers = rawData[0];

            // Transform the data into an array of objects with key-value pairs
            const transformedData = rawData.slice(1).map((row) => {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = row[index];
                });
                return rowData;
            });
            setRowData(transformedData)
        };

        reader.readAsBinaryString(file);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFile}
                style={{ display: 'none' }}
            />

            {/* Styled import button */}
            <button onClick={handleClick} className="import-button">
                Import Excel
            </button>

            <div className="ag-theme-quartz" style={{ width: "100%", height: 700 }}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    onGridReady={onGridReady}
                    onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
                />
            </div>
        </>
    );
};

export default Table;
