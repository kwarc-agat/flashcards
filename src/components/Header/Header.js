import React, {useState, useEffect} from 'react';
import { AppBar, Toolbar, IconButton, 
    List, ListItem, ListItemText,
    makeStyles} from "@material-ui/core"
import Home from "@material-ui/icons/Home"
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from 'react-router-dom';
import Notification from './Notification'
import UserOptions from './DropdownMenu/UserOptions';

// style
const useStyles = makeStyles({
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    },
    toolbarStyle: {
      background: '#90A0AF'
    }
  });

// const
const singleLinks = [
    { title: `CALENDAR`, path: `/calendar` },
    { title: `LESSONS`, path: `/lessons` },
    { title: `STATISTICS`, path: `/charts` },
  ]

// component
const Header = () => {
  const classes = useStyles();
  const [todayLesson, settodayLesson] = useState({id: '1', name: 'Fruits', description: 'Check out this delicious sweets!', score: '100'});

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbarStyle}>

        <IconButton edge="start" color="inherit" aria-label="home" href='/dashboard'>
          <Home fontSize="large" />
        </IconButton>

        <UserOptions/>
        <Notification todayLesson={todayLesson} read={true}/>

        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
              {singleLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                </a>
              ))}
        </List>   

      </Toolbar>
    </AppBar>
  )
}
export default Header