import React from 'react'
import { Drawer, DrawerOverlay, DrawerHeader, DrawerBody, DrawerContent, Button } from '@chakra-ui/react'

const Sidebar = ({ isOpen, onOpen, onClose }) => {
    // const [placement, setPlacement] = React.useState("right")

    return (
        <>
            {/* <RadioGroup defaultValue={placement} onChange={setPlacement}>
          <Stack direction="row" mb="4">
            <Radio value="top">Top</Radio>
            <Radio value="right">Right</Radio>
            <Radio value="bottom">Bottom</Radio>
            <Radio value="left">Left</Radio>
          </Stack>
        </RadioGroup>
        <Button colorScheme="blue" onClick={onOpen}>
          Open
        </Button> */}
            <Drawer closeOnOverlayClick={false} preserveScrollBarGap={true} placement={'left'} onClose={onClose} isOpen={isOpen}>
                {/* <DrawerOverlay> */}
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <div>Select Video</div>
                        <div>
                            <Button onClick={onClose}>
                                Close
                            </Button>
                        </div>

                    </DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
                {/* </DrawerOverlay> */}
            </Drawer>
        </>
    )
}

export default Sidebar