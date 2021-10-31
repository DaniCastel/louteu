import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from 'config';
import { Form, Input, Checkbox, Button, Typography } from "antd";
import UploadImage from 'components/uploadImage';

import withAdmin from "pages/withAdmin";

const { Title } = Typography;


type IUser = {
    name: string;
    content: string;
    image: any;
};

const Create = ({ user, token }) => {
    const [buttonText, setButtonText] = useState('')

    const onFinish = async (values: IUser) => {
        setButtonText('Creating');
        console.log(values)
        // console.log(...formData);
        // formData.set(name, values.name);
        // formData.set(content, values.name);
        // formData.set(name, values.name);

        // try {
        //     const response = await axios.post(`${API}/category`, formData, {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     });
        //     console.log('CATEGORY CREATE RESPONSE', response);
        //     setState({
        //         ...state,
        //         buttonText: 'Created',
        //         imageUploadText: 'Upload image',
        //     });
        // } catch (error) {
        //     console.log('CATEGORY CREATE ERROR', error);
        //     setState({ ...state, buttonText: 'Create', error: error.response.data.error });
        // }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <Title>Create</Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                        {
                            required: true,
                            message: "Please input the category content",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <UploadImage></UploadImage>
            </Form>
        </div>
    );
};

export default withAdmin(Create);
