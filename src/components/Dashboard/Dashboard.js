import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TodayLessonCard from './TodayLessonCard';
import UserLessonCard from './UserLessonCard';
import { Typography, List, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    cardContainer: {
        paddingLeft: '200px'
    },
    multipleCardsContainer: {
        paddingRight: '100px'
    }
  }));

export default function Dashboard(){
    const classes = useStyles();

    const [userLessons, setuserLessons] = useState([{id: '1', name: 'Flowers', score: '100'},
                                                    {id: '2', name: 'Fruits', score: '250'},
                                                    {id: '3', name: 'Furniture', score: '120'}]);
    const [todayLesson, settodayLesson] = useState({id: '1', name: 'Fruits', descr: 'Check out this delicious sweets!', score: '100'});
    
  return (
    <div className={classes.root}>
        <br/><br/>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Container className={classes.cardContainer}>
                    <Typography variant="h2">Lesson for today</Typography>
                    <br/>
                    <TodayLessonCard id={todayLesson.id}
                        title={todayLesson.name}
                        descr={todayLesson.description}
                        score={todayLesson.score}
                        toEdit="false"/>
                </Container>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h2">Your lessons</Typography>
                <br/>
                <List className={classes.multipleCardsContainer}>
                    {
                        userLessons.map((lesson, i) => (
                        <ListItem key={lesson.id}>
                            <UserLessonCard id={lesson.id}
                                title={lesson.name}
                                score={lesson.score}/>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    </div>
  );
}