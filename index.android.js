import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Navigator,
    View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Navigation from './android_views/commom/Navigation';

import BookList from './android_views/book/BookList';
import MovieList from './android_views/movie/MovieList';
import MusicList from './android_views/music/MusicList'

class HighBigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '音乐',
        };
    }

    render() {
        return (
            <TabNavigator>

                <TabNavigator.Item
                    selected={this.state.selectedTab === '图书'}
                    title='图书'
                    onPress={() => {
                        this.setState({selectedTab: '图书'});
                    }}>
                    <Navigation component={BookList}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === '电影'}
                    title='电影'
                    onPress={() => {
                        this.setState({selectedTab: '电影'});
                    }}>
                    <Navigation component={MovieList}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === '音乐'}
                    title='音乐'
                    onPress={() => {
                        this.setState({selectedTab: '音乐'});
                    }}>
                    <Navigation component={MusicList}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

AppRegistry.registerComponent('HighBigger', () => HighBigger);




