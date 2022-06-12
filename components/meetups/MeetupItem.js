import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
function MeetupItem(props) {
  const router = useRouter();
  const showMeetup = () => {
    router.push(`/${props.id}`);
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img width="100%" height="100%" src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showMeetup}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
