'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    View,
    Image
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
                    renderIcon = {() => <Image source={require('./img/ic_book_nor.png')} style={styles.sl_tabImg}/>}
                    renderSelectedIcon = {() => <Image source={require('./img/ic_book_pre.png')} style={styles.sl_tabImg}/>}
                    onPress={() => {
                        this.setState({selectedTab: '图书'});
                    }}>
                    <Navigation component={BookList}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === '电影'}
                    title='电影'
                    renderIcon = {() => <Image source={require('./img/ic_movie_nor.png')} style={styles.sl_tabImg}/>}
                    renderSelectedIcon = {() => <Image source={require('./img/ic_movie_pre.png')} style={styles.sl_tabImg}/>}
                    onPress={() => {
                        this.setState({selectedTab: '电影'});
                    }}>
                    <Navigation component={MovieList}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === '音乐'}
                    title='音乐'
                    renderIcon = {() => <Image source={require('./img/ic_music_nor.png')} style={styles.sl_tabImg}/>}
                    renderSelectedIcon = {() => <Image source={require('./img/ic_music_pre.png')} style={styles.sl_tabImg}/>}
                    onPress={() => {
                        this.setState({selectedTab: '音乐'});
                    }}>
                    <Navigation component={MusicList}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

var styles = StyleSheet.create({
    sl_tabImg : {
        width : 30,
        height : 23,
    }
});

AppRegistry.registerComponent('HighBigger', () => HighBigger);





