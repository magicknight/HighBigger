/**
 * 图书列表组件，它调用了search.js和header.js模块
 * */

//
// import React from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     ListView,
//     Image,
//     ScrollView,
//     TouchableOpacity,
// } from  'react-native';
//
// var Search = require('./../commom/search');
// var Util = require('./../commom/util');
// var ServiceURL = require('./../commom/service');
// var BookItem = require('./book_items');
// var BookDetail = require('./book_detail');
//
//
//
// module.exports = React.createClass({
//     // 初始化state变量
//     getInitialState : function () {
//         var ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2});
//         return {
//             dataSource : ds.cloneWithRows([]),
//             keywords : 'react-native',
//             show : false,
//         };
//     },
//
//     // 组件加载完成后调用
//     componentDidMount : function () {
//         this.getData();
//     },
//
//     render : function () {
//         return (
//             <ScrollView style={styles.flex_1}>
//                 <View style={[styles.search,styles.row]}>
//                     <View style={styles.flex_1}>
//                         <Search placeholder="请输入图书的名称" onChangeText={this._changeText}/>
//                     </View>
//                     <TouchableOpacity
//                         style={styles.btn}
//                         onPress={this._search}>
//                         <Text style={styles.fontFFF}>搜索</Text>
//                     </TouchableOpacity>
//                 </View>
//                 {
//                     this.state.show ?
//                         <ListView
//                             dataSource={this.state.dataSource}
//                             renderRow={this._renderRow}/>
//                         : Util.loading
//                 }
//             </ScrollView>
//         );
//     },
//
//     // 根据关键字查询图书信息，其中关键字的信息放在state变量中
//     getData : function () {
//         var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
//         var that = this;
//         var baseURL = ServiceURL.book_seach + '?count=10&q=' + this.state.keywords;
//         this.setState({
//             show:false
//         });
//
//         Util.get(
//             baseURL,
//             function (data) {
//                 if ( !data.books || !data.books.length ){
//                     return alert('图书服务出错');
//                 }
//                 var books = data.books;
//                 that.setState({
//                     dataSource : ds.cloneWithRows(books),
//                     show : true,
//                 });
//             },
//             function (err) {
//                 alert(err);
//             }
//         );
//     },
//
//     // 渲染LsitView 每一行的方法
//     _renderRow : function (row) {
//         return (
//             <BookItem row={row} onPress={this._loadPage.bind(this, row.id)}/>
//         );
//     },
//
//     // 搜索框文本发生改变时的回调方法，
//     _changeText : function (val) {
//         this.setState({
//             keywords: val
//         });
//     },
//
//     // 搜索关键字的方法
//     _search : function () {
//         this.getData();
//     },
//
//     // 加载图书详情页的方法
//     _loadPage : function (id) {
//         this.props.navigator.push({
//             component : BookDetail,
//             passProps : {
//                 id : id
//             }
//         });
//     }
// });
//
//
// var styles = StyleSheet.create({
//     flex_1 : {
//         flex:1,
//         marginTop:5,
//     },
//     search : {
//         paddingLeft : 5,
//         paddingRight : 5,
//         height : 45,
//     },
//     btn : {
//         width : 50,
//         backgroundColor : '#0091ff',
//         justifyContent : 'center',
//         alignItems : 'center'
//     },
//     fontFFF : {
//         color : '#fff',
//     },
//     row : {
//         flexDirection : 'row',
//     }
// });

import React,{Component} from 'react';
import {Text} from 'react-native';

export default class BookList extends React.Component {
    render(){
        return (
            <Text>这是图书列表</Text>
        );
    }
}

