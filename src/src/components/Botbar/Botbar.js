import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import pickBy from 'lodash/pickBy';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { withViewport } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { propTypes } from '../../util/types';
import {
  Button,
  LimitedAccessBanner,
  Logo,
  Modal,
  ModalMissingInformation,
  NamedLink,
  TopbarDesktop,
  TopbarMobileMenu,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import MenuIcon from './MenuIcon';
import BecomeApartnerIcon from './BecomeApartnerIcon';
import SearchIcon from './SearchIcon';
import css from './Botbar.module.css';

const MAX_MOBILE_SCREEN_WIDTH = 768;

const redirectToURLWithModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const searchString = `?${stringify({ [modalStateParam]: 'open', ...parse(search) })}`;
  history.push(`${pathname}${searchString}`, state);
};

const redirectToURLWithoutModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const queryParams = pickBy(parse(search), (v, k) => {
    return k !== modalStateParam;
  });
  const stringified = stringify(queryParams);
  const searchString = stringified ? `?${stringified}` : '';
  history.push(`${pathname}${searchString}`, state);
};

const GenericError = props => {
  const { show } = props;
  const classes = classNames(css.genericError, {
    [css.genericErrorVisible]: show,
  });
  return (
    <div className={classes}>
      <div className={css.genericErrorContent}>
        <p className={css.genericErrorText}>
          <FormattedMessage id="Topbar.genericError" />
        </p>
      </div>
    </div>
  );
};

const { bool } = PropTypes;

GenericError.propTypes = {
  show: bool.isRequired,
};

class BotbarComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMobileSearchOpen = this.handleMobileSearchOpen.bind(this);
    this.handleMobileSearchClose = this.handleMobileSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMobileMenuOpen() {
    const {isAuthenticated , history } = this.props;
    if (!isAuthenticated) {
     const path = pathByRouteName('LoginPage', routeConfiguration());
     history.push('/login');
     //  if (config.dev) {
     //    history.push(path);
     //  } else if (typeof window !== 'undefined') {
     //    window.location = path;
     //  }

    }
    else{
      redirectToURLWithModalState(this.props, 'mobilemenu');
    }
  }

  handleMobileMenuClose() {
    redirectToURLWithoutModalState(this.props, 'mobilemenu');
  }

  handleMobileSearchOpen() {
    //redirectToURLWithModalState(this.props, 'mobilesearch');
    window.location.replace('/');
  }

  handleMobileSearchClose() {
    redirectToURLWithoutModalState(this.props, 'mobilesearch');
  }

  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const keywords = values.keywords;
    const { history } = this.props;
    const searchParams = {
      ...currentSearchParams,
      keywords,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));

  }

  handleLogout() {
    const { onLogout, history } = this.props;
    onLogout().then(() => {
      const path = pathByRouteName('LoginPage', routeConfiguration());

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      console.log('logged out'); // eslint-disable-line
    });
  }

  render() {
    const {
      className,
      rootClassName,
      desktopClassName,
      mobileRootClassName,
      mobileClassName,
      isAuthenticated,
      authScopes,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserHasOrders,
      currentPage,
      notificationCount,
      viewport,
      intl,
      location,
      onManageDisableScrolling,
      onResendVerificationEmail,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      showGenericError,
    } = this.props;

    const { mobilemenu, mobilesearch, address, origin, bounds } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
    const isMobileMenuOpen = isMobileLayout && mobilemenu === 'open';
    const isMobileSearchOpen = isMobileLayout && mobilesearch === 'open';

    const mobileMenu = (
      <TopbarMobileMenu
        isAuthenticated={isAuthenticated}
        currentUserHasListings={currentUserHasListings}
        currentUser={currentUser}
        onLogout={this.handleLogout}
        notificationCount={notificationCount}
        currentPage={currentPage}
      />
    );

    // Only render current search if full place object is available in the URL params
    const locationFieldsPresent = config.sortSearchByDistance
      ? address && origin && bounds
      : address && bounds;
    const initialSearchFormValues = {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds },
          }
        : null,
    };

    const classes = classNames(rootClassName || css.root, className);
   if (!isAuthenticated){
    return (
      <div className={classes}>
        <LimitedAccessBanner
          isAuthenticated={isAuthenticated}
          authScopes={authScopes}
          currentUser={currentUser}
          onLogout={this.handleLogout}
          currentPage={currentPage}
        />
        <div className={classNames(mobileRootClassName || css.container, mobileClassName)}>
          {/* <NamedLink className={css.logod}  name="LandingPage">
           saunatime
           </NamedLink> */}
       
        <div className={css.logIn} >
          <Button className={css.logIn1}
            rootClassName={css.searchMenu}
            onClick={this.handleMobileSearchOpen}
            title={intl.formatMessage({ id: 'Topbar.searchIcon' })}
          >
            <SearchIcon className={css.searchMenuIcon} />
            
          </Button>
        <span className={css.logIn0} onClick={this.handleMobileSearchOpen}>Browse</span>
        </div>
        <div >
          {/* <Button className={css.partner}
            rootClassName={css.menu}
            onClick={this.handleMobileMenuOpen}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
          >
           
          </Button> */}
          {/* <div className={css.iconplus}> <i className="fal fa-plus-circle "></i></div>
             */}
             <div className={css.partnericon}>
              <NamedLink name="NewListingPage">
                <BecomeApartnerIcon />
              </NamedLink>
            
            </div>
            {notificationDot}
        </div>
        <div className={css.logIn}>
        
           <Button className={css.logIn1}
            rootClassName={css.menu}
            onClick={this.handleMobileMenuOpen}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
         >
            <MenuIcon className={css.menuIcon} />
            {notificationDot}
          </Button>
         <span className={css.logIn0} onClick={this.handleMobileMenuOpen}>Log in</span>
         
        </div>
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            className={desktopClassName}
            currentUserHasListings={currentUserHasListings}
            currentUser={currentUser}
            currentPage={currentPage}
            initialSearchFormValues={initialSearchFormValues}
            intl={intl}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            onLogout={this.handleLogout}
            onSearchSubmit={this.handleSubmit}
          />
        </div>
        <Modal
          id="TopbarMobileMenu"
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          id="TopbarMobileSearch"
          containerClassName={css.modalContainer}
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.searchContainer}>
            <TopbarSearchForm
              onSubmit={this.handleSubmit}
              initialValues={initialSearchFormValues}
              isMobile
            />
            <p className={css.mobileHelp}>
              <FormattedMessage id="Topbar.mobileSearchHelp" />
            </p>
          </div>
        </Modal>
        <ModalMissingInformation
          id="MissingInformationReminder"
          containerClassName={css.missingInformationModal}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentUserHasOrders={currentUserHasOrders}
          location={location}
          onManageDisableScrolling={onManageDisableScrolling}
          onResendVerificationEmail={onResendVerificationEmail}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
          sendVerificationEmailError={sendVerificationEmailError}
        />

        <GenericError show={showGenericError} />
      </div>
    );
   }
   else if (isAuthenticated){
    return (
      <div className={classes}>
        <LimitedAccessBanner
          isAuthenticated={isAuthenticated}
          authScopes={authScopes}
          currentUser={currentUser}
          onLogout={this.handleLogout}
          currentPage={currentPage}
        />
        <div className={classNames(mobileRootClassName || css.container, mobileClassName)}>
          {/* <NamedLink className={css.logod}  name="LandingPage">
           saunatime
           </NamedLink> */}
       
        <div className={css.logIn} >
          <Button className={css.logIn1}
            rootClassName={css.searchMenu}
            onClick={this.handleMobileSearchOpen}
            title={intl.formatMessage({ id: 'Topbar.searchIcon' })}
          >
            <SearchIcon className={css.searchMenuIcon} />
            
          </Button>
        <span className={css.logIn0} onClick={this.handleMobileSearchOpen}>Browse</span>
        </div>
        <div >
          {/* <Button className={css.partner}
            rootClassName={css.menu}
            onClick={this.handleMobileMenuOpen}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
          >
           
          </Button> */}
          {/* <div className={css.iconplus}> <i className="fal fa-plus-circle "></i></div>
             */}
             <div className={css.partnericon}>
              <NamedLink name="NewListingPage">
                <BecomeApartnerIcon />
              </NamedLink>
            
            </div>
            {notificationDot}
        </div>
        <div className={css.logIn}>
        
           <Button className={css.logIn1}
            rootClassName={css.menu}
            onClick={this.handleMobileMenuOpen}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
         >
            <MenuIcon className={css.menuIcon} />
            {notificationDot}
          </Button>
        
         <span className={css.logIn0} onClick={this.handleMobileMenuOpen}>Profile</span>
        </div>
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            className={desktopClassName}
            currentUserHasListings={currentUserHasListings}
            currentUser={currentUser}
            currentPage={currentPage}
            initialSearchFormValues={initialSearchFormValues}
            intl={intl}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            onLogout={this.handleLogout}
            onSearchSubmit={this.handleSubmit}
          />
        </div>
        <Modal
          id="TopbarMobileMenu"
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          id="TopbarMobileSearch"
          containerClassName={css.modalContainer}
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.searchContainer}>
            <TopbarSearchForm
              onSubmit={this.handleSubmit}
              initialValues={initialSearchFormValues}
              isMobile
            />
            <p className={css.mobileHelp}>
              <FormattedMessage id="Topbar.mobileSearchHelp" />
            </p>
          </div>
        </Modal>
        <ModalMissingInformation
          id="MissingInformationReminder"
          containerClassName={css.missingInformationModal}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentUserHasOrders={currentUserHasOrders}
          location={location}
          onManageDisableScrolling={onManageDisableScrolling}
          onResendVerificationEmail={onResendVerificationEmail}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
          sendVerificationEmailError={sendVerificationEmailError}
        />

        <GenericError show={showGenericError} />
      </div>
    );




   }
  } 
}

BotbarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  desktopClassName: null,
  mobileRootClassName: null,
  mobileClassName: null,
  notificationCount: 0,
  currentUser: null,
  currentUserHasOrders: null,
  currentPage: null,
  sendVerificationEmailError: null,
  authScopes: [],
};

const { array, func, number, shape, string } = PropTypes;

BotbarComponent.propTypes = {
  className: string,
  rootClassName: string,
  desktopClassName: string,
  mobileRootClassName: string,
  mobileClassName: string,
  isAuthenticated: bool.isRequired,
  authScopes: array,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onResendVerificationEmail: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  showGenericError: bool.isRequired,

  // These are passed from Page to keep Topbar rendering aware of location changes
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Botbar = compose(
  withViewport,
  injectIntl
)(BotbarComponent);

Botbar.displayName = 'Botbar';

export default Botbar;