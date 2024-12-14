import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header/Header';
import './View.css';
import { useNavigate } from 'react-router-dom';

const View = () => {
    const navigate = useNavigate();

    const [record, setRecord] = useState([]);
    const [filterrecord, setFilterRecord] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        setRecord(data);
        setFilterRecord(data);
    }, []);
 
    const handleDelete = (id) => {
        const deleteRecords = record.filter(item => item.id !== id);
        localStorage.setItem("users", JSON.stringify(deleteRecords));
        setRecord(deleteRecords);
        setFilterRecord(deleteRecords);
        toast.error("User deleted successfully!");
    };

    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <table className='shadow table-stripped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Password</th>
                                <th>City</th>
                                <th>Salary</th>
                                <th>Degignation</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {filterrecord.map((val) => {
                                const { id, name, email, password, city, salary, deignation } = val;
                                return (
                                    <tr key={id}>

                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{"*".repeat(password.length)}</td>
                                        <td>{city}</td>
                                        <td>{salary}</td>
                                        <td>{deignation}</td>
                                        <td>
                                            <button className="btn btn-warning px-3" onClick={() => navigate('/edit', { state: val })}>Edit</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default View;
