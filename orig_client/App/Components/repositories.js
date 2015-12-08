import React from 'react-native';
import Badge from './badge';
import Separator from './Helpers/separator';
import WebView from './Helpers/webView';

var {
	ScrollView,
	Text,
	View,
	TouchableHighlight,
	StyleSheet
} = React


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

class Repositories extends React.Component{

	openPage(url) {
		this.props.navigator.push({
			title: 'web view',
			component: WebView,
			passProps: {url}
		});
	}

	render() {
		var repos = this.props.repos;
		var list = repos.map((item, index) => {
			console.log(item);
			var description = item.description ? <Text style = {styles.description}> {item.description} </Text> : <View />;
			return (
				<View key = {index}>
					<View style = {styles.container}>
						<TouchableHighlight
							onPress = {this.openPage.bind(this, item.html_url)}
							underlayColor = 'transparent'
						>
							<Text style = {styles.name}> {item.name} </Text>
						</TouchableHighlight>
						<Text style = {styles.stars}> Stars: {item.stargazers_count} </Text>
						{description}
					</View>
					<Separator />
				</View>
			);
		});
		return (
			<ScrollView
			  style = {styles.scrollView}
			>
				<Badge userInfo = {this.props.userInfo} />
				{list}
			</ScrollView>
		)
	}

}

Repositories.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	repos: React.PropTypes.array.isRequired
}

export default Repositories;

