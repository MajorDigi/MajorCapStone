// client/src/pages/Create.jsx
import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from '../authContext';
import "../styles/create.css";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Create = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

    // Set the state to the data user passed 
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleFilesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 3) {
            alert("You can only upload a maximum of 3 images.");
            return;
        }
        setFiles(selectedFiles);
    };

    // Post the state to the database
    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);

        let newEntry;

        if (files.length > 0) {
            try {
                if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
                    console.error('Cloudinary cloud name is not defined in the environment variables.');
                    return; 
                }

                const list = await Promise.all(files.map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload"); // Your upload preset

                    const uploadRes = await axios.post(
                        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, 
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                }));

                newEntry = {
                    ...info, author: user._id, photos: list
                };
            } catch (error) {
                console.error('Error uploading images:', error);
                setLoading(false);
                return; // Exit if upload fails
            }
        } else {
            newEntry = {
                ...info, author: user._id
            };
        }

        try {
            const response = await axios.post('http://localhost:5500/api/entries/', newEntry);
            navigate(`/view/${response?.data?._id}`);
        } catch (err) {
            console.log('Error creating entry:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file));
        };
    }, [files]);

    return (
        <div className='create'>
            <Navbar />
            <div className="createContainer">
                <div className="picsContainer">
                    <div className="formInput">
                        <h2>Upload Images (Max 3)</h2>
                        <label htmlFor="file">
                            <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                        </label>
                        <input
                            type="file"
                            id="file"
                            multiple
                            onChange={handleFilesChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="uploadedPictures">
                        {files.map((file, index) => (
                            <div className="upload_pic" key={index}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    height="80px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input">
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="title"
                        placeholder="Enter Title"
                    />
                </div>
                <div className="input">
                    <label htmlFor="location">Location</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                    />
                </div>

                <div className="input">
                    <label htmlFor="date">What is the Date</label>
                    <input
                        onChange={handleChange}
                        type="date"
                        id="date"
                        placeholder="Choose Date"
                    />
                </div>

                <div className="input">
                    <label htmlFor="text">Write your thoughts..</label>
                    <textarea
                        name='entry'
                        id='text'
                        cols="150"
                        rows='25'
                        onChange={handleChange}
                        autoFocus
                    ></textarea>
                </div>

                <button className='createBtn' onClick={handleClick} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Entry'}
                </button>
            </div>
        </div>
    );
}

export default Create;
