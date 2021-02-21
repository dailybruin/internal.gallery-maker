import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Space } from "antd";
import axios from "axios";

import classes from "./gallery-list.module.css";

const GalleryList = (props) => {
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [galleries, setGalleries] = useState([
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
        {
            name: "hello",
            descr: "first one",
            id: 0,
        },
    ]);

    useEffect(() => {}, [pageNo, perPage]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "descr",
            key: "descr",
        },
        {
            title: "Actions",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/update/${record.id}`}>Edit</Link>
                    <a style={{ color: "red" }}>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={galleries}
                columns={columns}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
            />
        </>
    );
};

export default GalleryList;
