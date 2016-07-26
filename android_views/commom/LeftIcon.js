/**
 * 公共导航栏头中的回退按钮
 * */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Util from './Util';

export default class LeftIcon extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.go}></View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    go : {
        borderLeftWidth : 4 * Util.pixel,
        borderBottomWidth : 4 * Util.pixel,
        width : 15,
        height : 15,
        transform : [{rotate : '45deg'}],
        borderColor : '#fff',
        marginLeft : 15
    }
});