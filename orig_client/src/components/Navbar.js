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
      selectedTab: 'map'
    };
  }

  componentWillMount() {
    var { currentUser, getUserDetailsForLoggedInUser } = this.props;
    console.log("COMPONENT WILL MOUNT");
    getUserDetailsForLoggedInUser();
  }

  render() {
    let { currentUser, setClickedProfile } = this.props;
    
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#4CC6EA'}
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
        </TabBarItemIOS>
        <TabBarItemIOS
            name="discover"
            iconName={'fontawesome|rocket'}
            selectedIconName={'fontawesome|rocket'}
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
              setClickedProfile(currentUser);
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
