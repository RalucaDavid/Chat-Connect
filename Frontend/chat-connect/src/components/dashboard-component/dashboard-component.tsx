
import { useState } from 'react';
import classes from './dashboard-component.module.css';
import { Alert } from '@mantine/core';
import { Dictionary } from '../../dictionaries/en';
import { LuInfo } from "react-icons/lu";
import NavigationBar from './navigation-bar';
import ChatComponent from './chat-component';

const DashboardComponent = () => {
    const [opened, setOpened] = useState(true);

    return (
        <div className={classes.dashboard}>
            <div className={classes.navigationContainer}>
                <NavigationBar />
            </div>
            <div className={classes.alertContainer}>
                {
                    opened ?
                    <Alert variant="filled" color="#5f0a87"
                        title={Dictionary.chatRules} withCloseButton icon={<LuInfo />}
                        className={classes.alertContent} radius="md"
                        classNames={{label: classes.alertTile}}
                        onClose={() => { setOpened(false) }}>
                        <ul>
                            <li>
                                <span className={classes.titleRule}>{Dictionary.beRespectful}</span> {Dictionary.beRespectfulText}
                            </li>
                            <li>
                                <span className={classes.titleRule}>{Dictionary.privacy}</span> {Dictionary.privacyText}
                            </li>
                            <li>
                                <span className={classes.titleRule}>{Dictionary.noSpam}</span> {Dictionary.noSpamText}
                            </li>
                            <li>
                                <span className={classes.titleRule}>{Dictionary.appropriateContent}</span> {Dictionary.appropriateContentText}
                            </li>
                            <li>
                                <span className={classes.titleRule}>{Dictionary.safetyFirst}</span> {Dictionary.safetyFirstText}
                            </li>
                        </ul>
                    </Alert>
                    :
                    <ChatComponent/>
                }
            </div>
        </div >
    );
}

export default DashboardComponent;