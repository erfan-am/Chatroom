import React, { useState, useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from './Messages.header';
import MessageForm from './MessageForm';
import firebase from '../../firebase/firebase';
import Message from './Message'
const Messages =({currentChannel,user})=>{
  const [messageRef]=useState(firebase.database().ref('messages'))
  const [messages,setMessages]=useState('')
  const [userscount,setUSerscount]=useState('')
  const [seearch,setSearch]=useState(null)
  const [seearchLoading,setSearchLoading]=useState(false)
  const [searchResults,setSearchResults]=useState([])
  
  useEffect(() => {
   if(user && currentChannel){
    let unmount=true
    let loadedMessages=[];
    messageRef.child(currentChannel.id)
    .on('child_added',snap=>{
     if(unmount){
      loadedMessages.push(snap.val());
      setMessages([...loadedMessages])
      countUniqueUsers(loadedMessages)
     }
    })
    return () => {
      unmount=false
    }
   }
  }, [])
  
  const countUniqueUsers=(messages)=>{
    const countUniqueUser=messages.reduce((acc,message)=>{
      if(!acc.includes(message.userName.name)){
        acc.push(message.userName.name)
      }
      return acc;
    },[])
    const plural=countUniqueUser.length > 1 || countUniqueUser.length === 0
    const numUniqueUsers=`${countUniqueUser.length} users ${plural}`
    setUSerscount(numUniqueUsers)
  }

  useEffect(()=>{
    if(seearch){
      const channelMessages=[...messages];
    const regex=new RegExp(seearch);
    const searchResults=channelMessages.reduce(
      (acc,message)=>{
        if(message.content && message.content.match(regex)){
          acc.push(message)
        }
        return acc
      }
   ,[]);
      setSearchResults(searchResults)
      setSearchLoading(true)
      setTimeout(()=>{
        setSearchLoading(false)
      },1000)
    }
  },[seearch]);
  // Create Message template
  const displayMessageArr=(messages)=>(
    messages.length > 0 && messages.map(message=>(
      <Message key={message.timeStamp} message={message} user={user} />
      
    ))
  )
    return (
      <React.Fragment>
        <MessagesHeader load={seearchLoading} setSearch={setSearch} count={userscount} currentChannel={currentChannel}/>

        <Segment>
          <Comment.Group className="messages">
          {displayMessageArr(seearch ? searchResults : messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
         currentChannel={currentChannel}
          messageRef={messageRef}
          Currentuser={user}
        />
      </React.Fragment>
    );
  
}

export default Messages;
