import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Topbar.module.css';

const MenuIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  return (
  
    // <svg   className={classes}
    // width="30"
    // height="20" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="sliders-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sliders-h fa-w-16 fa-spin fa-lg"><path fill="currentColor" d="M504 384H192v-40c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v40H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h88v40c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24v-40h312c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-344 64h-32v-96h32v96zM504 96H256V56c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v40H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h152v40c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24v-40h248c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-280 64h-32V64h32v96zm280 80h-88v-40c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v40H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h312v40c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24v-40h88c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-120 64h-32v-96h32v96z" class=""></path></svg>
    <svg width="20px" height="20px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <defs>
        
        </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Sort_Filter_results" data-name="Sort/Filter results">
            <path className={css.cls1} d="M9,11.67a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5,5,5,0,0,0-5-5Z"/>
            <path className={css.cls1} d="M21.05,2a3.12,3.12,0,1,1-3.12,3.11A3.12,3.12,0,0,1,21.05,2m0-2a5.12,5.12,0,1,0,5.11,5.11A5.11,5.11,0,0,0,21.05,0Z"/>
            <path className={css.cls1} d="M17,21.77a3.12,3.12,0,1,1-3.11,3.12A3.12,3.12,0,0,1,17,21.77m0-2a5.12,5.12,0,1,0,5.12,5.12A5.11,5.11,0,0,0,17,19.77Z"/>
            <line className={css.cls2} x1="16" y1="14.67" x2="30" y2="14.67"/>
            <line className={css.cls2} y1="14.67" x2="5" y2="14.67"/>
            <line className={css.cls2} y1="24.67" x2="11" y2="24.67"/>
            <line className={css.cls2} x1="30" y1="24.67" x2="21" y2="24.67"/>
            <line className={css.cls2} y1="5.33" x2="14" y2="5.33"/>
            <line className={css.cls2} x1="30" y1="5.33" x2="25" y2="5.33"/>
            </g></g></g></svg>
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
