import React, {
  Component,
  StyleSheet,
} from 'react-native';
import Profile from '../containers/Profile';
import Discover from '../containers/Discover';
import FeedList from '../containers/FeedList';
import Explore from '../containers/Explore';
var { TabBarIOS, } = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;
// import api from '../Utils/api';


class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
  }

  render() {
    let { setClickedProfile, currentUser } = this.props;
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#875FFF'}
        barTintColor={'#000000'}>
        <TabBarItemIOS
          name="map"
          iconName={'ion|map'}
          selectedIconName={'ion|map'}
          title={''}
          iconSize={32}
          accessibilityLabel="Map Tab"
          selected={this.state.selectedTab === 'map'}
          onPress={() => {
            this.setState({
              selectedTab: 'map',
            });
          }}>
          <Explore navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'discover'}
          icon={{uri:'featured'}}
          onPress={() => {
          <FeedList navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="discover"
            iconName={'ion|planet'}
            selectedIconName={'ion|planet'}
            title={''}
            iconSize={32}
            accessibilityLabel="Discover Tab"
            selected={this.state.selectedTab === 'discover'}
            onPress={() => {
            this.setState({
              selectedTab: 'discover',
            });
          }}>
          <Discover navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="profile"
            iconName={'ion|person'}
            selectedIconName={'ion|person'}
            title={''}
            iconSize={32}
            accessibilityLabel="Profile Tab"
            selected={this.state.selectedTab === 'profile'}
            onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          <Profile navigator={this.props.navigator}/>
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

export default Navbar;
