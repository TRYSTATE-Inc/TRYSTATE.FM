import React, { Component } from 'react';
import { array, bool, func, oneOf, object, shape, string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import unionWith from 'lodash/unionWith';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { parse, stringify } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { SearchMap, ModalInMobile, Page ,Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';
import { TopbarContainer , BotbarContainer } from '../../containers';
import  PhoneInput   from '../../external/react-phone-input-2-master/src/index.js';
import  rawCountries   from '../../external/react-phone-input-2-master/src/rawCountries.js';
import  CountryData   from '../../external/react-phone-input-2-master/src/CountryData.js';
import  rawTerritories   from '../../external/react-phone-input-2-master/src/rawTerritories.js';

import   '../../external/style.css';



import AuthCode from 'react-auth-code-input';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import $ from "jquery"; //babel


import { searchMapListings, setActiveListing } from './SearchPage.duck';
import {
  pickSearchParamsOnly,
  validURLParamsForExtendedData,
  validFilterParams,
  createSearchResultSchema,
} from './SearchPage.helpers';
import MainPanel from './MainPanel';
import css from './SearchPage.module.css';

const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.

export class SearchPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchMapOpenOnMobile: true,
      //props.tab === 'map',
      isMobileModalOpen: false,
    };
this.txes=0,
    this.searchMapListingsInProgress = false;
    
this.handleLogin=this.handleLogin.bind(this);
this.handleregister=this.handleregister.bind(this);
this.handlecode=this.handlecode.bind(this);
this.oncangeitemcode=this.oncangeitemcode.bind(this);
this.closeitem=this.closeitem.bind(this);




this.oncangeitem=this.oncangeitem.bind(this);
    this.onMapMoveEnd = debounce(this.onMapMoveEnd.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
    this.onOpenMobileModal = this.onOpenMobileModal.bind(this);
    this.onCloseMobileModal = this.onCloseMobileModal.bind(this);
  }
   handleregister = ({ value }) => {
    
      event.preventDefault();
    var number=localStorage.getItem("number");

      var settings = {
        "url": "https://webapplication120220318150943.azurewebsites.net/api/Account/Register",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer -7SfDUdkdTQeH_cQ8VqhN98q-bxErpYoEo4MqIrVAcyrB0O6tLLlFAxyseEALw_Vi-P-4vw5enKiKO5WRQZ5SRbsUkESZbesU7czKFzq27SmrgWCrZp9PVIEWj-c5oyE-1LqMSXusjQd_ahPFvjyNQqwnvbC0ttI2FFOrVuEGv0T4oZ96MiQa88QZQ9oEuJ4Y4FZ2Bkd3Elx7V8C-OYeKfdBPYs-9nGEqLHBA3w6CHuLrPE7rqXYG2enIGmvAeXIJnHBzSuBbvwwIKrS3cVz5XWQk0xezCpaoEeR445TgKDSAX-VKedBZH9n1k_4To67bJ4PszK5PGvqYOOucFO45a-OoEPM1yEIPlyvu2VBg6kdynBNPYzbt78QpcdPxXIq",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "Email":document.getElementById("Email").value+"@trystate.com",
          "firstname":document.getElementById("FirstName").value,
          "lastname":document.getElementById("lastname").value,
          "mobilenumber":number,
          "BirthDate":document.getElementById("Birthdate").value,
          "Password":"P@ssw0rd",
          "ConfirmPassword":"P@ssw0rd",      
        }),
      };
      
        $.ajax(settings).done(function (response) {
          document.getElementById("Popup").style.display = "none";
          document.getElementById("JoinButton").style.display = "none";
          document.getElementById("Loginbutton").innerText = "Hi "+response.Profile.FirstName;

        });
      
    };
     handleLogin(event) {
      event.preventDefault();
      localStorage.setItem("number",this.txes);
      var number = this.txes;
    
      var settings = {
        "url": "https://webapplication120220318150943.azurewebsites.net/api/Values?number=" + number,
        "method": "POST",
        "timeout": 0,
      };
    
      $.ajax(settings).done(function (response) {
        if (response == true) {
          document.getElementById("login").style.display = "none";
          document.getElementById("verfiy").style.display = "";
          this.txes=0;
        }
      });
      
    
    }
     handlecode(event) {
    var number=localStorage.getItem("number");
       var settings = {
         "url": "https://webapplication120220318150943.azurewebsites.net/api/Values?code="+this.txes+"&mobileNumber="+number,
         "method": "POST",
         "timeout": 0,
       };
    
       $.ajax(settings).done(function (response) {

        if(!response.isOTPsuccessed)
        {
            alert("the OTP is incorrect !")
        } 
      else  if(response.ISuserregisted)
        {
         document.getElementById("Loginbutton").innerText = "Hi "+response.Profile.FirstName;
         document.getElementById("Popup").style.display = "none";
         document.getElementById("JoinButton").style.display = "none";

        //  let x = document.getElementById('Popup');
        
          // window.location.href = '/'
        }
        else{
         document.getElementById("verfiy").style.display = "none";
         document.getElementById("register").style.display = "";
        }
       });
    }
    txes=0;
    oncangeitemcode(value) {
       
      this.txes=value;
    if(value.length==6)
    {
      this.handlecode();
    }
    }
     oncangeitem(value) {
       
      this.txes=value;
  
    }
  // Callback to determine if new search is needed
  // when map is moved by user or viewport has changed
  onMapMoveEnd(viewportBoundsChanged, data) {
    const { viewportBounds, viewportCenter } = data;

    const routes = routeConfiguration();
    const searchPagePath = pathByRouteName('SearchPage', routes);
    const currentPath =
      typeof window !== 'undefined' && window.location && window.location.pathname;

    // When using the ReusableMapContainer onMapMoveEnd can fire from other pages than SearchPage too
    const isSearchPage = currentPath === searchPagePath;

    // If mapSearch url param is given
    // or original location search is rendered once,
    // we start to react to "mapmoveend" events by generating new searches
    // (i.e. 'moveend' event in Mapbox and 'bounds_changed' in Google Maps)
    if (viewportBoundsChanged && isSearchPage) {
      const { history, location, filterConfig } = this.props;

      // parse query parameters, including a custom attribute named category
      const { address, bounds, mapSearch, ...rest } = parse(location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });

      //const viewportMapCenter = SearchMap.getMapCenter(map);
      const originMaybe = config.sortSearchByDistance ? { origin: viewportCenter } : {};

      const searchParams = {
        address,
        ...originMaybe,
        bounds: viewportBounds,
        mapSearch: true,
        ...validFilterParams(rest, filterConfig),
      };

      history.push(createResourceLocatorString('SearchPage', routes, {}, searchParams));
    }
  }

  // Invoked when a modal is opened from a child component,
  // for example when a filter modal is opened in mobile view
  onOpenMobileModal() {
    this.setState({ isMobileModalOpen: true });
  }

  // Invoked when a modal is closed from a child component,
  // for example when a filter modal is opened in mobile view
  onCloseMobileModal() {
    this.setState({ isMobileModalOpen: false });
  }
  CloseBtn(event) {
    event.preventDefault();   
     // document.getElementById("displaySearch").style.display = "inline";
    let x = document.getElementById('Popup');
    
    if (x.className === (css.apearPopup) ) {
      x.className = (css.modalBackground);
      
    } 
   
  
   }
   showPopupLog() {
    // document.getElementById("displaySearch").style.display = "inline";
    let x = document.getElementById('Popup');
    document.getElementById("login").style.display = "";

    document.getElementById("verfiy").style.display = "none";
    document.getElementById("register").style.display = "none";
    if (x.className === (css.modalBackground) ) {
      x.className = (css.apearPopup);
      
    } 
   }
   CloseBtn2(event) {
    event.preventDefault();   
     // document.getElementById("displaySearch").style.display = "inline";
     document.getElementById("login").style.display = "";
     document.getElementById("verfiy").style.display = "none";
     
   
  
   }
   closeitem(event)
   {
    event.preventDefault();     

    document.getElementById("Popup").style.display = "none";

   }
   showPopupJoin() {
    // document.getElementById("displaySearch").style.display = "inline";
    document.getElementById("login").style.display = "";

    document.getElementById("verfiy").style.display = "none";
    document.getElementById("register").style.display = "none";
    let x = document.getElementById('Popup');
    if (x.className === (css.modalBackground) ) {
      x.className = (css.apearPopup);
      
    } 
   }

  render() {
    const {
      intl,
      listings,
      filterConfig,
      sortConfig,
      history,
      location,
      mapListings,
      onManageDisableScrolling,
      pagination,
      scrollingDisabled,
      searchInProgress,
      searchListingsError,
      searchParams,
      activeListingId,
      onActivateListing,
    } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { mapSearch, page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    // urlQueryParams doesn't contain page specific url params
    // like mapSearch, page or origin (origin depends on config.sortSearchByDistance)
    const urlQueryParams = pickSearchParamsOnly(searchInURL, filterConfig, sortConfig);

    // Page transition might initially use values from previous search
    const urlQueryString = stringify(urlQueryParams);
    const paramsQueryString = stringify(
      pickSearchParamsOnly(searchParams, filterConfig, sortConfig)
    );
    const searchParamsAreInSync = urlQueryString === paramsQueryString;

    const validQueryParams = validURLParamsForExtendedData(searchInURL, filterConfig);

    const isWindowDefined = typeof window !== 'undefined';
    const isMobileLayout = isWindowDefined && window.innerWidth < MODAL_BREAKPOINT;
    const shouldShowSearchMap =
      !isMobileLayout || (isMobileLayout && this.state.isSearchMapOpenOnMobile);

    const onMapIconClick = () => {
      this.useLocationSearchBounds = true;
      this.setState({ isSearchMapOpenOnMobile: true });
    };

    const { address, bounds, origin } = searchInURL || {};
    const { title, description, schema } = createSearchResultSchema(listings, address, intl);

    // Set topbar class based on if a modal is open in
    // a child component
    const topbarClasses = this.state.isMobileModalOpen
      ? classNames(css.topbarBehindModal, css.topbar)
      : css.topbar;

    // N.B. openMobileMap button is sticky.
    // For some reason, stickyness doesn't work on Safari, if the element is <button>
    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        description={description}
        title={title}
        schema={schema}
      >
          <div className={css.containerLogin}  >
          <div className={css.joinBtn}>
          <button  id="JoinButton"
           onClick={this.showPopupJoin}
          >
            Join
          </button>
         </div>
         <div className={css.LoginBtn}>
          <button  id="Loginbutton"
           onClick={this.showPopupLog}
          >
            Log in
          </button>
         </div>
         </div>
        <TopbarContainer
          className={topbarClasses}
          currentPage="SearchPage"
          currentSearchParams={urlQueryParams}
        />
         
         <BotbarContainer
          className={topbarClasses}
          currentPage="SearchPage"
          currentSearchParams={urlQueryParams}
        />
        <div className={css.container}>
          <MainPanel
            urlQueryParams={validQueryParams}
            listings={listings}
            searchInProgress={searchInProgress}
            searchListingsError={searchListingsError}
            searchParamsAreInSync={searchParamsAreInSync}
            onActivateListing={onActivateListing}
            onManageDisableScrolling={onManageDisableScrolling}
            onOpenModal={this.onOpenMobileModal}
            onCloseModal={this.onCloseMobileModal}
            onMapIconClick={onMapIconClick}
            pagination={pagination}
            searchParamsForPagination={parse(location.search)}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            history={history}
          />
          {/* <ModalInMobile
            className={css.mapPanel}
            id="SearchPage.map"
            isModalOpenOnMobile={this.state.isSearchMapOpenOnMobile}
            onClose={() => this.setState({ isSearchMapOpenOnMobile: false })}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            onManageDisableScrolling={onManageDisableScrolling}
          > */}
            <div className={css.mapWrapper}>
              {/* {shouldShowSearchMap ? ( */}
                <SearchMap
                  reusableContainerClassName={css.map}
                  activeListingId={activeListingId}
                  bounds={bounds}
                  center={origin}
                  isSearchMapOpenOnMobile={this.state.isSearchMapOpenOnMobile}
                  location={location}
                  listings={mapListings || []}
                  onMapMoveEnd={this.onMapMoveEnd}
                  onCloseAsModal={() => {
                    onManageDisableScrolling('SearchPage.map', false);
                  }}
                  messages={intl.messages}
                />
              {/* ) : null} */}
            </div>
          
        
          
        </div> 
        {/* </ModalInMobile> */}
                   {/**************************************POPUP************************************ */}
                   <div id="Popup" style={{zIndex:100}} className={css.modalBackground}>
          <div className={css.modalContainer}>
         
            <div >
          
        <Form id="login" onSubmit={this.handleLogin}>          
         <div className={css.headerPopup}>
             <div className={css.titleCloseBtn}>
               <button onClick={this.CloseBtn} >
               X
                </button>
              </div>
              <span className={css.joinLogin}>Join or Log in</span>
           <div/>
           </div>
         
            
            <div>
            <div className={css.PhoneInputinternational}> Welcome to the Team.</div>
              <PhoneInput
                international
                placeholder="Enter your phone number"
                className={css.number}
                country={'us'}
                  
                id="item"
                withCountryCallingCode
                onChange={this.oncangeitem}
                disableDropdown/>
              <div className={css.mobileMarginOflogin}>
               <PrimaryButton  className={css.onclick} type="submit" >
                Continue
                </PrimaryButton>
             </div>
            </div>
          </Form>
          <Form id="register"  onSubmit={this.handleregister} className={css.register} >
        
              <div className={css.headerPopup}>
             <div className={css.titleCloseBtn}>
             <button onClick={this.CloseBtn} >
                X
                </button>
              </div>
              <span className={css.joinLogin}>Finish signing up</span>
           <div/>
           </div>
              

           <input
                className={css.firstname}
                id= "FirstName"
                name="FirstName"
                placeholder="First name"
              />
              <input
                className={css.LastName}
                id="lastname"
                name="LastName"
                placeholder="Last name"
              />
              <small className={css.terms}>Make sure it matches the name on your governement ID.</small>

              <input
                className={css.UserName}
                id="Email"
                name="UserName"
                placeholder="Username"
                />
              {/* <div className={css.usernameClass}>
             
                <label className={css.trystateSpan}>@trystate.fm</label>
              </div> */}
                 <input
                className={css.birthDate}
                id="Birthdate"
                type="date"
                name="date"
                placeholder="Birthdate"
                maxlength="10"
                pattern="^(1[0-2]|0?[1-9])[./-](3[01]|[12][0-9]|0?[1-9])[./-](?:[0-9]{2})?[0-9]{2}$"
              />
               
            
              <p className={css.ageTerms}>To sign up, you need to be at least 16. Your birthday won't be shared publicly.</p>
            
            <div className={css.bottomWrapper}>
              <div className={css.justifingPargraph}>
              <p className={css.bottomWrapperText}>
                By selecting <span className={css.agree}>Agree and continue</span> below, I agree to the  <span className={css.mobileJustifingPargraph}>TRYSTATE.FM  <a className={css.termsSrv}>Terms of Service</a>.</span></p>
                </div>
              <PrimaryButton className={css.onclick}  type="submit"  >
              Agree and continue
              </PrimaryButton>
            </div>
          </Form>
           {/* *********************************** ENTER THE CODE WE SENT YOU*************************************** */}
           
           <Form id='verfiy'  onSubmit={this.handleLogin} className={css.register}>
           <div className={css.headerPopup}>
             <div className={css.titleCloseBtn}>

             <button onClick={this.CloseBtn2} >
               
               {
                 "<"
               }
                </button>
              </div>
              <span className={css.joinLogin}>Confirm your number</span>
           <div/>
           </div>
           
           <h2 className={css.enterCode}>Please enter the code we sent you.</h2>
            <AuthCode
              containerClassName={css.containerAuth}
              inputClassName={css.input}
              className={css.enterCode}
              onChange={this.oncangeitemcode}
              // placeholder="Enter 6 digit here"
               />
              <div className={css.resendCode}>
                <div>
              <button type="submit">Resend code</button>
              </div>
              </div>
            {/* <PrimaryButton className={css.onclick} type="submit"  >
              Continue
            </PrimaryButton> */}
          </Form>
          
            </div>
        
          </div>
     
     </div>
      </Page>
    );
  }
}

SearchPageComponent.defaultProps = {
  listings: [],
  mapListings: [],
  pagination: null,
  searchListingsError: null,
  searchParams: {},
  tab: 'listings',
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
  activeListingId: null,
};

SearchPageComponent.propTypes = {
  listings: array,
  mapListings: array,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSearchMapListings: func.isRequired,
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParams: object,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  filterConfig: propTypes.filterConfig,
  sortConfig: propTypes.sortConfig,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  } = state.SearchPage;
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );

  return {
    listings: pageListings,
    mapListings,
    pagination,
    scrollingDisabled: isScrollingDisabled(state),
    searchInProgress,
    searchListingsError,
    searchParams,
    activeListingId,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
  onActivateListing: listingId => dispatch(setActiveListing(listingId)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SearchPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SearchPageComponent);

export default SearchPage;