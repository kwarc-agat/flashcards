import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import StarIcon from '@material-ui/icons/Star';
import { Button, CardContent, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
      justifyContent: 'center',
      textAlign: 'center',
      maxWidth: '1200px',
      minHeight: '600px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
        
    },
    footer: {
        display: 'block',
        justifyContent: 'right',
        textAlign: 'right'
    },
    score: {
        textAlign: 'right',
        display: 'inline-block',
    },
    workField: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '400px',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    newWord: {
        fontSize: 50
    },
    translatedWord: {
        fontSize: 30
    }
  }));
const Lesson = () => {
    const history = useHistory();
    const classes = useStyles();
    let { id } = useParams();
    const [lesson, setLesson] = useState([{question: 'mango', answer: 'mango', score: '25'},
                                        {question: 'avocado', answer: 'awokado', score: '25'},
                                        {question: 'watermelon', answer: 'arbuz', score: '25'},
                                        {question: 'banana', answer: 'banan', score: '25'}])
    const [wordChecked, setWordChecked] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreFactor, setScoreFactor] = useState(25)
    const [currentAnswer, setAnswer] = useState('');
    const [noteColor, setColor] = useState('#90A0AF');
    const [lessonLength, setLessonLength] = useState(4)
    const [i, setCurrentCardID] = useState(0)
    const [buttonText, setButtonText] = useState('Check')
    const [flashcardsResults, setResults] = useState([])

    async function handleSubmit(e){
        e.preventDefault();

        if(buttonText=='Finish')
        {
            let postData = {
                LessonId: parseInt(id),
                FlashCardResults: flashcardsResults,
                Score: score
            }
            console.log(postData)
            history.replace('/dashboard')
        }

        if(!wordChecked)
        {
            setWordChecked(true)
            if(currentAnswer==lesson[i].answer)
            {
                setColor('#527D2A')
                setScore(score + scoreFactor)
                setResults(prevList => {
                    const newItem = {
                        FlashCardId: i, 
                        CorrectAnswer: true
                    }
                    return [...prevList, newItem]
                })
            }
            else
            {
                setColor('#F25F5C')
                setResults(prevList => {
                    const newItem = {
                        FlashCardId: i, 
                        CorrectAnswer: false
                    }
                    return [...prevList, newItem]
                })
            }
            setButtonText('Next')
        }
        else{
            if(i<lessonLength-1)
            {
                setCurrentCardID(i+1)
                setWordChecked(false)
                setColor('#90A0AF')
                setButtonText('Check')
                setAnswer('')
                document.getElementById('userInput').value = ''
            }
            else{
                setButtonText('Finish')
            }
        }
        
    }
    return(
        <Container>
            <Paper className={classes.paper}>
                <List className={classes.header}>
                    <ListItem className={classes.score}>
                        <span>
                            <Typography display='inline' variant='h3'><StarIcon fontSize="large"/>{score}</Typography>
                        </span>
                    </ListItem>
                </List>
                <Container className={classes.workField}>
                    <Card className={classes.card} 
                        style={{backgroundColor: noteColor}}
                        variant="outlined">
                        <CardContent>
                            <Typography className={classes.newWord}>
                                {lesson[i].question}
                            </Typography>
                            {wordChecked &&
                                <Typography className={classes.translatedWord}>
                                    {lesson[i].answer}
                                </Typography>
                            }
                        </CardContent>
                    </Card>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <TextField variant="outlined" type="text" id="userInput"
                            onChange={e => setAnswer(e.target.value)} />
                        <br /><br />
                        <Button variant="contained"
                            color="#527D2A"s
                            size="large" 
                            type="submit">{buttonText}</Button>
                    </form>
                    
                </Container>
                <List>
                    <ListItem className={classes.footer}>
                        <Typography variant="h3" align='right'>{i+1}/{lesson.length}</Typography>
                    </ListItem>
                </List>
            </Paper>
        </Container>
        
    );
}
export default Lesson;