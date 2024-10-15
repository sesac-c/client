import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GroupTabs = ({ tabs, path }) => {
  const [active, setActive] = useState(path);
  const navigate = useNavigate();

  const handleTab = (e, value) => {
    navigate(`./../${value}`);
    setActive(value);
  };

  console.log(tabs);
  return (
    <div className='group-tab'>
      <Tabs value={active} onChange={handleTab}>
        {tabs.map(({ label, value }) => (
          <Tab key={value} label={label} value={value} />
        ))}
      </Tabs>
    </div>
  );
};

export default GroupTabs;
