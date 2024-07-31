import Division from "./UI/Division.jsx";
import InputText from "./UI/InputText.jsx";

const HeaderedInputSection = ({
    title,
    ExtraInfoElement,
    ...props
}) => {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-3">
            <div>
                <div className="flex flex-row justify-between items-end">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {
                        ExtraInfoElement && <ExtraInfoElement/>
                    }
                </div>
                <Division
                    variant="secondary"
                    type="horizontal"
                />
            </div>
            <div className="w-full h-fit px-3">
                <InputText size='small' {...props} />
            </div>
        </div>
    );
};

export default HeaderedInputSection;