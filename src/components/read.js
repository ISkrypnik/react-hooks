import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Table, Button} from 'semantic-ui-react';
import UpdateModalWindow from './UpdateModalWindow'

function Read() {
    const [transformationData, setTransformationData] = useState([]);

    useEffect(() => {
        axios.get(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations`)
            .then((response) => {
                console.log(response.data)
                setTransformationData(response.data);
            })
    }, []);

    const getAllTransformations = () => {
        axios.get(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations`)
            .then((response) => {
                setTransformationData(response.data);
            })
    }

    const updateTransformation = (transformation) => {
        console.log('[Parent] Update transformation, passed object: ' + JSON.stringify(transformation));

        let { id, processId, transformationType, transformationOrder } = transformation;

        axios.put(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations/${id}`, {
            processId,
            transformationType,
            transformationOrder
        }).then((response) => {
            if (response.status === 200) {
                console.log('Updated')
                console.log(response)
                let newArr = [...transformationData]; // copying the old datas array
                let toChangeIndex = newArr.findIndex(x => x.id === id);
                console.log(toChangeIndex)
                let toChange = newArr.find(x => x.id === id);
                console.log(toChange)

                let updatedProcessId = response.data.processId
                let updatedTransformationType = response.data.transformationType
                let updatedTransformationOrder = response.data.transformationOrder

                let updatedTransformation = { updatedProcessId, updatedTransformationType, updatedTransformationOrder }

                console.log('Updated transformation ' + JSON.stringify(updatedTransformation))
                newArr[toChangeIndex] = updatedTransformation; // replace e.target.value with whatever you want to change it to

                console.log('New array: ' + JSON.stringify(newArr))

                setTransformationData(newArr);
            }
        })
    }

    const refreshData = () => {
        console.log('[Parent] Refreshing data from parent')
        axios.get(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations`)
            .then((response) => {
                console.log('Setting transformation data')
                setTransformationData(response.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`https://61ee3db5d593d20017dbace7.mockapi.io/transformations/${id}`)
        .then(() => {
            getAllTransformations();
        })
    }

    return (
        <div>
            <Table key='read-transformations-table' singleLine>
                <Table.Header key='read-transformations-header'>
                    <Table.Row key='read-transformations-header-row'>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Process id</Table.HeaderCell>
                        <Table.HeaderCell>Transformation type</Table.HeaderCell>
                        <Table.HeaderCell>Transformation order</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body key='read-transformations-body'>
                    {transformationData.map((currentTransformation) => {
                        return (
                            <Table.Row key={currentTransformation.id}>
                                <Table.Cell key='read-transformation-cell-id'>{currentTransformation.id}</Table.Cell>
                                <Table.Cell key='read-transformation-cell-processId'>{currentTransformation.processId}</Table.Cell>
                                <Table.Cell key='read-transformation-cell-transformationType'>{currentTransformation.transformationType}</Table.Cell>
                                <Table.Cell key='read-transformation-cell-transformationOrder'>{currentTransformation.transformationOrder}</Table.Cell>
                                <Table.Cell key='read-transformation-cell-update'>
                                    <UpdateModalWindow
                                        key={currentTransformation.id}
                                        data={currentTransformation}
                                        refreshData={refreshData}
                                        updateTransformation={updateTransformation}
                                    />
                                </Table.Cell>
                                <Table.Cell key='read-transformations-cell-delete'>
                                    <Button onClick={() => onDelete(currentTransformation.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default Read;
