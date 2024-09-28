
import { Button, Text } from '@mantine/core';
import { Dictionary } from '../../../dictionaries/en';
import { IoLogoWechat } from "react-icons/io5";
import { getUsernameFromToken } from "../../../services/token-decode";
import classes from './navigation-bar.module.css';

const NavigationBar = () => {
   const username = getUsernameFromToken();

   return (
      <div className={classes.navBar}>
         <div className={classes.logoWrapper}>
            <IoLogoWechat className={classes.icon} />
            <Text lineClamp={2} className={classes.title}>
               {Dictionary.chatConnect}
            </Text>
         </div>
         <div className={classes.userInfo}>
            <Text className={classes.text}>
               {Dictionary.hello} {username}
            </Text>
         </div>
      </div>
   );
};

export default NavigationBar;