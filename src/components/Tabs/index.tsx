import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import { Company } from 'src/types';
import { CapitalizeFirsLetter } from 'src/helpers/utils';

export default function TabsBasic({
  name,
  children,
}: {
  name: Company[];
  children: React.ReactNode;
}) {
  const names = name.flatMap((obj) => Object.values(obj));
  return (
    <Tabs defaultValue={0}>
      <TabList>
        {name &&
          names.map((name, index) => {
            return (
              <>
                <Tab key={index}>{CapitalizeFirsLetter(name)}</Tab>
              </>
            );
          })}
      </TabList>
      {children}
    </Tabs>
  );
}
