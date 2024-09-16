
import { Button, Text } from '@mantine/core';
import classes from './navigation-bar.module.css';
import { Dictionary } from '../../../dictionaries/en';


const NavigationBar = () => {
   return (
      <div className={classes.navBar}>
          <Text lineClamp={2} className={classes.title}>{Dictionary.chatConnect}</Text>
          <Button></Button>
          
      </div>
   );
};

export default NavigationBar;