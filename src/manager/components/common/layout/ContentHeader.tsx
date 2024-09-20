import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { Breadcrumbs } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ContentHeaderProps } from '../../../types';

const ContentHeader: React.FC<ContentHeaderProps> = ({ breadcrumb, pageInfo }: ContentHeaderProps) => {
  const { homeIcon, breadcrumbTrail } = breadcrumb;
  const { page, button } = pageInfo;
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
        {button && (
          <Button
            sx={{
              backgroundColor: 'var(--joy-palette-success-100, #E3FBE3)',
              color: 'var(--joy-palette-neutral-800, #171A1C)',
              ':hover': {
                bgcolor: 'var(--joy-palette-success-300, #A1E8A1)'
              }
            }}
            startDecorator={button.buttonIcon}
            size='sm'
            onClick={button.buttonOnclick}
          >
            {button.buttonText}
          </Button>
        )}
      </Box>
    </>
  );
};

export default ContentHeader;
