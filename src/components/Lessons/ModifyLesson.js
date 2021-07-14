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

export default function ModifyLesson(){
    const classes = useStyles()
    const history = useHistory();
    let { id } = useParams();
    const [words, setWords] = useState([{id: 1, question: 'mango', answer: 'mango', score: '25'},
                                        {id: 2, question: 'avocado', answer: 'awokado', score: '25'},
                                        {id: 3, question: 'watermelon', answer: 'arbuz', score: '25'},
                                        {id: 4, question: 'banana', answer: 'banan', score: '25'}])
    const [title, setTitle] = useState('Fruits')
    const [description, setDescription] = useState('Check out this delicious sweets!')
    const [score, setScore] = useState(100)
    const [newWord, setNewWord] = useState('')
    const [newTranslation, setNewTranslation] = useState('')
    const header = "Edit lesson"
    
    async function handleSubmit(e){
        e.preventDefault()
        console.log("Modify lesson "+id)
        if(title != '' && score != null){
            let newFlashcards = []
            for(let elem in words){
                newFlashcards.push({
                    Question: words[elem].question, 
                    Answer: words[elem].answer
                })
            }
            let postData = {
                id: parseInt(id),
                flashcards: newFlashcards,
                isPublic: false,
                name: title,
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