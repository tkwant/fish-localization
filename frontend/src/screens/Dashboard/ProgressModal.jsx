import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Progress
} from "@chakra-ui/react"

const ProgressModal = ({ isOpen, onClose, breakUpload, uploadVideoState }) => {
    return <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Video</ModalHeader>
                <ModalBody>
                    <Progress value={uploadVideoState.progress * 100} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={breakUpload}>
                        Cancel Upload
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default ProgressModal