import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupTabs = ({ tabs, path }) => {
  const [active, setActive] = useState(path);
  const navigate = useNavigate();

  const color = 'success.main';

  const handleTab = (e, value) => {
    navigate(`./../${value}`);
    setActive(value);
  };

  return (
    <div className='group-tab'>
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
    </div>
  );
};

export default GroupTabs;
