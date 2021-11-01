import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from 'config';
import { Form, Input, Checkbox, Button, Typography } from "antd";
import { openNotification } from "utils/toast";

import withAdmin from "pages/withAdmin";

const { Title } = Typography;


interface ICategory {
    name: string;
    content: string;
    image: any;
};



const Create = ({ token }) => {
    const [state, setState] = useState({
        name: '',
        content: '',
        formData: process.browser && new FormData(),
        buttonText: 'Create',
        imageUploadText: 'Upload image'
    });

    const { name, content, formData, buttonText, imageUploadText } = state;

    const handleChange = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        const imageName = name === 'image' ? event.target.files[0].name : 'Upload image';
        formData.set(name, value);
        setState({ ...state, [name]: value, imageUploadText: imageName });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Creating' });
        // console.log(...formData);
        try {
            const response = await axios.post(`${API}/category`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('CATEGORY CREATE RESPONSE', response);
            setState({
                ...state,
                name: '',
                content: '',
                formData: '',
                buttonText: 'Created',
                imageUploadText: 'Upload image',
            });
            openNotification("success", `${response.data.name} is created`);
        } catch (error) {
            console.log('CATEGORY CREATE ERROR', error);
            setState({ ...state, name: '', buttonText: 'Create' });
            // openNotification("error", error.response.data.error);
        }
    };

    const createCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <textarea onChange={handleChange('content')} value={content} className="form-control" required />
            </div>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    {imageUploadText}
                    <input
                        onChange={handleChange('image')}
                        type="file"
                        accept="image/*"
                        className="form-control"
                        hidden
                    />
                </label>
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );


    return (
        <div>
            <Title>Create category</Title>
            <br />
            {createCategoryForm()}
        </div>
    );
};

export default withAdmin(Create);
