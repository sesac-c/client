import { Box, Typography } from '@mui/joy';
import KakaoMap from './KakaoMap';

const Address: React.FC<{ address: string; longitude?: string; latitude?: string }> = ({
  address,
  longitude,
  latitude
}) => {
  return (
    <Box border={1}>
      {longitude && latitude && <KakaoMap {...{ longitude, latitude }} />}
      <Typography level='body-md' className='w-full border-t-2 border-t-gray-300 text-center' py={1}>
        {address}
      </Typography>
    </Box>
  );
};
export default Address;
