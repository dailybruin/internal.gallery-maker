import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./gallery-list.module.css";

const GalleryList = (props) => {
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [galleries, setGalleries] = useState([
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
    ]);

    const getPageNoOptions = () => {
        const arr = [];
        for (let i = 1; i <= totalPages; i++)
            arr.push(
                <option key={`page-${i}`} value={i}>
                    {i}
                </option>
            );
        return arr;
    };

    useEffect(() => {}, [pageNo, perPage]);

    return (
        <>
            <table className={classes.Galleries}>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                {galleries.map((gallery, idx) => (
                    <tr>
                        <th>{idx + 1}</th>
                        <td>{gallery.name}</td>
                        <td>{gallery.descr}</td>
                        <td>
                            <button>
                                <Link to={`/update/${gallery.id}`}>Edit</Link>
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
            <div className={classes.Buttons}>
                <button className={classes.PageButton}>Previous</button>
                <button className={classes.PageButton}>Next</button>
            </div>
            <div className={classes.PageSelect}>
                <div className={classes.FormGroup}>
                    <label htmlFor="page-no" className={classes.FormGroup}>
                        Page
                    </label>
                    <select id="page-no">{getPageNoOptions()}</select>
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor="per-page" className={classes.FormGroup}>
                        Galleries Per Page
                    </label>
                    <select id="per-page">
                        <option value="10">10</option>
                        <option value="25">20</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default GalleryList;
