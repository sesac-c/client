import { Link } from "react-router-dom";

const TextButton = ({ 
    variant ='primary',
    content, 
    className = "", 
    ...props 
}) => {
    const baseClasses = className+' underline';
    const variantClasses = {
        primary: 'text-primary',
        secondary: '',
        tertiary: '',
        quaternary: '',
    };

    const classes = `${baseClasses} ${variantClasses[variant]}`;

    return (
        <Link className={classes} {...props}>
            {content}
        </Link>
    )
}
export default TextButton;