import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import CardOverflow from '@mui/joy/CardOverflow';
import TabsBasic from 'src/components/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { FETCH_TAB_NAME } from 'src/store/Tab/constants';
import { FETCH_DATA_REQUEST } from 'src/store/Firebase/constants';

export default function TableTextEllipsis() {
  const tabName = useSelector((state: RootState) => state.tab.name);
  const jobs = useSelector((state: RootState) => state.firebase.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: FETCH_TAB_NAME });
    dispatch({ type: FETCH_DATA_REQUEST });
  }, [dispatch]);
  return (
    <TabsBasic name={tabName}>
      <CardOverflow>
        <Table
          aria-label="table with ellipsis texts"
          noWrap
          sx={{ mx: 'left', width: 1000 }}
        >
          <thead>
            <tr>
              <th>{"Asd"}</th>
              <th style={{ width: '60%' }}>
                Description (you should see a part of this message)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar src="/static/images/avatar/1.jpg" />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap fontWeight="lg">
                      Morty D Ardiousdellois Addami
                    </Typography>
                    <Typography noWrap level="body-sm">
                      Writer, Youtuber
                    </Typography>
                  </Box>
                </Box>
              </td>
              <td>
                Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt
                lacus at velit. Vivamus vel nulla eget eros elementum
                pellentesque. Quisque porta volutpat erat. Quisque erat eros,
                viverra eget, congue eget, semper rutrum, nulla.
              </td>
            </tr>
            <tr>
              <td>Joseph Morriso</td>
              <td>
                <Typography noWrap>
                  <Link href="#text-ellipsis" startDecorator="ℹ️">
                    In eleifend quam a odio
                  </Link>
                  . Suspendisse potenti in hac habitasse platea dictumst.
                </Typography>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardOverflow>
    </TabsBasic>
  );
}
