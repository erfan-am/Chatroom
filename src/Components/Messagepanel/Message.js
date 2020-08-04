import React from 'react'
import {Comment,Image} from 'semantic-ui-react';
import moment from 'moment'
const Message = ({message,user}) => {
    
    const isOwnMessage=(message)=>{
        return message.userName.id === user.uid ? 'message__self' : ''
    }
    const isImage=(message)=>{
        return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
    }
    const timeFromNow=timestamp=>moment(timestamp).fromNow();
    return (
        <Comment>
            <Comment.Avatar src={message.userName.avatar} />
            <Comment.Content className={isOwnMessage(message)}>
                <Comment.Author as="a">{message.userName.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(message.timeStamp)}</Comment.Metadata>
                {isImage(message) ? <Image src={message.image} className="message__image" />:
                <Comment.Text>{message.content}</Comment.Text>
                }
            </Comment.Content>
        </Comment>
    )
}

export default Message
