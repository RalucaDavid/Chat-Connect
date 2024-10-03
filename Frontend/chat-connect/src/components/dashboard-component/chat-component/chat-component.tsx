
import { Button, Input, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { VscSend } from "react-icons/vsc";
import { Dictionary } from '../../../dictionaries/en';
import classes from './chat-component.module.css';
import MessageComponent from './message-component';
import { getUsernameFromToken } from '../../../services/token-decode';
import * as signalR from "@microsoft/signalr";
import { message } from '../../../types/message';
import { HubConnection } from '@microsoft/signalr';
import { FiRefreshCcw } from "react-icons/fi";
import { decryptMessage, encryptMessage } from '../../../services/message-encode';

const ChatComponent = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messagesList, setMessagesList] = useState<message[]>([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const [waitingForPair, setWaitingForPair] = useState(false);
    const [usernamePair, setUsernamePair] = useState("");

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
                    const username = getUsernameFromToken();
                    connection.invoke("Connect", username);

                    connection.on("ReceiveMessage", (username: string, message: string) => {
                        const decryptedMessage = decryptMessage(message);
                        setMessagesList((prevMessagesList) => [...prevMessagesList, { username: username, message: decryptedMessage }]);
                    });

                    connection.on("WaitingForPair", () => {
                        setWaitingForPair(true);
                        setUsernamePair("");
                        setMessagesList([]);
                    });

                    connection.on("Paired", (username: string) => {
                        setUsernamePair(username);
                        setWaitingForPair(false);
                    });
                })
                .catch((error: any) => console.log(error));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection && currentMessage.trim() !== "") {
            try {
                const currentUser = getUsernameFromToken();
                const encryptedMessage = encryptMessage(currentMessage);
                await connection.send("SendMessage", currentUser, encryptedMessage);
                setMessagesList((prevMessagesList) => [...prevMessagesList, { username: currentUser, message: currentMessage } as any]);
                setCurrentMessage("");
            } catch (error) {
                console.error(error);
            }
        }
    };

    const refreshChat = async () => {
        if (connection) {
            await connection.invoke("Disconnect");
            setMessagesList([]);
            setWaitingForPair(true);
            setUsernamePair("");
        }
    };

    return (
        <div className={classes.chatWrapper}>
            <div className={classes.personInfo}>
                <Text className={classes.personName}>
                    {usernamePair}
                </Text>
                <div className={classes.buttonsWrapper}>
                    <Button className={classes.refreshButton} onClick={refreshChat} disabled={waitingForPair}>
                        <FiRefreshCcw className={classes.refreshIcon} />
                        {Dictionary.chatWithSomeoneElse}
                    </Button>
                </div>
            </div>
            <div className={classes.messagesWrapper}>
                {
                    waitingForPair &&
                    <Text>
                        {Dictionary.waitForSomeoneToJoin}
                    </Text>
                }
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
                    disabled={waitingForPair}
                />
                <Button className={classes.inputButton} onClick={sendMessage} disabled={waitingForPair}>
                    <VscSend className={classes.iconInput} />
                </Button>
            </div>
        </div>
    );
}

export default ChatComponent;