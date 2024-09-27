
import { Button, Input, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { VscSend } from "react-icons/vsc";
import { LuFlagTriangleRight } from 'react-icons/lu';
import { Dictionary } from '../../../dictionaries/en';
import classes from './chat-component.module.css';
import MessageComponent from './message-component';
import { getUsernameFromToken } from '../../../services/token-decode';
import * as signalR from "@microsoft/signalr";
import { message } from '../../../types/message';
import { HubConnection } from '@microsoft/signalr';

const ChatComponent = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messagesList, setMessagesList] = useState<message[]>([]);

    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7134/chatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection as any);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveMessage", (username: string, message: string) => {
                        setMessagesList((prevMessagesList) => [...prevMessagesList, { username, message }]);
                    });
                })
                .catch((error: any) => console.log(error));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection && currentMessage.trim() !== "") {
            try {
                const currentUser = getUsernameFromToken();
                await connection.send("SendMessage", currentUser, currentMessage);
                setMessagesList((prevMessagesList) => [...prevMessagesList, { username: currentUser, message: currentMessage } as any]);
                setCurrentMessage("");
            } catch (error) {
                console.error(error);
            }
        }
    };

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
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <Button className={classes.inputButton} onClick={sendMessage}>
                    <VscSend className={classes.iconInput} />
                </Button>
            </div>
        </div>
    );
}

export default ChatComponent;