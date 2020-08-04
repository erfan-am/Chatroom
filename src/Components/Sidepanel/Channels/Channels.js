import React, { useState,useEffect } from 'react';
import firebase from '../../../firebase/firebase'
import {Menu ,Icon,Modal,Form,Input,Button} from 'semantic-ui-react';

const Channels = ({user,setChannel}) => {
    //State
    const [channelRef]=useState(firebase.database().ref('channels'))
    const [channels,setChannels]=useState([])
    const [modal,setModal]=useState(false)
    const [input,setInput]=useState({nameChannel:'',aboutChanne:''})
    const [active,setActive]=useState('')

     //Bring Channel from Server
    useEffect(() => {
        let isCansel=true
        let loadedChannels=[];
        channelRef.on('child_added',snap=>{
        if(isCansel){
                loadedChannels.push(snap.val())
                setChannels([...loadedChannels])
            }
            })
        return () => {
           isCansel=false
        }
    }, [])
    //Set Input Change
    const handelChande=(e)=>setInput({...input,[e.target.name]:e.target.value})
    //setModal True
    const openModal=()=>{
        setModal(!modal)
    }
    //Set Modal Close
    const closeModal=()=>{
        setModal(false)
        setInput({nameChannel:'',aboutChanne:''})
    }
    //Create Channel
    const hanldeSubmit=(e)=>{
        const {nameChannel,aboutChanne}=input
        e.preventDefault()
        const key=channelRef.push().key;
        const newChannel={
            id:key,
            name:nameChannel,
            details:aboutChanne,
            createdBy:{
                name:user && user.displayName,
                avatar:user && user.photoURL
            }
        };
        channelRef.child(key).update(newChannel)
        .then(()=>{
           setInput({nameChannel:'',aboutChanne:''})
            closeModal()
        })
        .catch(err=>{
            console.log(err);
        })
    }
    //Change Channel as Global State
    const changeChannel=(channel)=>{
        setChannel(channel)
        //Set Active Channel
        setActive(channel.id)
    }
    const {nameChannel,aboutChanne}=input
    return (
       <React.Fragment>
            <Menu.Menu >
            <Menu.Item>
                <span>
                    <Icon name="exchange" />CHANNELS
                </span>

                ({channels.length })<Icon  onClick={openModal} name="add"/>
            </Menu.Item>
            {channels.length > 0 && channels.map(channel=>(
                <Menu.Item key={channel.id}
                onClick={()=>changeChannel(channel)}
                name={channel.name}
                active={channel.id === active}
                style={{opacity:0.7}}/>
            ))}
        </Menu.Menu>
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Add a Channel</Modal.Header>
            <Modal.Content>
                <Form >
                    <Form.Field>
                    <Input
                        fluid
                        label="Name of channel"
                        value={nameChannel}
                        name="nameChannel"
                        onChange={handelChande}
                    />
                      <Input
                        fluid
                        label="About Channel"
                        value={aboutChanne}
                        name="aboutChanne"
                        onChange={handelChande}
                    />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button inverted color="green" onClick={hanldeSubmit}>
                    <Icon name="checkmark" />
                </Button>
                <Button inverted onClick={closeModal} color="red">
                    <Icon name="remove" />
                </Button>            
            </Modal.Actions>
        </Modal>
       </React.Fragment>
    )
}

export default Channels
