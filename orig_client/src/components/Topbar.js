import React, {
  Text,
  View,
  StyleSheet,
  Component,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-icons';

var styles = StyleSheet.create({
  back: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flex: 1, 
    alignSelf: 'center'
  },
  topbar: {
    color: 'white', 
    backgroundColor: '#4CC6EA',
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    // flex: 1
  },
  topBarText: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    flex: 10,
    alignSelf: 'center'
  },
  ionic: { 
    width: 25, 
    height: 25, 
    marginLeft: 5, 
    marginTop: 0,
  },
});

class Topbar extends Component{
  back() {
    var { stopClickedUser } = this.props;
    console.log('stopClickedUser from topbar');
    if (stopClickedUser) { stopClickedUser(); }
    this.props.navigator.pop();
  }

  _renderIcon() {
    if (this.props.noIcon) {
      return <View />
    } else {
      return (
        <Icon
          name='ion|chevron-left'
          size={25}
          color='white'
          style={styles.ionic}
        />
      )
    }
  }

  render() {
    let { topbarTitle } = this.props;
    return (
      <View
        style={styles.topbar}
      >
        <TouchableHighlight
          onPress={this.back.bind(this)}
          underlayColor='#4CC6EA'
          color='white'
          style={styles.back}
        > 
          { this._renderIcon() }
        </TouchableHighlight>
        <View
          style={styles.topBarText}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'Lato-regular',
              color: 'white',
              fontSize: 18,
              paddingBottom: 3,
              paddingTop: 3,
            }}
          >{ topbarTitle }      </Text>
        </View>
      </View>
    );
  }
};

export default Topbar;

