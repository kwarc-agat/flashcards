import React from 'react';
import { Menu, MenuItem, IconButton, makeStyles } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';


export default function UserOptions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (e) => {
    e.preventDefault(); 
    sessionStorage.removeItem('token');
    window.location.href = "\\"
  }
  const selectUser = [
    {name: 'Account settings'},
    {name: 'Privacy policy'},
    {name: 'Log out', action: logout}
  ]
  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="home" href='#' onClick={handleClick}>
          <PersonIcon fontSize="large" />
        </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          selectUser.map((item, i) =>
          <MenuItem key={i} value={i} onClick={item.action}>
            {item.name}
            </MenuItem>)
        }

      </Menu>
    </div>
  );
}