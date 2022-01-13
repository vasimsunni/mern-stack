import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link m-2" to={`/edit/${props.record._id}`}>Edit</Link>
            <button className="btn btn-link m-2"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {

    const [records, setRecords] = useState([]);

    // Fetch record using API

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);


    // To delete record using API
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    };


    // Mapping records to html table
    function recordList() {
        return records.map((record) => {
            return (
                <Record record={record} deleteRecord={() => deleteRecord(record._id)} key={record._id} />
            )
        })
    }


    // This following section will display the table with the records of individuals.
    return (
        <div className="container mt-5">
            <h3>Record List</h3>
            <div className="text-right">
                <a href="/create">Create a record</a>
            </div>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {recordList()}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
}