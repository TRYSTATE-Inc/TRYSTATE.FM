import React from 'react';
import PropTypes from 'prop-types';
import logoImage from './TRYSTATE_Name.svg';

const IconLogo = props => {
  const { className, format, ...rest } = props;

  if (format === 'desktop') {
    return (
      <img className={className} src={logoImage} alt="logo" />
    )
  }

  return (
    <svg
      className={className}
      {...rest}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" />
      <path class="cls-1" fill="#fff" d="M16,24,6.73,8H25.27ZM9.71,9.72,16,20.57,22.29,9.72Z" />
    </svg>
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
