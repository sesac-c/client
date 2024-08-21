import PropTypes from 'prop-types';
import Division from './Division.jsx';

const LabeledWrapper = ({ title, ExtraInfoElement, children, extraInfo }) => {
  return (
    <div className='mx-auto flex w-full max-w-md flex-col gap-3'>
      <div>
        <div className='flex flex-row items-end justify-between'>
          <h2 className='pl-2 text-basic font-semibold'>{title}</h2>
          {ExtraInfoElement && <ExtraInfoElement {...extraInfo} />}
        </div>
        <Division variant='secondary' type='horizontal' />
      </div>
      <div className='h-fit w-full pl-2'>{children}</div>
    </div>
  );
};

LabeledWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  ExtraInfoElement: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  extraInfo: PropTypes.object
};

export default LabeledWrapper;
