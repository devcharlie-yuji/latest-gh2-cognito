import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupText,
  InputGroup,
  Input,
  UncontrolledAlert,
  Dropdown,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
  Form
} from 'reactstrap';
import {
  openSidebar,
  closeSidebar,
  changeSidebarPosition,
  changeSidebarVisibility
} from '../../actions/navigation';

import Notifications from '../Notifications';
import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
import BellIcon from "../Icons/HeaderIcons/BellIcon";
import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";
import MessageIcon from "../Icons/HeaderIcons/MessageIcon";
import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import adminDefault from '../../images/chat/chat2.png';
import s from './Header.module.scss';

import { withAuthenticator } from "@aws-amplify/ui-react"; // ✅ Add this

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
    signOut: PropTypes.func, // ✅ Cognito signOut function
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
      notificationsOpen: false,
    };
  }

  doLogout = async () => {
    try {
      await this.props.signOut(); // ✅ This will trigger Cognito sign-out and redirect
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  toggleNotifications = () => {
    this.setState(prev => ({ notificationsOpen: !prev.notificationsOpen }));
  }

  toggleMessagesDropdown = () => {
    this.setState(prev => ({ messagesOpen: !prev.messagesOpen }));
  }

  toggleSupportDropdown = () => {
    this.setState(prev => ({ supportOpen: !prev.supportOpen }));
  }

  toggleSettingsDropdown = () => {
    this.setState(prev => ({ settingsOpen: !prev.settingsOpen }));
  }

  toggleAccountDropdown = () => {
    this.setState(prev => ({ accountOpen: !prev.accountOpen }));
  }

  toggleSearchOpen = () => {
    this.setState(prev => ({ searchOpen: !prev.searchOpen }));
  }

  toggleSidebar = () => {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar = (position) => {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar = (visibility) => {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    const user = this.props.currentUser;
    const avatar = user?.avatar?.length && user.avatar[0].publicUrl;
    const firstUserLetter = user && (user.firstName || user.email)[0].toUpperCase();

    return (
      <Navbar className="d-print-none">
        <div className={s.burger}>
          <NavLink onClick={this.toggleSidebar} className={`d-md-none ${s.navItem} text-white`} href="#">
            <BurgerIcon className={s.headerIcon} />
          </NavLink>
        </div>

        <div className={`d-print-none ${s.root}`}>
          <UncontrolledAlert className="me-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s">
            Check out Light Blue
            <button
              className="btn-link"
              onClick={() => this.setState({ settingsOpen: true })}
            >
              <SettingsIcon className={`${s.settingsIcon} btn-link`} />
            </button>
            on the right!
          </UncontrolledAlert>

          <Collapse className={`${s.searchCollapse} ms-lg-0 me-md-3`} isOpen={this.state.searchOpen}>
            <InputGroup className={`${s.navbarForm} ${this.state.searchFocused ? s.navbarFormFocused : ''}`}>
              <InputGroupText className={s.inputAddon}>
                <i className="fa fa-search" />
              </InputGroupText>
              <Input
                id="search-input-2"
                placeholder="Search..."
                className="input-transparent"
                onFocus={() => this.setState({ searchFocused: true })}
                onBlur={() => this.setState({ searchFocused: false })}
              />
            </InputGroup>
          </Collapse>

          <Form className="d-md-down-none mx-3 my-auto">
            <InputGroup className={`input-group-no-border ${s.searchForm}`}>
              <InputGroupText className={s.inputGroupText}>
                <SearchIcon className={s.headerIcon} />
              </InputGroupText>
              <Input id="search-input" className="input-transparent" placeholder="Search Dashboard" />
            </InputGroup>
          </Form>

          <Nav className="ms-md-0">
            <Dropdown nav isOpen={this.state.notificationsOpen} toggle={this.toggleNotifications}>
              <DropdownToggle nav caret style={{ color: "#C1C3CF", padding: 0 }}>
                <span className={`small d-sm-down-none ${s.adminEmail}`}>{user ? (user.firstName || user.email) : "User"}</span>
                <Badge className={`d-sm-down-none ${s.badge}`} color="danger">9</Badge>
              </DropdownToggle>
              <DropdownMenu className={`${s.notificationsWrapper} py-0`}>
                <Notifications />
              </DropdownMenu>
            </Dropdown>

            <Dropdown nav isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
              <DropdownToggle nav className={`d-sm-down-none ${s.navItem} text-white`}>
                <MessageIcon className={s.headerIcon} />
              </DropdownToggle>
              <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`}>
                <DropdownItem>Messages loading...</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown nav isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown}>
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <SettingsIcon className={s.headerIcon} />
              </DropdownToggle>
              <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
                <h6>Sidebar on the</h6>
                <ButtonGroup size="sm">
                  <Button onClick={() => this.moveSidebar('left')} className={this.props.sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
                  <Button onClick={() => this.moveSidebar('right')} className={this.props.sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
                </ButtonGroup>
                <h6 className="mt-2">Sidebar</h6>
                <ButtonGroup size="sm">
                  <Button onClick={() => this.toggleVisibilitySidebar('show')} className={this.props.sidebarVisibility === 'show' ? 'active' : ''}>Show</Button>
                  <Button onClick={() => this.toggleVisibilitySidebar('hide')} className={this.props.sidebarVisibility === 'hide' ? 'active' : ''}>Hide</Button>
                </ButtonGroup>
              </DropdownMenu>
            </Dropdown>

            <NavItem>
              <Button onClick={this.doLogout} style={{ color: 'white', backgroundColor: 'transparent', border: 'none' }}>
                <PowerIcon className={s.headerIcon} />
              </Button>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
    currentUser: store.auth.currentUser,
  };
}

// ✅ Wrapped with withAuthenticator to get signOut from Cognito
export default withAuthenticator(withRouter(connect(mapStateToProps)(Header)));




// import { connect } from 'react-redux';
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
// import {
//   Navbar,
//   Nav,
//   NavItem,
//   NavLink,
//   InputGroupText,
//   InputGroup,
//   Input,
//   UncontrolledAlert,
//   Dropdown,
//   Collapse,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Badge,
//   ButtonGroup,
//   Button,
//   Form
// } from 'reactstrap';
// import Notifications from '../Notifications';
// import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
// import BellIcon from "../Icons/HeaderIcons/BellIcon";
// import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";
// import MessageIcon from "../Icons/HeaderIcons/MessageIcon";
// import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
// import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
// import ArrowIcon from "../Icons/HeaderIcons/ArrowIcon";


// import { logoutUser } from '../../actions/auth';
// import { openSidebar, closeSidebar, changeSidebarPosition, changeSidebarVisibility } from '../../actions/navigation';

// import sender1 from '../../images/people/a1.jpg';
// import sender2 from '../../images/people/a5.jpg';
// import sender3 from '../../images/people/a4.jpg';

// import adminDefault from '../../images/chat/chat2.png';

// import s from './Header.module.scss';

// class Header extends React.Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     sidebarPosition: PropTypes.string.isRequired,
//   };

//   constructor(props) {
//     super(props);

//     this.doLogout = this.doLogout.bind(this);
//     this.onDismiss = this.onDismiss.bind(this);
//     this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
//     this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
//     this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
//     this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
//     this.toggleSidebar = this.toggleSidebar.bind(this);
//     this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

//     this.state = {
//       visible: true,
//       messagesOpen: false,
//       supportOpen: false,
//       settingsOpen: false,
//       searchFocused: false,
//       searchOpen: false,
//       notificationsOpen: false
//     };
//   }

//   toggleNotifications = () => {
//     this.setState({
//       notificationsOpen: !this.state.notificationsOpen,
//     });
//   }

//   onDismiss() {
//     this.setState({ visible: false });
//   }

//   doLogout() {
//     this.props
//       .dispatch(logoutUser());
//   }

//   toggleMessagesDropdown() {
//     this.setState({
//       messagesOpen: !this.state.messagesOpen,
//     });
//   }

//   toggleSupportDropdown() {
//     this.setState({
//       supportOpen: !this.state.supportOpen,
//     });
//   }

//   toggleSettingsDropdown() {
//     this.setState({
//       settingsOpen: !this.state.settingsOpen,
//     });
//   }

//   toggleAccountDropdown() {
//     this.setState({
//       accountOpen: !this.state.accountOpen,
//     });
//   }

//   toggleSearchOpen() {
//     this.setState({
//       searchOpen: !this.state.searchOpen,
//     });
//   }

//   toggleSidebar() {
//     this.props.isSidebarOpened
//       ? this.props.dispatch(closeSidebar())
//       : this.props.dispatch(openSidebar())
//   }

//   moveSidebar(position) {
//     this.props.dispatch(changeSidebarPosition(position));
//   }

//   toggleVisibilitySidebar(visibility) {
//     this.props.dispatch(changeSidebarVisibility(visibility));
//   }

//   render() {
//     const user = this.props.currentUser;
//     const avatar = user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;

//     const firstUserLetter = user && (user.firstName|| user.email)[0].toUpperCase();
//     return (
//       <Navbar className="d-print-none">
//         <div className={s.burger}>
//           <NavLink onClick={this.toggleSidebar} className={`d-md-none ${s.navItem} text-white`} href="#">
//             <BurgerIcon className={s.headerIcon} />
//           </NavLink>
//         </div>

//         <div className={`d-print-none ${s.root}`}>
//           <UncontrolledAlert className="me-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s">
//             Check out Light Blue
//             <button
//               className="btn-link"
//               onClick={() => this.setState({ settingsOpen: true })}
//             >
//               <SettingsIcon className={`${s.settingsIcon} btn-link`} />
//             </button>
//             on the right!
//           </UncontrolledAlert>

//           <Collapse className={`${s.searchCollapse} ms-lg-0 me-md-3`} isOpen={this.state.searchOpen}>
//             <InputGroup className={`${s.navbarForm} ${this.state.searchFocused ? s.navbarFormFocused : ''}`}>
//               <InputGroupText className={s.inputAddon}>
//                 <i className="fa fa-search" />
//               </InputGroupText>
//               <Input
//                 id="search-input-2"
//                 placeholder="Search..."
//                 className="input-transparent"
//                 onFocus={() => this.setState({ searchFocused: true })}
//                 onBlur={() => this.setState({ searchFocused: false })}
//               />
//             </InputGroup>
//           </Collapse>

//           <Form className="d-md-down-none mx-3 my-auto">
//             <InputGroup className={`input-group-no-border ${s.searchForm}`}>
//               <InputGroupText className={s.inputGroupText}>
//                 <SearchIcon className={s.headerIcon} />
//               </InputGroupText>
//               <Input id="search-input" className="input-transparent" placeholder="Search Dashboard" />
//             </InputGroup>
//           </Form>

//           <Nav className="ms-md-0">
//             <Dropdown nav isOpen={this.state.notificationsOpen} toggle={this.toggleNotifications}>
//               <DropdownToggle nav caret style={{ color: "#C1C3CF", padding: 0 }}>
//                 <span className={`small d-sm-down-none ${s.adminEmail}`}>{user ? (user.firstName || user.email) : "User"}</span>
//                 <Badge className={`d-sm-down-none ${s.badge}`} color="danger">9</Badge>
//               </DropdownToggle>
//               <DropdownMenu className={`${s.notificationsWrapper} py-0`}>
//                 <Notifications />
//               </DropdownMenu>
//             </Dropdown>

//             <Dropdown nav isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
//               <DropdownToggle nav className={`d-sm-down-none ${s.navItem} text-white`}>
//                 <MessageIcon className={s.headerIcon} />
//               </DropdownToggle>
//               <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`}>
//                 <DropdownItem>Messages loading...</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>

//             <Dropdown nav isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown}>
//               <DropdownToggle nav className={`${s.navItem} text-white`}>
//                 <SettingsIcon className={s.headerIcon} />
//               </DropdownToggle>
//               <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
//                 <h6>Sidebar on the</h6>
//                 <ButtonGroup size="sm">
//                   <Button onClick={() => this.moveSidebar('left')} className={this.props.sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
//                   <Button onClick={() => this.moveSidebar('right')} className={this.props.sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
//                 </ButtonGroup>
//                 <h6 className="mt-2">Sidebar</h6>
//                 <ButtonGroup size="sm">
//                   <Button onClick={() => this.toggleVisibilitySidebar('show')} className={this.props.sidebarVisibility === 'show' ? 'active' : ''}>Show</Button>
//                   <Button onClick={() => this.toggleVisibilitySidebar('hide')} className={this.props.sidebarVisibility === 'hide' ? 'active' : ''}>Hide</Button>
//                 </ButtonGroup>
//               </DropdownMenu>
//             </Dropdown>

//             <NavItem>
//               <NavLink onClick={this.doLogout} className={`${s.navItem} text-white`} href="#">
//                 <PowerIcon className={s.headerIcon} />
//               </NavLink>
//             </NavItem>
//           </Nav>
//         </div>
//       </Navbar>
//     );
//   }
// }

// function mapStateToProps(store) {
//   return {
//     isSidebarOpened: store.navigation.sidebarOpened,
//     sidebarVisibility: store.navigation.sidebarVisibility,
//     sidebarPosition: store.navigation.sidebarPosition,
//     currentUser: store.auth.currentUser,
//   };
// }

// export default withRouter(connect(mapStateToProps)(Header));



// import { connect } from 'react-redux';
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
// import {
//   Navbar,
//   Nav,
//   NavItem,
//   NavLink,
//   InputGroupText,
//   InputGroup,
//   Input,
//   UncontrolledAlert,
//   Dropdown,
//   Collapse,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Badge,
//   ButtonGroup,
//   Button,
//   Form
// } from 'reactstrap';
// import Notifications from '../Notifications';
// import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
// import BellIcon from "../Icons/HeaderIcons/BellIcon";
// import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";
// import MessageIcon from "../Icons/HeaderIcons/MessageIcon";
// import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
// import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
// import ArrowIcon from "../Icons/HeaderIcons/ArrowIcon";


// import { logoutUser } from '../../actions/auth';
// import { openSidebar, closeSidebar, changeSidebarPosition, changeSidebarVisibility } from '../../actions/navigation';

// import sender1 from '../../images/people/a1.jpg';
// import sender2 from '../../images/people/a5.jpg';
// import sender3 from '../../images/people/a4.jpg';

// import adminDefault from '../../images/chat/chat2.png';

// import s from './Header.module.scss';

// class Header extends React.Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     sidebarPosition: PropTypes.string.isRequired,
//   };

//   constructor(props) {
//     super(props);

//     this.doLogout = this.doLogout.bind(this);
//     this.onDismiss = this.onDismiss.bind(this);
//     this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
//     this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
//     this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
//     this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
//     this.toggleSidebar = this.toggleSidebar.bind(this);
//     this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

//     this.state = {
//       visible: true,
//       messagesOpen: false,
//       supportOpen: false,
//       settingsOpen: false,
//       searchFocused: false,
//       searchOpen: false,
//       notificationsOpen: false
//     };
//   }

//   toggleNotifications = () => {
//     this.setState({
//       notificationsOpen: !this.state.notificationsOpen,
//     });
//   }

//   onDismiss() {
//     this.setState({ visible: false });
//   }

//   doLogout() {
//     this.props
//       .dispatch(logoutUser());
//   }

//   toggleMessagesDropdown() {
//     this.setState({
//       messagesOpen: !this.state.messagesOpen,
//     });
//   }

//   toggleSupportDropdown() {
//     this.setState({
//       supportOpen: !this.state.supportOpen,
//     });
//   }

//   toggleSettingsDropdown() {
//     this.setState({
//       settingsOpen: !this.state.settingsOpen,
//     });
//   }

//   toggleAccountDropdown() {
//     this.setState({
//       accountOpen: !this.state.accountOpen,
//     });
//   }

//   toggleSearchOpen() {
//     this.setState({
//       searchOpen: !this.state.searchOpen,
//     });
//   }

//   toggleSidebar() {
//     this.props.isSidebarOpened
//       ? this.props.dispatch(closeSidebar())
//       : this.props.dispatch(openSidebar())
//   }

//   moveSidebar(position) {
//     this.props.dispatch(changeSidebarPosition(position));
//   }

//   toggleVisibilitySidebar(visibility) {
//     this.props.dispatch(changeSidebarVisibility(visibility));
//   }

//   render() {
//     const user = this.props.currentUser;
//     const avatar = user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;

//     const firstUserLetter = user && (user.firstName|| user.email)[0].toUpperCase();
//     return (
//       <Navbar className={`d-print-none`}>
//         <div className={s.burger}>
//           <NavLink onClick={this.toggleSidebar} className={`d-md-none ${s.navItem} text-white`} href="#">
//             <BurgerIcon className={s.headerIcon} />
//           </NavLink>
//         </div>
//         <div className={`d-print-none ${s.root}`}>
//           <UncontrolledAlert className={`me-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}>
//                 Check out Light Blue
//                 <button
//                   className="btn-link"
//                   onClick={() => this.setState({ settingsOpen: true })}
//                 >
//                   <SettingsIcon className={`${s.settingsIcon} btn-link`} />
//                 </button> on the right!
//             </UncontrolledAlert>
//           <Collapse className={`${s.searchCollapse} ms-lg-0 me-md-3`} isOpen={this.state.searchOpen}>
//             <InputGroup className={`${s.navbarForm} ${this.state.searchFocused ? s.navbarFormFocused : ''}`}>

//               <InputGroupText className={s.inputAddon}>
//                 <i className="fa fa-search" />
//               </InputGroupText>

//               <Input
//                 id="search-input-2" placeholder="Search..." className="input-transparent"
//                 onFocus={() => this.setState({ searchFocused: true })}
//                 onBlur={() => this.setState({ searchFocused: false })}
//               />
//             </InputGroup>
//           </Collapse>
//           <Form className="d-md-down-none mx-3 my-auto">
//             <InputGroup className={`input-group-no-border ${s.searchForm}`} >
//               <InputGroupText className={s.inputGroupText}>
//                 <SearchIcon className={s.headerIcon} />
//               </InputGroupText>
//               <Input id="search-input" className="input-transparent" placeholder="Search Dashboard" />
//             </InputGroup>
//           </Form>

//           <Nav className="ms-md-0">
//             <Dropdown nav isOpen={this.state.notificationsOpen} toggle={this.toggleNotifications} id="basic-nav-dropdown" className={`${s.notificationsMenu}`} >
//               <DropdownToggle nav caret style={{color: "#C1C3CF", padding: 0}}>
//               <span className={`${s.avatar} rounded-circle float-start`}>
//                 {avatar ? (
//                   <img src={avatar} onError={e => e.target.src = adminDefault} alt="..." title={user && (user.firstName || user.email)} />
//                 ) : user && user.role === 'admin' ? (
//                   <img src={adminDefault} onError={e => e.target.src = adminDefault} alt="..." title={user && (user.firstName || user.email)} />
//                 ) : <span title={user && (user.firstName || user.email)}>{firstUserLetter}</span>
//                 }
//               </span>
//                 <span className={`small d-sm-down-none ${s.adminEmail}`}>{user ? (user.firstName || user.email) : "Philip Smith"}</span>
//                 <Badge className={`d-sm-down-none ${s.badge}`} color="danger">9</Badge>
//               </DropdownToggle>
//               <DropdownMenu className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}>
//                 <Notifications />
//               </DropdownMenu>
//             </Dropdown>
//             <NavItem className="d-lg-none">
//               <NavLink onClick={this.toggleSearchOpen} className={s.navItem} href="#">
//                 <SearchIcon addId='header-search' className={s.headerIcon} />
//               </NavLink>
//             </NavItem>
//             <Dropdown nav isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
//               <DropdownToggle nav className={`d-sm-down-none ${s.navItem} text-white`}>
//                 <MessageIcon className={s.headerIcon} />
//               </DropdownToggle>
//               <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`}>
//                 <DropdownItem>
//                   <img className={s.image} src={sender1} alt="" />
//                   <div className={s.details}>
//                     <div>Jane Hew</div>
//                     <div className={s.text}>
//                       Hey, John! How is it going? ...
//                     </div>
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <img className={s.image} src={sender2} alt="" />
//                   <div className={s.details}>
//                     <div>Alies Rumiancaŭ</div>
//                     <div className={s.text}>
//                       I will definitely buy this template
//                     </div>
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <img className={s.image} src={sender3} alt="" />
//                   <div className={s.details}>
//                     <div>Michał Rumiancaŭ</div>
//                     <div className={s.text}>
//                       Is it really Lore ipsum? Lore ...
//                     </div>
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   {/* eslint-disable-next-line */}
//                   <a href="#" className="text-white">
//                     See all messages <ArrowIcon className={s.headerIcon} maskName="messagesArrow" />
//                   </a>
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//             <NavItem className={`${s.divider} d-none d-sm-block`} />
//             <Dropdown className="d-none d-sm-block" nav isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown}>
//               <DropdownToggle nav className={`${s.navItem} text-white`}>
//                 <SettingsIcon addId='header-settings' className={s.headerIcon} />
//               </DropdownToggle>
//               <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
//                 <h6>Sidebar on the</h6>
//                 <ButtonGroup size="sm">
//                   <Button color="primary" onClick={() => this.moveSidebar('left')} className={this.props.sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
//                   <Button color="primary" onClick={() => this.moveSidebar('right')} className={this.props.sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
//                 </ButtonGroup>
//                 <h6 className="mt-2">Sidebar</h6>
//                 <ButtonGroup size="sm">
//                   <Button color="primary" onClick={() => this.toggleVisibilitySidebar('show')} className={this.props.sidebarVisibility === 'show' ? 'active' : ''}>Show</Button>
//                   <Button color="primary" onClick={() => this.toggleVisibilitySidebar('hide')} className={this.props.sidebarVisibility === 'hide' ? 'active' : ''}>Hide</Button>
//                 </ButtonGroup>
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown className="d-none d-sm-block" nav isOpen={this.state.supportOpen} toggle={this.toggleSupportDropdown}>
//               <DropdownToggle nav className={`${s.navItem} text-white`}>
//                 <BellIcon className={s.headerIcon} />
//                 <span className={s.count}></span>
//               </DropdownToggle>
//               <DropdownMenu className={`${s.dropdownMenu} ${s.support}`}>
//                 <DropdownItem>
//                   <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
//                   <div className={s.details}>
//                     Check out this awesome ticket
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <Badge color="warning"><i className="fa fa-question-circle" /></Badge>
//                   <div className={s.details}>
//                     What is the best way to get ...
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <Badge color="success"><i className="fa fa-info-circle" /></Badge>
//                   <div className={s.details}>
//                     This is just a simple notification
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <Badge color="info"><i className="fa fa-plus" /></Badge>
//                   <div className={s.details}>
//                     12 new orders has arrived today
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <Badge color="danger"><i className="fa fa-tag" /></Badge>
//                   <div className={s.details}>
//                     One more thing that just happened
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem>
//                 {/* eslint-disable-next-line */}
//                 <a href="#" className="text-white">
//                     See all tickets <ArrowIcon className={s.headerIcon} maskName="bellArrow" />
//                 </a>
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//             <NavItem>
//               <NavLink onClick={this.doLogout} className={`${s.navItem} text-white`} href="#">
//                 <PowerIcon className={s.headerIcon} />
//               </NavLink>
//             </NavItem>
//           </Nav>
//         </div>
//       </Navbar>
//     );
//   }
// }

// function mapStateToProps(store) {
//   return {
//     isSidebarOpened: store.navigation.sidebarOpened,
//     sidebarVisibility: store.navigation.sidebarVisibility,
//     sidebarPosition: store.navigation.sidebarPosition,
//     currentUser: store.auth.currentUser,
//   };
// }

// export default withRouter(connect(mapStateToProps)(Header));

