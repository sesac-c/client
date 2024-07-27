const Division = ({
    variant = "primary",
    type = "vertical"
}) => {
    const baseClasses = 'm-1';
    const variantClasses = {
        primary: 'bg-primary',
    };
    const typeClasses = {
        vertical: 'w-[0.05vw] min-h-3.5',
        horizontal: 'min-w-full h-[2px]',
    };
    const classes = `${baseClasses} ${variantClasses[variant]} ${typeClasses[type]}`;

    return <div className={classes}></div>
}
export default Division;