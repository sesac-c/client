import loginMascotImage from '../../assets/images/login-mascot.gif'
import ErrorMascotImage from "../../assets/images/error-mascot.gif";

const MascotImage = ({
    type
}) => {
    const mascotImage = {
        login: loginMascotImage,
        error: ErrorMascotImage,
    }
    return (
        <div className="relative w-full h-full">
            <img src={mascotImage[type]} alt='mascot image'
                 className='absolute inset-0 w-full h-full object-contain' 
            />
        </div>
    )
}
export default MascotImage;