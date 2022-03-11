import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Botbar.module.css';

const BecomeApartnerIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootMenuIconn, className);

  return (
    <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123 123">
      <defs>
        
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <circle className={css.cls1} cx="61.5" cy="61.5" r="60"/>
          <line className={css.cls2} x1="61.5" y1="39.5" x2="61.5" y2="83.5"/>
          <line className={css.cls2} x1="39.5" y1="61.5" x2="83.5" y2="61.5"/>
        </g>
      </g>
    </svg>
    
  );
};

const { string } = PropTypes;

BecomeApartnerIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

BecomeApartnerIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default BecomeApartnerIcon;
