// CreatePostModal.jsx
import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './index.scss'
function Modal({
                             modalOpen,
                             setModalOpen,
                             sendStatus,
                             status,
                             isEdit,
                             updateStatus,
                             uploadPostImage,
                             setPostImage,
                             postImage,
                             currentPost,
                             setCurrentPost,
                         }) {
    const [progress, setProgress] = useState(0);

    const handleStatusChange = (value) => {
        setCurrentPost({ ...currentPost, status: value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadPostImage(file, setProgress, setPostImage, setCurrentPost, currentPost);
        }
    };

    const handleSubmit = async () => {
        if (isEdit) {
            await updateStatus(currentPost);
        } else {
            await sendStatus(currentPost);
        }
        resetModal();
    };

    const resetModal = () => {
        setModalOpen(false);
        setPostImage("");
        setCurrentPost({});
    };

    return (
        <Modal
            title={isEdit ? "Edit Post" : "Create a Post"}
            visible={modalOpen}
            onOk={handleSubmit}
            onCancel={resetModal}
            footer={[
                <Button key="submit" type="primary" onClick={handleSubmit} disabled={!currentPost.status}>
                    {isEdit ? "Update" : "Post"}
                </Button>,
            ]}
        >
            <ReactQuill value={currentPost.status} onChange={handleStatusChange} placeholder="What's on your mind?" />
            {progress > 0 && <Progress percent={progress} />}
            <label htmlFor="pic-upload">
                <AiOutlinePicture size={30} />
                <input id="pic-upload" type="file" hidden onChange={handleImageUpload} />
            </label>
            {postImage && <img src={postImage} alt="Post" />}
        </Modal>
    );
}

export default Modal;
