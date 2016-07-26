/**
 * 图书详情页组件，会调用book_item.js模块
 * */
import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native';

var Util = require('./../commom/Util');
var ServiceURL = require('./../commom/Service');
var BookItem = require('./book_items');
var Header = require('./../commom/Header');



module.exports = React.createClass({
    getInitialState : function () {
        return { data : null};
    },
    componentDidMount: function () {
        var id = this.props.id;
        var that = this;
        var url = ServiceURL.book_seach_id + '/' + id;
        Util.get(
            url,
            function (data) {
                that.setState({
                    data : data
                });
            },
            function (err) {
                alert(err);
            }
        );
    },
    
    render : function () {
        return (
            <ScrollView style={styles.m10}>
                {
                    this.state.data ?
                        <View>
                            <Header
                                navigator = {this.props.navigator}
                                initObj = {{
                                    backName : '图书',
                                    title : this.state.data.title
                                }}/>
                            <BookItem row = {this.state.data}/>
                            <View>
                                <Text style={styles.title}>图书简介</Text>
                                <Text style={styles.text}>{this.state.data.author_intro}</Text>
                            </View>
                            <View style={{height : 50}}/>
                        </View>
                        :
                        Util.loading
                }
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    m10 : {
        flex : 1,
    },
    title : {
        fontSize : 16,
        marginLeft : 10,
        marginTop : 10,
        marginBottom : 10,
    },
    text : {
        marginLeft : 10,
        marginRight : 10,
        color : '#000d22',
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
