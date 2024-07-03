import defaultProfileImage from '../../../assets/images/default-profile.png';
import PropTypes from 'prop-types';

const ProfileImage = ({
    image
}) => {
    const profileImage = image || defaultProfileImage;
    return (
        <div className="h-full aspect-square rounded-full p-1 bg-secondary shadow-md shadow-primary-950">
            <img
                src={profileImage}
                alt="profile image"
                className='
                    w-full h-full object-cover                    
                    mx-auto
                '
            />
        </div>
    )
}

ProfileImage.propTypes = {
    image: PropTypes.string,
};

export default ProfileImage;