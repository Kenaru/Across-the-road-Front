import React from "react";
import { Space, Spin } from "antd";
import "./index.scss";

function Loader() {
    return (
        <div className="loader">
            <p>Veuillez patienter s'il vous plaît......</p>
            <Space size="middle">
                <Spin size="large" /> 
            </Space>
        </div>
    );
}
export default Loader;