import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Card({ noData }) {
  if (!noData) {
    return (
      <MuiCard sx={{ cursor: 'pointer', overflow: 'unset' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://w0.peakpx.com/wallpaper/526/99/HD-wallpaper-mountain-2d-2d-landscape-black-blue-foggy-mountains-purple-trees-violet.jpg"
        />
        <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
          <Typography >
            Card...
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingTop: 0 }}>
          <Button size="small" startIcon={<GroupIcon />}>20</Button>
          <Button size="small" startIcon={<CommentIcon />}>15</Button>
          <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
        </CardActions>
      </MuiCard>
    );
  }
  return (
    <MuiCard sx={{ cursor: 'pointer', overflow: 'unset' }}>
      <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
        <Typography >
          No Data
        </Typography>
      </CardContent>
    </MuiCard>
  );
}

export default Card;