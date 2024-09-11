import React, { ReactNode } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';

export interface Item {
  id: string;
  date: string;
  status: 'Paid' | 'Refunded' | 'Cancelled' | string;
  customer: {
    initial: string;
    name: string;
    email: string;
  };
}

export interface Column {
  id: keyof Item;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

export type Order = 'asc' | 'desc';

export interface ItemComponentProps {
  items: Item[];
  columns: Column[];
  onDownload?: (id: string) => void;
  onRowAction?: (action: string, item: Item) => void;
}

// 임시
export interface Customer {
  initial: string;
  name: string;
  email: string;
}

export interface Row {
  id: string;
  date: string;
  status: string;
  customer: Customer;
}

export const statusIcons = {
  Paid: React.createElement(CheckRoundedIcon),
  Refunded: React.createElement(AutorenewRoundedIcon),
  Cancelled: React.createElement(BlockIcon)
};

export const statusColors: Record<Row['status'], ColorPaletteProp> = {
  Paid: 'success',
  Refunded: 'neutral',
  Cancelled: 'danger'
};

export const getStatusColor = (status: string): ColorPaletteProp => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'success';
    case 'refunded':
      return 'neutral';
    case 'cancelled':
      return 'danger';
    default:
      return 'primary';
  }
};

export const getStatusIcon = (status: string): ReactNode => {
  switch (status.toLowerCase()) {
    case 'paid':
      return React.createElement(CheckRoundedIcon);
    case 'refunded':
      return React.createElement(AutorenewRoundedIcon);
    case 'cancelled':
      return React.createElement(BlockIcon);
    default:
      return null;
  }
};
export interface TableRowProps {
  row: Row;
}
// interface TableContentProps {
//   rows: any[];  // 검증되지 않은 데이터를 받습니다
// }
export interface RowMenuProps {
  onAction: (action: string) => void;
}

export interface TableContentProps {
  rows: Row[];
}
