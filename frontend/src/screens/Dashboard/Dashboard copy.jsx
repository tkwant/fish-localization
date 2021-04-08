import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap/dist/reactstrap.full'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import useUploadVideo from '../../hooks/useUploadVideo'
import { Grid, GridItem, Skeleton } from '@chakra-ui/react'
import SidebarCards from './SidebarCards'
import SidebarButtons from './SidebarButtons'
import { useBoolean } from 'react-use'
// import Container from 'reactstrap/lib/Container'
// import Row from 'reactstrap/lib/Row'
// import Col from 'reactstrap/lib/Col'
// import Col from 'reactstrap/src/'


function App() {
    // Create the count state.
    const [uploadVideoState, uploadVideo] = useUploadVideo()
    const [file, setFile] = useState()
    const [newVideoUploadedToggler, setNewVideoUploadedToggler] = useBoolean(false)

    // Return the App component.


    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onFileUpload = () => {
        uploadVideo(file)
    }

    return (
        <div className="flex flex-row  h-screen">
            <div className="flex flex-col w-300 bg-gray-300">
                <div className="bg-gray-400 flex-grow">
                    <SidebarCards
                        newVideoUploadedToggler={newVideoUploadedToggler}
                    />
                </div>
                <div className="bg-gray-600">
                    <SidebarButtons
                        setNewVideoUploadedToggler={setNewVideoUploadedToggler}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-grow">
                <div className="bg-gray-400 flex-grow">1</div>
                <div className="h-36 bg-gray-600">1</div>
            </div>
        </div>

        // <Grid
        //     templateRows="repeat(2, 1fr)"
        //     templateColumns="repeat(5, 1fr)"
        //     gap={4}
        // >
        //     <GridItem rowSpan={2} colSpan={1} bg="tomato" >  <Skeleton height="20px" />
        //     </GridItem>
        //     <GridItem colSpan={4} bg="papayawhip" >  <Skeleton height="300px" />
        //     </GridItem>
        //     <GridItem colSpan={4} bg="tomato">  <Skeleton height="20px" />
        //     </GridItem>
        // </Grid>
        /* <Row>
        <Col>
            <Button onClick={test}>Fetch</Button>
        </Col>
        <Col>
            asdasd
        </Col>
    </Row>
    <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>
            Upload!
        </button>
    </div>
    <header className="App-header">
        <p>
            Page has been open for <code>{count}</code> seconds.
</p>
    </header> */
    )
}

export default App;