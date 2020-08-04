import React, {useState, useEffect} from "react";
import FileModal from './FileModal'
import firebase from "../../firebase/firebase";
import Progressive from './ProgressivBar';
import { Segment, Button, Input } from "semantic-ui-react";


const MessageForm = ({currentChannel,Currentuser,messageRef}) => {
  const [message,setMessage]=useState('')
  const [uploadState,setUploadState]=useState('')
  const [percent,setPercent]=useState(0)
  const [uploadTask,setUploadTask]=useState(null)
  const [loading,setLoading]=useState(false)
  const [user]=useState(Currentuser)
  const [messageStore]=useState(firebase.storage().ref())
  const [modal,setModal]=useState(false)


const  handleMessageSubmit=()=>{
      if(message){
          setLoading(true)
          messageRef
          .child(currentChannel.id)
          .push()
          .set(createMessage())
          .then(()=>{
            setLoading(false)
              setMessage('')
          })
          .catch(err=>{
            setLoading(false)
          })
      }
    }
    //    //Create Message
   const  createMessage=(file=null)=>{
       
        const Message={
            timeStamp:firebase.database.ServerValue.TIMESTAMP,
            userName:{
                 id: user.uid,
                 name:user.displayName,
                 avatar:user.photoURL
            },
        }
        if(file !== null){
          Message['image']=file;
    
        }else{
          Message['content']=message
        }
        return Message
    }
    //Open Modal
    const openModal=()=>{setModal(!modal)}
    const closeModal=()=>{setModal(false)}
      
     //Upload File
     const uploadFile=(file,meta)=>{
    
         const filePath=`chat/public/${Math.random().toString()}.jpg`
          setUploadState('uploading')
          setUploadTask(messageStore.child(filePath).put(file,meta))
           
      }
      useEffect(()=>{
        const pathToupload=currentChannel.id
        const ref=messageRef;
        uploadState === 'uploading' && (
          uploadTask.on('state_changed',snap=>{
            const percentUploaded=Math.round((snap.bytesTransferred / snap.totalBytes) * 100 )
            setPercent(percentUploaded)
          },(err)=>{
            console.error(err)
            setUploadState('error')
            setUploadTask(null)
          },()=>{
              uploadTask.snapshot.ref.getDownloadURL().then(download=>{
              sendFile(download,ref,pathToupload)
            })
        })
        )
      },[uploadState])
     //Send File
     const sendFile=(fileUrl,ref,pathToupload)=>{
         ref.child(pathToupload)
         .push()
         .set(createMessage(fileUrl))
         .then(()=>{setUploadState('done')})
         .catch((err)=>console.log(err))
       }
  return (
          <Segment className="message__form">
            <Input
              fluid
              name="message"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              style={{ marginBottom: "0.7em" }}
              label={<Button icon={"add"} />}
              labelPosition="left"
              placeholder="Write your message"
            />
            <Button.Group icon widths="2">
              <Button
                color="orange"
                loading={loading}
                onClick={handleMessageSubmit}
                content="Add Reply"
                labelPosition="left"
                icon="edit"
              />
              <Button
                color="teal"
                content="Upload Media"
                onClick={openModal}
                labelPosition="right"
                icon="cloud upload"
              />
              <FileModal
                modal={modal}
                closeModal={closeModal}
                uploadFile={uploadFile}
              />
              
            </Button.Group>
            <Progressive
                uploadState={uploadState}
                percent={percent}
              />
          </Segment>
        )
}


export default MessageForm;
