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
    color: '#39247f', 
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
    width: 30, 
    height: 30, 
    marginLeft: 5, 
    marginTop: 5,
  },
});

class Topbar extends Component{
  back() {
    this.props.navigator.pop();
  }

  render() {
    let { topbarTitle } = this.props;
    return (
      <View
        style={styles.topbar}
      >
        <TouchableHighlight
          onPress={this.back.bind(this)}
          underlayColor='white'
          color='white'
          style={styles.back}
        > 
          <Icon
            name='ion|chevron-left'
            size={30}
            color='#39247f'
            style={styles.ionic}
          />
        </TouchableHighlight>
        <View
          style={styles.topBarText}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: '#39247f',
              fontSize: 15,
            }}
          >{ topbarTitle }      </Text>
        </View>
      </View>
    );
  }
};

export default Topbar;
