import PropTypes from 'prop-types';
import Division from "./UI/Division";
import InputText from "./UI/InputText";

const HeaderedInputSection = ({
  title,
  ExtraInfoElement,
  ...inputProps
}) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3">
      <div>
        <div className="flex flex-row justify-between items-end">
          <h2 className="text-lg font-semibold">{title}</h2>
          {ExtraInfoElement && <ExtraInfoElement />}
        </div>
        <Division variant="secondary" type="horizontal" />
      </div>
      <div className="w-full h-fit px-3">
        <InputText size="small" {...inputProps} />
      </div>
    </div>
  );
};

HeaderedInputSection.propTypes = {
  title: PropTypes.string.isRequired,
  ExtraInfoElement: PropTypes.elementType,
};

export default HeaderedInputSection;