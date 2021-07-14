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

const useStyles = makeStyles((theme) => ({
    card: {
        width: 300,
        maxHeight: 400,
        textAlign: 'left'
    },
    cardContent: {
        maxHeight: 400,
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: 40
    },
    media: {
        height: 200,
        width: 170
    },
    
  }));

export default function UserLessonCard({
    id, title, score}){
    const classes = useStyles()
    const link = '/lesson/'+id
    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h4">
                        {title}
                    </Typography>
            </CardContent>

            <CardActions className={classes.cardAction}>
                <ListItem> 
                    <StarIcon/>{score}
                </ListItem>
                <IconButton size="medium" color="inherit" href={link}>
                    <PlayCircleFilledWhiteIcon fontSize="large"/>
                </IconButton>
            </CardActions> 
        </Card>

    );
}