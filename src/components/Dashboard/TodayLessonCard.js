import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '400px',
        maxheight: '300px',
        textAlign: 'left'
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        maxheight: '300px'
    },
    
  }));

export default function TodayLessonCard({
    id, title, descr, score, toEdit}){
    const classes = useStyles()
    const playLink = '/lesson/'+id
    const editLink = '/edit/'+id
    
    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h4" component="h2">
                    {title}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {descr}
                </Typography>
            </CardContent>

            <CardActions className={classes.cardAction}>
                <ListItem key={1}> 
                    <StarIcon/>{score}
                </ListItem>
                {toEdit=="true" &&
                    <IconButton size="medium" color="inherit">
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                }
                {toEdit=="true" &&
                    <IconButton size="medium" color="inherit" href={editLink}>
                        <EditIcon fontSize="large"/>
                    </IconButton>
                }
                {toEdit=="false"&&
                    <IconButton size="medium" color="inherit" href={playLink}>
                        <PlayCircleFilledWhiteIcon fontSize="large"/>
                    </IconButton>
                }
                
            </CardActions> 
        </Card>

    );
}