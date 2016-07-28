/**
 * Created by limingzhong on 2016/7/28.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import Util from './Util';

var mContext;

export default class SearchHeader extends React.Component {

    constructor(props) {
        super(props);
        mContext = this;
        mContext.state = {
            keyword: null,
        }
    }

    render() {
        return (
            <View style={styles.sl_searcher}>
                <Image
                    style={styles.sl_input}
                    source={require('./img/bg_search.png')}>
                    <Image
                        source={require('./img/ic_search.png')}
                        style={styles.sl_inputImg}/>
                    <TextInput
                        onChangeText={mContext._onChangeText}
                        placeholder={mContext.props.placeholder}
                        style={styles.sl_inputText}/>
                </Image>

                <TouchableOpacity style={styles.sl_searchBtn} onPress={mContext.props.onPress}>
                    <Text>搜索</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onChangeText(val) {
        mContext.setState({
            keyword: val,
        });
    }
}

var styles = StyleSheet.create({
    sl_searcher: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },

    sl_input: {
        marginRight: 5,
        flex: 1,
        flexDirection : 'row',
    },

    sl_inputImg: {
        width : 25,
        height : 25,
        marginRight : 8,
    },

    sl_inputText : {
        flex : 1,
        fontSize : 14,
        padding : 8,
    },

    sl_searchBtn: {
        marginLeft: 5,
        backgroundColor: Util.mainColor,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});




