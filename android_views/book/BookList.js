/**
 * 图书列表组件，它调用了search.js和header.js模块
 * */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TouchableOpacity,
} from  'react-native';

import Search from './../commom/Search';
import Util from './../commom/Util';
import ServiceURL from './../commom/Service';
import BookItem from './BookItem';
import BookDetail from './BookDetail';

export  default  class BookList extends Component {
    context;
    ds;
    bookData;

    constructor(props) {
        super(props);

        context = this;
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        bookData = [];
        this.state = {
            dataSource: ds.cloneWithRows(bookData),
            keyword: 'react-native',
            show: false,
            start: 0,
            onLoadMoreFinished: true,
        };
    }

    render() {
        return (
            <ScrollView style={styles.flex_1}>
                <View style={[styles.search, styles.row]}>
                    <View style={styles.flex_1}>
                        <Search placeholder="请输入图书的名称" onChangeText={context._changeText}/>
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this._search}>
                        <Text style={styles.fontFFF}>搜索</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            renderFooter={this._renderFooter}
                            onEndReachedThreshold={40}
                            onEndReached={this.loadMore}/>

                        : Util.loading
                }
            </ScrollView>
        );
    }

    // 组件加载完成后调用
    componentDidMount() {
        this.getData();
    }

    // 根据关键字查询图书信息，其中关键字的信息放在state变量中
    getData() {
        context.setState({
            show: false,
            start: 0,
        });

        var baseURL = ServiceURL.book_seach + '?start=' + context.state.start + '&count=10&q=' + context.state.keyword;
        Util.get(
            baseURL,
            function (data) {
                if (!data.books || !data.books.length) {
                    return alert('图书服务出错');
                }
                bookData = data.books;
                context.setState({
                    dataSource: ds.cloneWithRows(bookData),
                    show: true,
                    start : 1,
                });
            },
            function (err) {
                alert(err);
            }
        );
    }

    // 渲染LsitView 每一行的方法
    _renderRow(row) {
        return (
            <BookItem row={row} onPress={context._loadPage(row.id)}/>
        );
    }

    _renderFooter() {
        if (typeof (context.state.onLoadMoreFinished) == 'undefined'
            || context.state.onLoadMoreFinished == null
            || context.state.onLoadMoreFinished) {
            context.setState({onLoadMoreFinished: true});
            return ( <View style={{height: 1}}/> );
        } else {
            return Util.loading;
        }
    }

    loadMore() {
        if( !context.state.onLoadMoreFinished){
            console.log('加载动作正在进行，不再再次加载');
            return;
        }
        context.setState({onLoadMoreFinished: false});
        var baseURL = ServiceURL.book_seach + '?start=' + context.state.start + '&count=10&q=' + context.state.keyword;
        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonResult = eval('(' + responseText + ')');
                var books = jsonResult.books;
                if (books === null || books.length === 0) {
                    return;
                }
                bookData.push.apply(bookData, books);
                var currStart = context.state.start;
                context.setState({
                    start: currStart + 1,
                    onLoadMoreFinished: true,
                    dataSource: ds.cloneWithRows(bookData),
                });
            });
    }

    // 搜索框文本发生改变时的回调方法，
    _changeText(val) {
        context.setState({
            keywords: val
        });
    }

    // 搜索关键字的方法
    _search() {
        context.getData();
    }

    // 加载图书详情页的方法
    _loadPage(id) {
        context.props.navigator.push({
            component: BookDetail,
            passProps: {
                id: id
            }
        });
    }
}

var styles = StyleSheet.create({
    flex_1: {
        flex: 1,
        marginTop: 5,
    },
    search: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 45,
    },
    btn: {
        width: 50,
        backgroundColor: '#0091ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontFFF: {
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
    }
});



