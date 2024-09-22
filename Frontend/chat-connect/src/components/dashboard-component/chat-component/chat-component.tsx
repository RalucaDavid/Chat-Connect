
import { Button, Input, Text } from '@mantine/core';
import { useState } from 'react';
import { VscSend } from "react-icons/vsc";
import { LuFlagTriangleRight } from 'react-icons/lu';
import { Dictionary } from '../../../dictionaries/en';
import classes from './chat-component.module.css';
import MessageComponent from './message-component';
import { getUsernameFromToken } from '../../../services/token-decode';

const ChatComponent = () => {
    const [messagesList, setMessagesList] = useState([
        { username: 'raluca16', message: 'Hello, world!' },
        { username: 'Marcel', message: 'How are you?' },
        { username: 'Marcel', message: 'Hello??' },
    ]);

    return (
        <div className={classes.chatWrapper}>
            <div className={classes.personInfo}>
                <Text className={classes.personName}>
                    Marcel
                </Text>
                <Button className={classes.reportButton}>
                    <LuFlagTriangleRight />
                    {Dictionary.report}
                </Button>
            </div>
            <div className={classes.messagesWrapper}>
                {messagesList.map((msg, index) => (
                    <MessageComponent
                        key={index}
                        message={msg.message}
                        isCurrentUser={msg.username === getUsernameFromToken()}
                    />
                ))}
            </div>
            <div className={classes.inputMessage}>
                <Input placeholder={Dictionary.writeMessage}
                    className={classes.input}
                />
                <Button className={classes.inputButton}>
                    <VscSend className={classes.iconInput} />
                </Button>
            </div>
        </div>
    );
}

export default ChatComponent;