import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Pagination, Button, Modal, notification } from "antd";

import { APIListGalleries, APIDeleteGallery } from "api/galleries";

const { confirm } = Modal;

const GalleryList = () => {
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [galleries, setGalleries] = useState([]);

    /* Initial load */
    const initialLoad = () => {
        updateGalleries(currPage, pageSize);
    };
    useEffect(initialLoad, []);

    /**
     * Retrieve galleries to be shown on current page
     * @param {*} page - current page number
     * @param {*} pageSize - galleries per page
     */
    const updateGalleries = async (page, pageSize) => {
        const offset = (page - 1) * pageSize;
        try {
            const res = await APIListGalleries(pageSize, offset);
            setCurrPage(page);
            setPageSize(pageSize);
            setTotal(res.data.count);
            setGalleries(res.data.results);
        } catch (err) {
            notification.error({
                message: "Failed to retrieve galleries from server.",
                description: `${err.message}`,
                duration: 0,
            });
        }
    };

    /**
     * Show confirmation modal, then delete gallery
     * @param {} id - id of gallery
     */
    const deleteGallery = async (id) => {
        confirm({
            title: "Are you sure you want to delete this gallery?",
            content: "This gallery will be deleted permanently.",
            async onOk() {
                try {
                    await APIDeleteGallery(id);
                    updateGalleries(currPage, pageSize);
                } catch (err) {
                    notification.error({
                        message: "Failed to delete gallery.",
                        description: `${err.message}`,
                    });
                }
            },
        });
    };

    const getPageSizeOptions = () => {
        const options = ["10", "20", "50", "100"];
        return options.filter((option) => option <= total);
    };

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
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/update/${record.id}`}>Edit</Link>
                    <Button
                        type="link"
                        style={{ color: "red" }}
                        onClick={() => deleteGallery(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={galleries}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            <Pagination
                style={{
                    marginTop: "1em",
                }}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) => {
                    return `Showing galleries ${range[0]}-${range[1]} of ${total}`;
                }}
                pageSizeOptions={getPageSizeOptions()}
                current={currPage}
                total={total}
                onChange={updateGalleries}
                onShowSizeChange={updateGalleries}
            />
        </>
    );
};

export default GalleryList;
