// client/src/pages/Home.jsx

import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch";
import { AuthContext } from '../authContext';
import '../styles/home.css';
import Card from '../components/Card';

const Home = () => {
    const [query, setQuery] = useState("");
    const { user } = useContext(AuthContext);
    const { data, loading } = useFetch(`http://majorcapstone.onrender.com/api/entries/author/${user._id}`);

    const keys = ["title", "location", "date"];

    // Function to handle the search filtering
    const search = (data) => {
        if (!Array.isArray(data)) {
            return []; // Return empty array if data is not an array
        }
        return data.filter((item) =>
            keys.some((key) => item[key] &&
                item[key].toLowerCase().includes(query.toLowerCase()))
        );
    };

    return (
        <div>
            <Navbar />
            <div className="search">
                <div className="searchBar">
                    <h2>Explore</h2>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search places or dates"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <FontAwesomeIcon
                            className="icon"
                            icon={faMagnifyingGlass}
                        />
                    </div>
                </div>
            </div>

            <div className="searchedPosts">
                {loading ? (
                    <div className="p"
                        style={{
                            color: "white", 
                            fontFamily: "'Kaushan Script', cursive"
                        }}>
                        Loading...
                    </div>
                ) : (
                    <>
                        {Array.isArray(data) && data.length > 0 ? (
                            search(data).map((item, i) => (
                                <Card
                                    key={i} // Ensure each Card has a unique key
                                    _id={item._id}
                                    photos={item.photos}
                                    title={item.title}
                                    date={item.date}
                                    location={item.location}
                                    text={item.text}
                                />
                            ))
                        ) : (
                            <div>No entries found</div> // Handle the case where no entries are found
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;

