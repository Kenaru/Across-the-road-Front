import React from "react";
import { Space, Spin } from "antd";
import "./index.scss";

function Loader() {
    return (
        <div className="loader">
            <p>Fetching data... Please wait...</p>
            <Space size="middle">
                <Spin size="large" /> {/* Adjust the size if needed */}
            </Space>
        </div>
    );
}
export default Loader;