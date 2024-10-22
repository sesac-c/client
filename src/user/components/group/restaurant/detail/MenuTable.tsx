import * as React from 'react';

import { MenuTableProps, MenuResponse } from '@/user/type';
import { isNumber } from '@/common/utils';
import { getMenu } from '@/user/services/api';
import { Table, Sheet } from '@mui/joy';
import { scrollStyle } from '@/common/constants';

const MenuTable: React.FC<MenuTableProps> = ({ restaurantType, id }) => {
  const [menuList, setMenuList] = React.useState<MenuResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const sheetStyle = {
    height: '400px',
    overflow: 'auto',
    ...scrollStyle
  };

  const loadMenu = React.useCallback(async () => {
    setIsLoading(true);
    try {
      if (id) {
        isNumber(id);
        const data = await getMenu(restaurantType, Number(id));
        if (data.length === 0) throw false;

        setMenuList(data);
      }
    } catch (error: any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, restaurantType]);

  React.useEffect(() => {
    loadMenu();
  }, []);

  if (isLoading) {
    return null;
  } else if (isError) {
    return <p className='w-full text-center'>등록된 메뉴가 없습니다.</p>;
  } else {
    return (
      <Sheet sx={{ ...sheetStyle }}>
        <Table variant='soft' size='md' stickyHeader stickyFooter>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>이름</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {menuList.map(row => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    );
  }
};

export default MenuTable;
