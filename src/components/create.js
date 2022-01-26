import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Create() {
    const [processId, setProcessId] = useState('');
    const [transformationType, setTransformationType] = useState('');
    const [transformationOrder, setTransformationOrder] = useState('');

    const postData = () => {
        axios.post(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations`, {
            processId,
            transformationType,
            transformationOrder
        }).then((response) => {
            if (response.status === 201) {
                console.log('Created successfully')
            }
        })
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Process id</label>
                    <input placeholder='Process id' onChange={(e) => setProcessId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Transformation type</label>
                    <input placeholder='Transformation type' onChange={(e) => setTransformationType(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Transformation order</label>
                    <input placeholder='Transformation order' onChange={(e) => setTransformationOrder(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
