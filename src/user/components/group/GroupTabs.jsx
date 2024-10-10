import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useState } from 'react';

const GroupTabs = ({ tabs, onChange }) => {
  const [active, setActive] = useState(tabs[0].value);

  const handleTab = (e, value) => {
    setActive(value);
    onChange(value);
  };

  return (
    <Tabs value={active} onChange={handleTab}>
      {tabs.map(({ label, value }) => (
        <Tab key={value} label={label} value={value} />
      ))}
    </Tabs>
  );
};

export default GroupTabs;
