
import { Button, Text } from '@mantine/core';
import classes from './navigation-bar.module.css';
import { Dictionary } from '../../../dictionaries/en';
import { IoLogoWechat } from "react-icons/io5";

const NavigationBar = () => {
   return (
      <div className={classes.navBar}>
         <div className={classes.logoWrapper}>
            <IoLogoWechat className={classes.icon} />
            <Text lineClamp={2} className={classes.title}>
               {Dictionary.chatConnect}
            </Text>
         </div>
         <div className={classes.userInfo}>
            <Button className={classes.adminButton} classNames={{ label: classes.text }}>
               {Dictionary.admin}
            </Button>
            <Text className={classes.text}>
               {Dictionary.hello}
            </Text>
         </div>
      </div>
   );
};

export default NavigationBar;