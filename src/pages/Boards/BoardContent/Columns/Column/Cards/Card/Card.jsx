import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material';
import { Card as MuiCard } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';

function Card({ card }) {
  const dispatch = useDispatch();

  const showCardActions = !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  });
  const dndKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: 'none',
    opacity: isDragging ? 0.2 : undefined
  };

  return (
    <MuiCard
      onClick={() => dispatch(updateCurrentActiveCard(card))}
      ref={setNodeRef} style={dndKitStyle} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer', overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '2px solid transparent',
        '&:hover': { borderColor: (theme) => alpha(theme.palette.primary.light, 0.2) }
      }}>
      {card?.cover &&
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={card.cover}
          sx={{
            borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit'
          }}
        />
      }

      <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
        <Typography >
          {card?.title}
        </Typography>
      </CardContent>

      {showCardActions &&
        <CardActions sx={{ paddingTop: 0 }}>
          {!!card?.memberIds.length &&
            <Button size="small" startIcon={<GroupIcon />}>{card.memberIds.length}</Button>
          }
          {!!card?.comments.length &&
            <Button size="small" startIcon={<CommentIcon />}>{card.comments.length}</Button>
          }
          {!!card?.attachments.length &&
            <Button size="small" startIcon={<AttachmentIcon />}>{card.attachments.length}</Button>
          }
        </CardActions>
      }
    </MuiCard>
  );
}

export default Card;