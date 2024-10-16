import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

const GroupTabs = ({ tabs, onChange }) => {
  const [active, setActive] = useState(tabs[0].value);
  const color = 'success.main';

  const handleTab = (e, value) => {
    setActive(value);
    onChange(value);
  };

  return (
    <Tabs
      value={active}
      onChange={handleTab}
      textColor='inherit'
      TabIndicatorProps={{ style: { backgroundColor: 'green' } }}
    >
      {tabs.map(({ label, value }) => (
        <Tab
          key={value}
          label={label}
          value={value}
          sx={{
            color: 'grey.500',
            '&.Mui-selected': { color, fontWeight: 550 },
            '&.Mui-focused': { color },
            '&:hover': { color }
          }}
        />
      ))}
    </Tabs>
  );
};

export default GroupTabs;
