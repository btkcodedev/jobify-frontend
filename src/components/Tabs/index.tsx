import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function TabsBasic({ name, children }: { name: string, children: React.ReactNode }) {
  return (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab>{name}</Tab>
      </TabList>
      {children}
    </Tabs>
  );
}
