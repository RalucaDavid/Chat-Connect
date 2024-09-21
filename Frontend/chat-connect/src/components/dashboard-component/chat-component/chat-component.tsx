
import { Button, Input, Text } from '@mantine/core';
import { useState } from 'react';
import { VscSend } from "react-icons/vsc";
import { LuFlagTriangleRight } from 'react-icons/lu';
import { Dictionary } from '../../../dictionaries/en';
import classes from './chat-component.module.css';

const ChatComponent = () => {
    const [messages, setMessages] = useState(null);

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

            </div>
            <div className={classes.inputMessage}>
                <Input placeholder={Dictionary.writeMessage}
                    className={classes.input}
                />
                <Button className={classes.inputButton}>
                    <VscSend className={classes.iconInput}/>
                </Button>
            </div>
        </div>
    );
}

export default ChatComponent;