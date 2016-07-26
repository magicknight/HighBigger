/**
 * 搜索框组件
 * */
import React from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';

import Util from './Util';

export default class Search extends React.Component {
    render() {
        return (
            <View style={styles.flex_1}>
                <TextInput style={[styles.flex_1, styles.input]} {...this.props}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    flex_1: {
        flex: 1
    },
    input: {
        borderWidth: Util.pixel,
        height: 40,
        borderColor: '#dddddd',
        paddingLeft: 10
    }
});