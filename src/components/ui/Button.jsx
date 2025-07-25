import React from 'react';
import Link from 'next/link';

export default function Button({ 
  asChild = false, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  href ='/',
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow",
    secondary: "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    link: "text-indigo-600 underline-offset-4 hover:underline",
  };
  
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      className: `${classes} ${children.props.className || ''}`,
      ...props
    });
  }
  
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}