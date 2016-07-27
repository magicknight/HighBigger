/**
 * 图书详情页组件，会调用book_item.js模块
 * */
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native';

import Util from './../commom/Util';
import ServiceURL from './../commom/Service';
import BookItem from './BookItem';
import Header from './../commom/Header';

export default class BookDetail extends Component {
    context;

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
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

    render() {
        return (
            <ScrollView style={styles.m10}>
                {
                    this.state.data ?
                        <View>
                            <Header
                                navigator={this.props.navigator}
                                initObj={{
                                    backName: '图书',
                                    title: this.state.data.title
                                }}/>
                            <BookItem row={this.state.data}/>
                            <View>
                                <Text style={styles.title}>图书简介</Text>
                                <Text style={styles.text}>{this.state.data.author_intro}</Text>
                            </View>
                            <View style={{height: 50}}/>
                        </View>
                        :
                        Util.loading
                }
            </ScrollView>
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
