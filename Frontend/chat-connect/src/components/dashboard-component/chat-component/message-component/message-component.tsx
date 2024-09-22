
import classes from "./message-component.module.css";

interface MessageComponentProps {
   message: string;
   isCurrentUser: boolean;
}

const MessageComponent = ({message, isCurrentUser }: MessageComponentProps) => {
   return (
      <div className={isCurrentUser ? classes.right : classes.left}>
         {message}
      </div>
   );
};

export default MessageComponent;