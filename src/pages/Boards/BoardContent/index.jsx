import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{
      height: (theme) => theme.taskPro.boardContentHeight,
      width: '100%',
      backgroundColor: 'primary.main',
      background: 'linear-gradient(to right, #7828fa, #00f0a0)',
      p: '10px 0'
    }}>

      {/* Use for align scroll bar padding */}
      <Box sx={{
        display: 'flex', overflowX: 'auto', overflowY: 'hidden', height: '100%', p: '10px',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Column 1 */}
        <Box sx={{
          maxWidth: '300px',
          minWidth: '300px',
          ml: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2341' : '#f0f5ff'),
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.taskPro.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Column Header  */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
            px: 2
          }}>
            <Typography sx={{
              fontSize: '1rem !important',
              fontWeight: '600',
              cursor: 'pointer'
            }}>Column Title</Typography>
            <Box >
              <Tooltip title="More options">
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    cursor: 'pointer',
                    color: 'text.primary'
                  }} />
              </Tooltip>
              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ArchiveIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Column List Card  */}
          <Box sx={{
            m: '0 5px', p: '0 5px', // Trick align scroll bar
            display: 'flex', flexDirection: 'column', gap: 2, overflowX: 'hidden', overflowY: 'auto',
            maxHeight: (theme) => `calc(
              ${theme.taskPro.boardContentHeight} -
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
            )`
          }}>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://w0.peakpx.com/wallpaper/526/99/HD-wallpaper-mountain-2d-2d-landscape-black-blue-foggy-mountains-purple-trees-violet.jpg"
              />
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography >
                  Card 01
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingTop: 0 }}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
            <Button variant="text" sx={{ fontWeight: '600' }} startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        {/* Column 2 */}
        <Box sx={{
          maxWidth: '300px',
          minWidth: '300px',
          ml: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2341' : '#f0f5ff'),
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.taskPro.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Column Header  */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
            px: 2
          }}>
            <Typography sx={{
              fontSize: '1rem !important',
              fontWeight: '600',
              cursor: 'pointer'
            }}>Column Title</Typography>
            <Box >
              <Tooltip title="More options">
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    cursor: 'pointer',
                    color: 'text.primary'
                  }} />
              </Tooltip>
              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ArchiveIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Column List Card  */}
          <Box sx={{
            m: '0 5px', p: '0 5px', // Trick align scroll bar
            display: 'flex', flexDirection: 'column', gap: 2, overflowX: 'hidden', overflowY: 'auto',
            maxHeight: (theme) => `calc(
              ${theme.taskPro.boardContentHeight} -
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
            )`
          }}>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://w0.peakpx.com/wallpaper/526/99/HD-wallpaper-mountain-2d-2d-landscape-black-blue-foggy-mountains-purple-trees-violet.jpg"
              />
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography >
                  Card 01
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingTop: 0 }}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', overflow: 'unset' }}>
              <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                <Typography>
                  Card 02
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
            <Button variant="text" sx={{ fontWeight: '600' }} startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}

export default BoardContent;
