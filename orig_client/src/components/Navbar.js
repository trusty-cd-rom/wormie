import React, {
  Component,
  TabBarIOS,
  StyleSheet,
} from 'react-native';
import Profile from './Profile';
import FeedList from './FeedList';
// import api from '../Utils/api';


class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feeds'
    }
  }
  // goToProfile() {
  //   this.props.navigator.replace({
  //     // title: 'Profile Page',
  //     component: Profile,
  //   });
  // }
  // goToFeedList() {
  //   this.props.navigator.replace({
  //     // title: 'FeedList',
  //     component: FeedList,
  //   });
  // }
  render() {
    return (
      <TabBarIOS
        tintColor="grey"
        barTintColor="black"
        selectedTab={this.state.selectedTab}
      >
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'feeds'}
          icon={{uri:'featured'}}
          onPress={() => {
            this.setState({
              selectedTab: 'feeds',
            });
            // this.goToFeedList.bind(this)
          }}>
          <FeedList />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="contacts"
          selected={this.state.selectedTab === 'profile'}
          icon={{uri:'contacts'}}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
            // this.goToProfile.bind(this)
          }}>
          <Profile />
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}

export default Navbar;