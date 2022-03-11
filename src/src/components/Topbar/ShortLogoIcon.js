import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Topbar.module.css';

const MenuIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  return (
  
 <svg id="Layer_1"
 data-name="Layer 1" 
 xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 512" style ={{width:"auto", height:"50"}}>
    <path className={css.Slogo} d="M256,384,107.61,128H404.39ZM155.38,155.52,256,329.12l100.62-173.6Z"/>
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
