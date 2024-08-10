import PropTypes from 'prop-types';
import Division from './Division';
import InputText from './InputText';

const HeaderedInputText = ({ title, ExtraInfoElement, ...inputProps }) => {
  return (
    <div className='mx-auto flex w-full max-w-md flex-col gap-3'>
      <div>
        <div className='flex flex-row items-end justify-between'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          {ExtraInfoElement && <ExtraInfoElement />}
        </div>
        <Division variant='secondary' type='horizontal' />
      </div>
      <div className='h-fit w-full px-3'>
        <InputText size='small' {...inputProps} />
      </div>
    </div>
  );
};

HeaderedInputText.propTypes = {
  title: PropTypes.string.isRequired,
  ExtraInfoElement: PropTypes.elementType
};

export default HeaderedInputText;
