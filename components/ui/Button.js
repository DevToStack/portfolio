export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    disabled = false,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
        primary: 'bg-[var(--accent)] text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg hover:shadow-xl',
        secondary: 'border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 focus:ring-gray-500',
        outline: 'border-2 border-white/30 text-white hover:bg-white/10 focus:ring-white',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        )
    }

    return (
        <button
            onClick={onClick}
            className={classes}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
  }