/**
 * 图书详情页组件，会调用book_item.js模块
 * */
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from 'react-native';

import Util from './../commom/Util';
import ServiceURL from './../commom/Service';
import BookItem from './BookItem';
import Header from './../commom/Header';


/**
 * 图书详情页：
 */
export default class BookDetail extends Component {
    context;
    row;

    constructor(props) {
        super(props);
        console.log('开始构造图书详情页界面');
        context = this;
        row = this.props.row;
        this.state = {
            data: null,
        };
    }

    render() {
        return (

            <View style={styles.m10}>
                <View>
                    <Header
                        navigator={this.props.navigator}
                        initObj={{
                            backName: '图书',
                            title: this.row.title
                        }}/>
                    <View>
                        <Text style={styles.title}>图书简介</Text>
                        <Text style={styles.text}>{this.state.data.author_intro}</Text>
                    </View>
                </View>
                {
                    this.state.data ?
                        <View style={{height: 50}}/>
                        :
                        Util.loading
                }
            </View>
        );
    }

    componentDidMount() {
        var id = this.props.id;
        var that = this;
        var url = ServiceURL.book_seach_id + '/' + id;
        Util.get(
            url,
            function (data) {
                that.setState({
                    data: data
                });
            },
            function (err) {
                alert(err);
            }
        );
    }
}

var styles = StyleSheet.create({
    m10: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        color: '#000d22',
    },
});
