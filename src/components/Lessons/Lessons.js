import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TodayLessonCard from '../Dashboard/TodayLessonCard'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    marginButton: {
        margin: theme.spacing(1),
    },
    firstRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    secondRow: {
        display: 'flex',
        justifyContent: 'space-around',
    }
  }));

const ColorButton = withStyles((theme) => ({
root: {
    color: '#FFFFFF',
    backgroundColor: '#527D2A',
    '&:hover': {
    backgroundColor: '#283D14',
    },
    maxWidth: '500px', 
    maxHeight: '100px', 
    minWidth: '500px', 
    minHeight: '100px',
    fontSize: '30px'
},
}))(Button);

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

const yourLessons = [
    {id: 1, title: "Lesson1", score: "1", descr: lorem, image: ''},
    {id: 2, title: "Lesson2", score: "2", descr: lorem,  image: ''},
    {id: 3, title: "Lesson3", score: "3", descr: lorem,  image: ''},
]

export default function Lessons(){
    const classes = useStyles()
    const [userLessons, setuserLessons] = useState([{id: '1', name: 'Flowers', score: '100'},
                                                    {id: '2', name: 'Fruits', score: '250'},
                                                    {id: '3', name: 'Furniture', score: '120'}]);
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}  className={classes.firstRow}>
                <ColorButton variant="contained"
                    color="primary"
                    href="/add"
                    className={classes.margin}>Add new lesson</ColorButton>
            </Grid>

            <Grid item xs={12}>
                <h1 style={{marginLeft: '50px'}}>Edit lessons</h1>
            </Grid>

            <Grid item xs={12} className={classes.secondRow}>
                <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px' }}>
                    {
                        userLessons.map((lesson, i) => (
                        <TodayLessonCard
                                id={lesson.id}
                                title={lesson.name}
                                score={lesson.score}
                                descr={lesson.description}
                                toEdit="true"/>
                        ))}
                </Box>

            </Grid>
           
        </Grid>
    );
}