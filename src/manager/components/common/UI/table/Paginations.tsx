import * as React from 'react';
import { Box, Button } from '@mui/joy';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon
} from '@mui/icons-material';
import { PaginationsProps } from '../../../../types/table';
import { createNewPage, getPageNumbers, handleJump } from '../../../../utils';

const Paginations: React.FC<PaginationsProps> = ({ page, onPageChange }) => {
  const { totalPages } = page;
  const displayPageNumber = page.pageNumber + 1;

  const handlePageChange = (newPageNumber: number) => {
    onPageChange(createNewPage(page, newPageNumber - 1)); // 0부터 시작하는 페이지 번호로 변환
  };

  return (
    <Box
      className='Pagination-laptopUp'
      sx={{
        pt: 1,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        display: {
          xs: 'none',
          md: 'flex'
        }
      }}
    >
      <Button
        size='sm'
        variant='outlined'
        color='neutral'
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={() => handlePageChange(handleJump(displayPageNumber, 'prev', totalPages))}
        disabled={displayPageNumber <= 1}
      >
        이전
      </Button>

      <Box sx={{ flex: 1 }} />
      {getPageNumbers(displayPageNumber, totalPages).map((num, index) =>
        typeof num === 'number' ? (
          <IconButton
            key={index}
            size='sm'
            variant={num === displayPageNumber ? 'outlined' : 'plain'}
            color='neutral'
            onClick={() => handlePageChange(num)}
          >
            {num}
          </IconButton>
        ) : (
          <Box key={index} sx={{ px: 1 }}>
            {num}
          </Box>
        )
      )}
      <Box sx={{ flex: 1 }} />
      <Button
        size='sm'
        variant='outlined'
        color='neutral'
        endDecorator={<KeyboardArrowRightIcon />}
        disabled={displayPageNumber >= totalPages}
        onClick={() => handlePageChange(handleJump(displayPageNumber, 'next', totalPages))}
      >
        다음
      </Button>
    </Box>
  );
};

export default Paginations;
