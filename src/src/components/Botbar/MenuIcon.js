import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Botbar.module.css';

const MenuIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  return (
    // <svg
    //   className={classes}
    //   width="18"
    //   height="12"
    //   viewBox="0 0 18 12"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <g fillRule="evenodd">
    //     <rect width="18" height="2" rx="1" />
    //     <rect y="5" width="18" height="2" rx="1" />
    //     <rect y="10" width="18" height="2" rx="1" />
    //   </g>
      
    // </svg>
    <svg className={classes}
     
     height="18"
     xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 30 30">
       <g id="Layer_2" data-name="Layer 2"
       ><g id="Layer_1-2" data-name="Layer 1" fill="#fff">
         <g id="Creator_Login_Sign_up" data-name="Creator Login Sign up">
           <path className={css.clsIcon} d="M15,2A13,13,0,1,1,2,15,13,13,0,0,1,15,2m0-2A15,15,0,1,0,30,15,15,15,0,0,0,15,0Z"/>
           <ellipse className={css.clsIcon} cx="14.4" cy="11.75" rx="4.45" ry="5.5"/><path className={css.clsIcon} d="M3.84,24.62C2,22,27.76,10.13,25.81,22.52,24,34,5.67,27.25,3.84,24.62Z"/></g>
           </g></g>
           </svg>
  );
};

const { string } = PropTypes;

MenuIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

MenuIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default MenuIcon;
