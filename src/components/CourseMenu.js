'use strict';
import {
  DropdownItem,
  Button,
} from "reactstrap";

import ActiveLink from './ActiveLink';
import AnalyticsService from "../services/AnalyticsService";

var React = require('react');
var ReactMenuAim = require('react-menu-aim');
var createReactClass = require('create-react-class');

var CourseMenu = createReactClass({
  mixins: [ReactMenuAim],

  getDefaultProps: function() {
    return {
      submenuDirection: 'right'
    };
  },

  getInitialState: function() {
    return {
      activeMenuIndex: 1
    };
  },

  componentWillMount: function() {
    this.initMenuAim({
      submenuDirection: this.props.submenuDirection,
      menuSelector: '.menu',
      delay: 300,
      tolerance: 75
    });
  },

  handleSwitchMenuIndex: function(index) {
    this.setState({
      activeMenuIndex: index
    });
  },
  
  render: function() {
    var self = this;
    var containerClassName = 'menu-container ' + this.props.submenuDirection;
    return (
      <div className={containerClassName}>
        <ul className="menu" onMouseLeave={this.handleMouseLeaveMenu}>
          {this.props.menuData.map(function(menu, index) {
            var className = 'menu-item';
            if (index === self.state.activeMenuIndex) {
              className += ' active';
            }

            return (
              <li className={className} key={index}
                  onMouseEnter={function(){
                    self.handleMouseEnterRow.call(self, index, self.handleSwitchMenuIndex);
                  }}>
                {menu.title ? (
                <DropdownItem header>{menu.name}</DropdownItem>)
                : menu.divider ?
                  (
                  <div>
                    <DropdownItem divider/>
                    <ActiveLink
                      activeClassName="active"
                      href={menu.link}
                      as={menu.link.as}
                      passHref
                    >
                      <DropdownItem>
                        {menu.all} <i className="fas fa-angle-double-right ml-2" />
                      </DropdownItem>
                    </ActiveLink>
                  </div>
                  )
                :
                 menu.name}
              </li>
            );
          })}
        </ul>
        <ul className="sub-menu">
          {this.props.menuData[this.state.activeMenuIndex].subMenu.map((function(subMenu, index){
            return (
              <li className="sub-menu-item" key={index} onClick={() =>
                AnalyticsService.setEvent(
                  "Navigation Item",
                  `${subMenu.subject} Course Link Clicked`,
                  "Link"
                )
              }>
                <ActiveLink
                  activeClassName="active"
                  href={subMenu.link}
                  as={subMenu.link.as}
                  passHref
                >
                  <DropdownItem>
                    {subMenu.subject}
                    {subMenu.title == "See All" && (
                      <i className="fas fa-angle-double-right ml-2" />
                    )}
                  </DropdownItem>
                </ActiveLink>
              </li>
            );
          }))}
        </ul>
      </div>
    );
  }
});

module.exports = exports = CourseMenu;
