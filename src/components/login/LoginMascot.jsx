import mascotImage from '../../assets/images/login-mascot.gif'

const LoginMascot = () => {
    return (
        <div className="relative w-full h-full">
            <img src={mascotImage} alt='mascot image'
                 className='absolute inset-0 w-full h-full object-contain' 
            />
        </div>
    )
}
export default LoginMascot;