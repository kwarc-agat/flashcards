import React, { useState, useEffect } from 'react';
import { Container, makeStyles, withStyles, List, ListItem, Typography, Card, CardContent, Paper, TextField, IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory, useParams } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px'
    },
    card: {
        height: '400px',
        width: '400px',
    },
    paper: {
        height: '600px',
        width: '600px',
        overflow: 'auto'
    },
    table: {
        minWidth: 650
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
        minWidth: '250px', 
        minHeight: '50px',
        fontSize: '20px',
        color: '#FFFFFF'
    },
    }))(Button);

export default function AddLesson(){
    const classes = useStyles()
    const history = useHistory();
    const { lessonID } = useParams()
    const [words, setWords] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [score, setScore] = useState()
    const [newWord, setNewWord] = useState('')
    const [newTranslation, setNewTranslation] = useState('')
    const header = "Add lesson"
    
    async function handleSubmit(e){
        e.preventDefault()
        if(title != '' && score != null){
            let newFlashcards = []
            for(let elem in words){
                newFlashcards.push({
                    Question: words[elem].question, 
                    Answer: words[elem].answer
                })
            }
            let postData = {
                flashcards: newFlashcards,
                IsPublic: false,
                Name: title,
                description: description,
                score: parseInt(score),
                }
            console.log(postData)
            
            history.replace('/lessons')
        }
        else{
            alert("Invalid input")
            console.log(words)
        }
    }
    function addWord(e){
        e.preventDefault()
        if(newWord != '' && newTranslation != ''){
            let newId = 1;
            let sortedListByIds = words.slice().sort((a, b) => (a.id - b.id))
            for (let i = 0; i < sortedListByIds.length; i++) {
                if (newId === sortedListByIds[i].id) {
                newId++
                }
            }
            setWords(prevList => {
                const newItem = {
                    id: newId,
                    question: newWord,
                    answer: newTranslation,
                }
                return [...prevList, newItem]
            })
            setNewWord('')
            setNewTranslation('')
        }
        else{
            alert('Invalid word')
        }
    }
    function deleteWord(id) {
        let filteredWords = words.filter(item => item.id !== id)
        setWords([...filteredWords])
    }
    return(
        <Container>
            <form onSubmit={handleSubmit}>
                <Typography variant="h2">{header}</Typography>
                <br/>
                <ColorButton type="submit">Save changes</ColorButton>
                <br/>
                <Container className={classes.content}>
                    <Card className={classes.card}>
                        <CardContent>
                            <List>
                                <ListItem>
                                    <TextField 
                                    fullWidth
                                    label="Title"
                                    variant="outlined"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}/>
                                </ListItem>
                                <ListItem>
                                    <TextField
                                    label="Description" 
                                    value={description}
                                    multiline
                                    fullWidth
                                    onChange={e => setDescription(e.target.value)}
                                    variant="outlined"/>
                                </ListItem>
                                <ListItem>
                                <TextField
                                    value={score}
                                    label="Score"
                                    type="number"
                                    fullWidth
                                    onChange={e => setScore(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
                                </ListItem>
                                
                            </List>
                            
                        </CardContent>
                    </Card>
                    <Paper className={classes.paper}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>
                                            <Typography variant="h5"></Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant="h5">Word to learn</Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant="h5">Translation</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {words.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <IconButton onClick={()=>deleteWord(row.id)}>
                                                    <HighlightOffIcon fontSize="large"/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" align='center'>{row.question}</TableCell>
                                            <TableCell component="th" align='center'>{row.answer}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow >
                                        <TableCell></TableCell>
                                        <TableCell align='center'>
                                            <TextField variant="outlined" value={newWord}
                                                onChange={e => setNewWord(e.target.value)}/>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <TextField variant="outlined" value={newTranslation}
                                            onChange={e => setNewTranslation(e.target.value)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow align='right'>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align='right'>
                                            <ColorButton onClick={addWord}>Add word</ColorButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                
                            </Table>
                            
                        </TableContainer>
                    </Paper>
                </Container>
            </form>
        </Container>
    );
}