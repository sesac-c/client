import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { Breadcrumbs } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ContentHeaderProps } from '@/types';

const ContentHeader: React.FC<ContentHeaderProps> = ({ breadcrumb, pageInfo }: ContentHeaderProps) => {
  const { homeIcon, breadcrumbTrail } = breadcrumb;
  const { page, register } = pageInfo;
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link underline='none' color='neutral' aria-label='Home'>
          {homeIcon}
        </Link>
        <Breadcrumbs
          size='sm'
          aria-label='breadcrumbs'
          separator={<ChevronRightRoundedIcon fontSize='small' />}
          sx={{ pl: 0 }}
        >
          {breadcrumbTrail.map((trail, idx) =>
            idx !== breadcrumbTrail.length - 1 ? (
              <Link key={trail} underline='hover' color='neutral' sx={{ fontSize: 12, fontWeight: 500 }}>
                {trail}
              </Link>
            ) : (
              <Typography key={trail} color='primary' sx={{ fontWeight: 500, fontSize: 12 }}>
                {trail}
              </Typography>
            )
          )}
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        <Typography level='h3' component='h1'>
          {page}
        </Typography>
        {register && register}
      </Box>
    </>
  );
};

export default ContentHeader;
