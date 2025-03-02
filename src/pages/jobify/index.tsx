import * as React from 'react';
import {
  Stack,
  Typography,
  CardOverflow,
  Link,
  Table,
  Box,
  Avatar,
} from '@mui/joy';
import { Pagination, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TabsBasic from 'src/components/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import {
  FETCH_COMPANIES_REQUEST,
  FETCH_DATA_REQUEST,
} from 'src/store/Firebase/constants';
import { CapitalizeFirsLetter } from 'src/helpers/utils';
import Header from 'src/components/header';

export default function TableTextEllipsis() {
  const { joblist, companiesList } = useSelector(
    (state: RootState) => state.firebase.data,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: FETCH_COMPANIES_REQUEST });
  }, [dispatch]);

  React.useEffect(() => {
    dispatch({ type: FETCH_DATA_REQUEST });
  }, [dispatch, companiesList]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 14;

  const currentPageItems = joblist.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15px',
        marginLeft: '10%',
        marginRight: '10%',
        gap: 1,
      }}
    >
      <Header/>
      <TabsBasic name={companiesList}>
        <Box
          sx={{
            padding: 0,
            borderBottom: 'solid 1px #eef2f6',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'column' },
            alignItems: 'center',
          }}
        >
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table
                aria-label="table with ellipsis texts"
                noWrap
                sx={{ position: 'relative', zIndex: 0 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '40%' }}>{'Openings'}</TableCell>
                    <TableCell style={{ width: '10%' }}>{'Company'}</TableCell>
                    <TableCell style={{ width: '10%' }}>{'Updated on'}</TableCell>
                    <TableCell style={{ width: '45%' }}>{'Source'}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {joblist &&
                    currentPageItems.map((item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5,
                                }}
                              >
                                <Avatar src="/static/images/avatar/1.jpg" />
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography noWrap fontWeight="lg">
                                    {item.title}
                                  </Typography>
                                  <Typography noWrap level="body-sm">
                                    {item.category}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {CapitalizeFirsLetter(item.company)}
                            </TableCell>
                            <TableCell>
                              {item.createdAt}
                            </TableCell>
                            <TableCell>
                              <Link href={item.url}>{item.url}</Link>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(joblist.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
      </TabsBasic>
    </Stack>
  );
}
