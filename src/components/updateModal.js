import React, {useEffect, useState} from 'react';
import {Button, Form, Header, Icon, Modal} from 'semantic-ui-react';
import axios from 'axios';

function UpdateModal() {
    const [open, setOpen] = React.useState(false);

    const [id, setId] = useState('');
    const [processId, setProcessId] = useState('');
    const [transformationType, setTransformationType] = useState('');
    const [transformationOrder, setTransformationOrder] = useState('');

    useEffect(() => {
        setId(localStorage.getItem('ID'));
        setProcessId(localStorage.getItem('Process id'));
        setTransformationType(localStorage.getItem('Transformation type'));
        setTransformationOrder(localStorage.getItem('Transformation order'));
    }, []);

    const updateTransformationData = () => {
        axios.put(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations/${id}`, {
            processId,
            transformationType,
            transformationOrder
        }).then((response) => {
            if (response.status === 200) {
                console.log("Transformation updated");
            }
        })
    }

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button>Update</Button>}
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
                <Button key='save' color='green' inverted onClick={() => {
                    updateTransformationData();
                    setOpen(false);
                }
                }>
                    <Icon name='save'/> Save
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default UpdateModal;
