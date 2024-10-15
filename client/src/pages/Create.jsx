// client/src/pages/Create.jsx

import React, { useContext, useState } from 'react'
import axios from "axios"
import { AuthContext } from '../authContext';
import "../styles/create.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/create.css"

const Create = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});

    // set the usestate to the data user passed 
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    // post the usestate to database
    const handleClick = async (e) => {
        e.preventDefault();

        var newEntry

        if (files) {
            const list = await Promise.all(Object.values(files).map(async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload")
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/<your_cloudinary_key>/image/upload",
                    data, { withcredentials: false }
                )
                const { url } = uploadRes.data;
                return url;
            }))


            newEntry = {
                ...info, author: user._id, photos: list
            }

        }
        else {
            newEntry = {
                ...info, author: user._id
            }
        }


        try {
            const response = await axios.post('http://localhost:5500/api/entries/',
                newEntry, {
                withCredentials: false
            })

            navigate(`/view/${response?.data?._id}`);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='create'>
            <Navbar />
            <div className="createContainer">

                <div className="picsContainer">

                    <div className="formInput">
                        <h2>Upload Images (Max 3)</h2>
                        <label htmlFor="file">
                            <FontAwesomeIcon
                                className="icon" icon={faPlusCircle} />
                        </label>
                        <input
                            type="file"
                            id="file"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="uploadedPictures">
                        <div className="upload_pic">
                            <img
                                src={
                                    files[0]
                                        ? URL.createObjectURL(files[0])
                                        : ""
                                }
                                alt=""
                                height="80px"
                            />
                        </div>
                        <div className="upload_pic">
                            <img
                                src={
                                    files[1]
                                        ? URL.createObjectURL(files[1])
                                        : ""
                                }
                                alt=""
                                height="80px"
                            />
                        </div>
                        <div className="upload_pic">
                            <img
                                src={
                                    files[2]
                                        ? URL.createObjectURL(files[2])
                                        : ""
                                }
                                alt=""
                                height="80px"
                            />
                        </div>
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
                    <label htmlFor="title">
                        Location
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                    />
                </div>

                <div className="input">
                    <label htmlFor="date">
                        What is the Date
                    </label>
                    <input
                        onChange={handleChange}
                        type="date"
                        id="date"
                        placeholder="Choose Date"
                    />
                </div>

                <div className="input">
                    <label htmlFor="entry">
                        Write your thoughts..
                    </label>
                    <textarea
                        name='entry'
                        id='text'
                        cols="150"
                        rows='25'
                        onChange={handleChange}
                        autoFocus
                    ></textarea>
                </div>

                <button className='createBtn'
                    onClick={handleClick}>
                    Create Entry
                </button>
            </div>
        </div>
    )
}

export default Create
