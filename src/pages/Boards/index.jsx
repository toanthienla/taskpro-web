import { useState, useEffect } from 'react';
import AppBar from '~/components/AppBar/AppBar';
import LoadingPage from '~/components/Loading/LoadingPage';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import HomeIcon from '@mui/icons-material/Home';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, useLocation } from 'react-router-dom';
import randomColor from 'randomcolor';
import SidebarCreateBoardModal from './create';
import { getBoardsApi } from '~/apis';

import { styled } from '@mui/material/styles';
import { DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants';

// Make style for SidebarItem using styled from MUI
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}));

function Boards() {
  const [boards, setBoards] = useState(null);
  const [totalBoards, setTotalBoards] = useState(null);

  // Get query page from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    window.scrollTo(0, 0);
    getBoardsApi(location.search).then(data => {
      setBoards(data?.boards || []);
      setTotalBoards(data?.totalBoards || 0);
    });
  }, [location.search]);

  if (!boards) {
    return <LoadingPage caption="Loading Boards..." />;
  }

  return (
    <Container disableGutters maxWidth={false} >
      <AppBar />
      <Box sx={{ paddingX: 2, paddingY: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Stack direction="column" spacing={1}>
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              {/* <SidebarItem>
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem> */}
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal />
            </Stack>
          </Grid>

          <Grid xs={12} sm={9}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your boards</Typography>

            {boards?.length > 0 &&
              <Grid container spacing={2} columns={12}>
                {boards.map(b =>
                  <Grid xs={12} sm={6} md={4} lg={3} key={b._id}>
                    <Card>
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <Box sx={{ height: '50px', backgroundColor: randomColor() }}></Box>

                      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {b?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {b?.description}
                        </Typography>
                        <Button
                          component={Link}
                          to={`/boards/${b._id}`}
                          sx={{
                            mt: 1,
                            color: 'primary.main'
                          }}>
                          Go to board <ArrowRightIcon fontSize="small" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            }

            {/* If no board in database */}
            {boards?.length === 0 &&
              <Typography variant="span" sx={{ fontWeight: 500, mb: 3 }}>No board found!</Typography>
            }

            {/* Pagination */}
            {(totalBoards > 0) &&
              <Box sx={{ my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Pagination
                  size="large"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  // Numbers of page item
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  page={page}

                  // Render item
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === 1 ? '' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Boards;
