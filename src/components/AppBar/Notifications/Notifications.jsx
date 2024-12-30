import { useEffect, useState } from 'react';
import moment from 'moment';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentNotifications, getInvitationsApi, updateBoardInvitationApi, addNotification } from '~/redux/notifications/notificationsSlice';
import { selectCurrentUser } from '~/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { socket } from '~/socket';

const BOARD_INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

function Notifications() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget);
    setHasNewNotifications(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Check if there is new notification change badge to dot
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  // Get notifications and user from redux store
  const dispatch = useDispatch();
  const notifications = useSelector(selectCurrentNotifications);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getInvitationsApi());

    // Real-time update notification
    const onReceiveNewBoardInvitation = (invitation) => {
      if (invitation.inviteeId === user._id) {
        // Add new invitation to redux store
        dispatch(addNotification(invitation));
        setHasNewNotifications(true);
      }
    };
    socket.on('invite-user-to-board', onReceiveNewBoardInvitation);

    return () => {
      socket.off('invite-user-to-board', onReceiveNewBoardInvitation);
    };
  }, [dispatch, user._id]);

  // Hadle update board invitation status
  const updateBoardInvitation = (status, invitationId) => {
    // Call API to update board invitation status
    dispatch(updateBoardInvitationApi({ status, invitationId })).then((res) => {
      if (status === BOARD_INVITATION_STATUS.ACCEPTED) {
        navigate(`/boards/${res.payload.boardInvitation.boardId}`);
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="error"
          variant={hasNewNotifications ? 'dot' : 'standard'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
        TransitionProps={{ timeout: 150 }}
      >

        {(!notifications || (notifications.length === 0)) && <MenuItem sx={{ minWidth: 200 }}>
          <Typography
            sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
          >No notifications available...</Typography>
        </MenuItem>}

        {notifications?.map((notification, index) =>
          <Box key={index}>
            <MenuItem sx={{
              minWidth: 200,
              maxWidth: 400,
              overflowY: 'auto'
            }}>
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', gap: 1 }}>

                {/* Notification avatar */}
                <Avatar alt="inviteeAvatar" src={notification?.inviter?.avatar} sx={{ width: '35px', height: '35px', marginTop: 0.5 }} />

                <Box sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column' }}>
                  {/* Notifcation content */}
                  <Box>
                    <Typography component="span" fontWeight="700">
                      {notification?.inviter?.displayName}
                    </Typography>{' '}
                    <Typography component="span" fontWeight="400">
                      has invited you to join the board
                    </Typography>
                    {' '}
                    <Typography component="span" fontWeight="600">
                      {notification?.board?.title}
                    </Typography>
                  </Box>
                  {/* Notification time */}
                  <Box sx={{ marginTop: -0.5, marginBottom: 1.5 }}>
                    <Typography variant="span" sx={{ fontSize: '13px', color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}>
                      {moment(notification?.createdAt).fromNow()}
                    </Typography>
                  </Box>
                  {/* If status is pending, show action */}
                  {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.PENDING &&
                    (<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        className="interceptor-loading"
                        type="submit"
                        variant="contained"
                        color="inherit"
                        size="small"
                        onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.REJECTED, notification._id)}
                      >
                        Decline
                      </Button>
                      <Button
                        className="interceptor-loading"
                        type="submit"
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.ACCEPTED, notification._id)}
                      >
                        Accept
                      </Button>
                    </Box>)
                  }
                  {/* If status code is accepted/rejected */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.REJECTED &&
                      <Chip icon={<NotInterestedIcon />} label="Declined" size="small" />
                    }
                    {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.ACCEPTED &&
                      <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                    }
                  </Box>
                </Box>

              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== (notifications.length - 1) && <Divider />}
          </Box>
        )}
      </Menu>
    </Box>
  );
}

export default Notifications;
