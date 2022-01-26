import React, {useState} from 'react';
import {Button, Form, Header, Icon, Modal} from 'semantic-ui-react'

export default function UpdateModalWindow({data, refreshData, updateTransformation}) {
    const [open, setOpen] = useState(false);

    const [id, setId] = useState('');
    const [processId, setProcessId] = useState('');
    const [transformationType, setTransformationType] = useState('');
    const [transformationOrder, setTransformationOrder] = useState('');

    const callUpdate = () => {
        let transformation = { id, processId, transformationType, transformationOrder };
        console.log('Prepare transformation for update ' + JSON.stringify(transformation))
        updateTransformation(transformation);
    }

    const setData = () => {
        setId(data.id);
        setProcessId(data.processId);
        setTransformationType(data.transformationType);
        setTransformationOrder(data.transformationOrder);
    }

    const closeModal = () => {
        console.log('Closing modal');
        setOpen(false);
    }

    const saveChanges = () => {
        // updateTransformation();
        callUpdate();
        refreshData();
        setOpen(false);
    }

    return (
        <Modal
            basic
            onClose={() => closeModal()}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button onClick={setData}>Update</Button>}
        >
            <Header icon>
                <Icon name='edit'/>
                Edit Transformation
            </Header>
            <Modal.Content>
                <Form className="edit-form">
                    <Form.Field>
                        <label>Process id</label>
                        <input placeholder='Process id' value={processId}
                               onChange={(e) => setProcessId(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Transformation type</label>
                        <input placeholder='Transformation type' value={transformationType}
                               onChange={(e) => setTransformationType(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Transformation order</label>
                        <input placeholder='Transformation order' value={transformationOrder}
                               onChange={(e) => setTransformationOrder(e.target.value)}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button key='cancel' basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='cancel'/> Cancel
                </Button>
                <Button key='save' color='green' inverted onClick={() => saveChanges()}>
                    <Icon name='save'/> Save
                </Button>
            </Modal.Actions>
        </Modal>
    )
}