// client/src/pages/View.jsx
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useFetch from '../useFetch';
import { faCalendar, faMapLocationDot, faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/view.css";
import axios from "axios";
import { AuthContext } from "../authContext";

const View = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { user } = useContext(AuthContext);
    const { data, loading, error, reFetch } = useFetch(`http://majorcapstone.onrender.com/api/entries/${id}`);
    const [slideNumber, setSlideNumber] = useState(0);
    
    // State for the update fields
    const [title, setTitle] = useState('');
    const [locationField, setLocationField] = useState('');
    const [text, setText] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Track editing state

    const navigate = useNavigate();

    // Effect to set initial state from fetched data
    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setLocationField(data.location);
            setText(data.text);
        }
    }, [data]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://majorcapstone.onrender.com/api/entries/${data._id}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        let size = data.photos.length;
        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? size - 1 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === size - 1 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNumber);
    };

    const handleSave = async () => {
        try {
            const updatedEntry = {
                title,
                location: locationField,
                text,
            };

            await axios.put(`http://majorcapstone.onrender.com/api/entries/${data._id}`, updatedEntry);
            
            // Re-fetch the data to get the latest state
            await reFetch(); // Call reFetch method to refresh the data
            setIsEditing(false); // Exit editing mode

            // Clear input fields after successful update
            setTitle('');
            setLocationField('');
            setText('');
        } catch (err) {
            console.log(err);
            // Optionally show an error message
        }
    };

    return (
        <div className='view'>
            <Navbar />
            <div className="postPageBG">
                <div className="upperContent">
                    <h1>{data ? title : ''}</h1> {/* Use updated title here */}
                    <p><FontAwesomeIcon className="icon" icon={faCalendar} /> {data ? data.date : ''}</p>
                    <p><FontAwesomeIcon className="icon" icon={faMapLocationDot} /> {locationField}</p> {/* Use updated location here */}
                </div>
            </div>

            <div className="postContainer">
                <div className="leftContainer">
                    {data.photos ? (
                        <div className="images">
                            <img src={data.photos[slideNumber]} height="300px" alt="" />
                            {data.photos.length > 1 && (
                                <div className="arrows">
                                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
                                </div>
                            )}
                        </div>
                    ) : "no Images"}
                </div>

                <div className="rightContainer">
                    <p>" {text} "</p> {/* Use updated text here */}
                    <button className="del_button" style={{ marginRight: "5px" }} onClick={handleDelete}>Delete</button>

                    {/* Input fields for updating only if in editing mode */}
                    {isEditing && (
                        <>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Update Title"
                            />
                            <input
                                type="text"
                                value={locationField}
                                onChange={(e) => setLocationField(e.target.value)}
                                placeholder="Update Location"
                            />
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Update Text"
                            />
                            <button className="save_button" onClick={handleSave}>
                                Save
                            </button>
                        </>
                    )}

                    {/* Button to toggle editing mode */}
                    <button className="update_button" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default View;
