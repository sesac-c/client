import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { Breadcrumbs } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

interface Breadcrumb {
  homeIcon: JSX.Element;
  breadcrumbTrail: string[];
}

interface PageInfo {
  page: String;
  button?: {
    buttonText?: String;
    buttonIcon?: JSX.Element;
    buttonOnclick?: () => void;
  };
}
interface ContentHeaderProps {
  breadcrumb: Breadcrumb;
  pageInfo: PageInfo;
}

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
              <Link underline='hover' color='neutral' href='#some-link' sx={{ fontSize: 12, fontWeight: 500 }}>
                {trail}
              </Link>
            ) : (
              <Typography color='primary' sx={{ fontWeight: 500, fontSize: 12 }}>
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
        <Typography level='h2' component='h1'>
          {page}
        </Typography>
        {button && (
          <Button color='primary' startDecorator={button.buttonIcon} size='sm' onClick={button.buttonOnclick}>
            {button.buttonText}
          </Button>
        )}
      </Box>
    </>
  );
};

export default ContentHeader;
