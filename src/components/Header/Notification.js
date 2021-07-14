import React from 'react';
import { Menu, MenuItem, IconButton, makeStyles } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Link from '@material-ui/core/Link'
import StarIcon from '@material-ui/icons/Star';
import Badge from '@material-ui/core/Badge';



export default function Notification({todayLesson}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const playLink = '/lesson/'+todayLesson.id
  const [invisible, setInvisible] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setInvisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="home" href='#' onClick={handleClick}>
        <Badge badgeContent={'!'} color="primary" invisible={invisible}>
            <NotificationsIcon fontSize="large" />
        </Badge>
    </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem href={playLink} 
            component="a"
            onClick={handleClose}>
            {todayLesson.name}
            <br/>
            <StarIcon/>{todayLesson.score}
        </MenuItem>

      </Menu>
    </div>
  );
}