import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSearch.module.css';

const IconSearch = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    // <svg
    //   className={classes}
    //   width="21"
    //   height="22"
    //   viewBox="0 0 21 22"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <g
    //     transform="matrix(-1 0 0 1 20 1)"
    //     strokeWidth="2"
    //     fill="none"
    //     fillRule="evenodd"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   >
    //     <path d="M13 14l5.241 5.241" />
    //     <circle cx="7.5" cy="7.5" r="7.5" />
    //   </g>
    // </svg>
    <svg
      className={classes}
      width="24"
      height="25"
      viewBox="-1 -1 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform= "translate(-50%, -50%)"
        strokeWidth="1.3"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.733 11.733l3.727 3.727" />
        <circle cx="6.4" cy="6.4" r="6.4" />
      </g>
    </svg>
    
  );
};

IconSearch.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconSearch.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconSearch;
