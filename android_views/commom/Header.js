/*
 * 公共导航头，供列表组件调用
 * */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackAndroid,
} from 'react-native';
import LeftIcon from './LeftIcon';

/**
 * 该组件属性值：
 *    initObj :
 *        该对象中有两个值：
 *          backName : 上一界面的名称
 *          title : 标题
 *    navigator : 导航信息
 * */
export default class Header extends React.Component {
    context;

    constructor(props) {
        super(props);
        context = this;
    }

    render() {
        var obj = this.props.initObj;
        return (
            <View style={[styles.header, styles.row, styles.center]}>
                <TouchableOpacity style={[styles.row, styles.center]} onPress={context._pop}>
                    <LeftIcon/>
                    <Text style={styles.fontFFF}>
                        {obj.backName}
                    </Text>
                </TouchableOpacity>
                <View style={[styles.title, styles.center]}>
                    <Text style={[styles.fontFFF, styles.titlePos]}
                          numberOfLines={1}>
                        {obj.title}
                    </Text>
                </View>
            </View>
        );
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', function () {
            context._pop();
            return true;
        });
    }

    _pop() {
        console.log('退回按钮被点击');
        context.props.navigator.pop(); // 弹出页面
    }
}

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    header: {
        height: 50,
        backgroundColor: '#3497ff'
    },
    fontFFF: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf : 'center',
    },
    title: {
        flex: 1,
    },
    titlePos: {
        marginLeft: -20,
        width: 200
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

