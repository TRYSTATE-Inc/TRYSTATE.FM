import React from 'react';
import PropTypes from 'prop-types';

const IconLogo = props => {
  const { className, format, ...rest } = props;

  if (format === 'desktop') {
    return (
      <svg id="Layer_1" data-name="Layer 1"
        className={className}
        {...rest}
        xmlns="http://www.w3.org/2000/svg"
        width="141"
        height="26"
        viewBox="0 0 141 26">
        <rect width="141" height="26" />
        <path class="cls-1" fill="#fff" d="M90,135,37.83,45H142.17ZM54.62,54.68l35.38,61,35.38-61Z" />
      </svg>
    );
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
