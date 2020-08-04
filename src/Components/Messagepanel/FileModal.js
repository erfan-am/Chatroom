import React, { useState } from 'react';
import mime from 'mime-types'
import {Modal,Input,Button,Icon} from 'semantic-ui-react';


const FileModal = ({modal ,closeModal,uploadFile}) => {
    const [file,setFile]=useState(null)
    const [authorized]=useState(['image/jpeg','image/png'])
    //Add File To Input
    const addFile=(e)=>{
        const file=e.target.files[0]
        setFile(file)
    }

    //set isAuthorized
    const isAuthorized=(file)=>authorized.includes(mime.lookup(file))
    
    //Send File
    const sendFile=()=>{
        if(file !==null){
            if(isAuthorized(file.name)){
                const meta={contentType:mime.lookup(file.name)}
                uploadFile(file,meta)
                setFile(null)
                closeModal()
            }
        }
    }
    return (
        <Modal basic open={modal} onClose={closeModal} >
            <Modal.Header>Select an Image File</Modal.Header>
            <Modal.Content>
                <Input
                   fluid
                   label="File types: jpg,png"
                   name="file"
                   type="file" 
                   onChange={addFile}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="green"
                    inverted
                    onClick={sendFile}
                >
                    <Icon name="checkmark" />Send
                </Button>
                <Button
                    color="red"
                    inverted
                    onClick={closeModal}
                >
                    <Icon name="remove" />Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default FileModal
