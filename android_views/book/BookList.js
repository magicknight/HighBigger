/**
 * 图书列表
 * */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import Search from './../commom/Search';
import Util from './../commom/Util';
import ServiceURL from './../commom/Service';
import MyWebView from './../commom/MyWebView';
/**
 *
 * bookData : 保存已加载的所有音乐数据
 * ds : 用于将音乐数据复制到数据源中的对象
 * mContext : 保存当前组件的this对象
 * state :
 *      dataSource : ListView的数据源
 *      keyword : 搜索关键字
 *      show : 是否显示ListView
 *      start : 即将加载第几页数据，初始为0
 *      onLoadMoreFinished : 表示加载更多的操作是否完成
 * */
var mContext;
var bookData;
var ds;

export default class BookList extends Component {
    constructor(props) {
        super(props);
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        mContext = this;
        console.log('');
        bookData = [];
        mContext.state = {
            dataSource: ds.cloneWithRows(bookData),
            keyword: 'react-native',
            show: false,
            start: 0,
            onLoadMoreFinished: true,
            isGettingData: false,
        };
    }

    componentWillMount() {
        console.log('开始装载组件');
        mContext.setState({onLoadMoreFinished: true});
    }

    render() {
        console.log("开始渲染组件");
        return (
            <View style={styles.flex_1}>
                <View style={[styles.search, styles.row]}>
                    <View style={styles.flex_1}>
                        <Search
                            placeholder="请输入图书/作者名称"
                            onChangeText={(val) => {
                                console.log('搜索框文本变化为：' + val);
                                mContext.setState({keyword: val});
                            }}/>
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this._getData}>
                        <Text style={styles.fontFFF}>搜索</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height: 2, backgroundColor: '#0091ff', marginTop: 4}}/>
                {
                    this.state.show ?
                        <ListView
                            style={styles.listView}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            onEndReached={this.loadMore}
                            renderFooter={this._renderFooter}
                            onEndReachedThreshold={40}/>
                        :
                        Util.loading
                }
            </View>
        );
    }

    //根据加载更多的操作是否完成来确定是否显示底部布局
    _renderFooter() {
        if (typeof (mContext.state.onLoadMoreFinished) == 'undefined'
            || mContext.state.onLoadMoreFinished == null
            || mContext.state.onLoadMoreFinished) {
            return ( <View style={{height: 1}}/> );
        } else {
            return Util.loading;
        }
    }

    componentDidMount() {
        mContext._getData();
    }

    _renderRow(row) {
        var imageURL = row.image;
        var title = row.title;
        var author = row.author[0];
        var publisher = row.publisher;
        var pubDate = row.pubdate;
        var rate = row.rating.average;
        var rateNum = row.rating.numRaters;

        return (
            <View style={styles.li_item}>
                <Image style={styles.li_img} source={{uri: imageURL}}/>
                <View style={styles.li_info}>
                    <Text numberOfLines={1} style={styles.li_info_line}>书名：{title}</Text>
                    <Text numberOfLines={1} style={styles.li_info_line}>作者：{author}</Text>
                    <Text numberOfLines={1} style={styles.li_info_line}>出版社：{publisher}</Text>
                    <Text numberOfLines={1} style={styles.li_info_line}>出版时间：{pubDate}</Text>
                    <Text
                        numberOfLines={1}
                        style={styles.li_info_line}>
                        综合评分：{rate}({rateNum}人评)
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.li_infoDetail}
                    onPress={() => {
                        mContext.loadDetail(row);
                    }}>
                    <View style={styles.li_infoDetailImg}/>
                </TouchableOpacity>
            </View>
        );
    }

    _getData() {
        console.log('开始从网络获取数据');
        if (mContext.state.isGettingData) {
            return;
        }

        console.log('设置state的值以更新界面');
        bookData.splice(0, bookData.length);
        mContext.setState({
            show: false,
            start: 0,
            onLoadMoreFinished: true,
            dataSource: ds.cloneWithRows(bookData),
            isGettingData: true,
        });

        var baseURL = ServiceURL.book_seach + '?start=' + mContext.state.start + '&count=10&q=' + mContext.state.keyword;
        console.log('网络请求的url地址为：' + baseURL);

        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonResult = eval('(' + responseText + ')');
                var books = jsonResult.books;
                if (books === null || books.length === 0) {
                    return;
                }
                console.log('数据请求成功，更新state值使界面刷新');
                bookData = books;
                console.log('目前bookData中的数据为：' + bookData.length);
                mContext.setState({
                    dataSource: ds.cloneWithRows(bookData),
                    show: true,
                    start: 1,
                    isGettingData: false,
                });
            });
    }

    /**
     * 跳转到图书详情页的方法
     */
    loadDetail(row) {
        console.log('图书详情页被点击');
        mContext.props.navigator.push({
            component: MyWebView,
            passProps: {
                title: row.title,
                url: row.alt,
                backName: '图书'
            },
        });
    }

    loadMore() {
        console.log('*****************************');
        console.log('滑动到了底部,开始请求更多数据');

        if (!mContext.state.onLoadMoreFinished) {
            console.log('加载动作正在进行，不再再次加载');
            return;
        }

        mContext.setState({onLoadMoreFinished: false});
        var baseURL = ServiceURL.book_seach + '?start=' + mContext.state.start + '&count=10&q=' + mContext.state.keyword;
        console.log('请求的URL地址为：' + baseURL);
        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                console.log('加载更多数据的请求成功');
                var jsonResult = eval('(' + responseText + ')');
                var books = jsonResult.books;
                if (books === null || books.length === 0) {
                    return;
                }
                bookData.push.apply(bookData, books);
                console.log('更新bookData,目前bookData中的数据为：' + bookData.length);
                var currStart = mContext.state.start;
                mContext.setState({
                    start: currStart + 1,
                    onLoadMoreFinished: true,
                    dataSource: ds.cloneWithRows(bookData),
                });
            });
    }
};

var styles = StyleSheet.create({
    flex_1: {
        flex: 1,
        marginTop: 5,
    },

    search: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listView: {
        flex: 1
    },
    btn: {
        width: 50,
        height: 30,
        backgroundColor: '#0091ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    fontFFF: {
        color: '#fff'
    },
    row: {
        flexDirection: 'row',
    },

    center: {
        justifyContent: 'center', // 项目在其所处队列中沿主轴的位置
        alignItems: 'center', // 项目在其所处队列中沿侧轴的位置
        // alignContent : 队列在容器中沿侧轴的位置
    },

    //ListView每一列数据的布局
    li_item: {
        marginBottom: 8,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: Util.mainColor,
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
    },

    //左边图片的样式
    li_img: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 10,
    },

    //中间相关信息
    li_info: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 18,
    },

    li_info_line: {
        textAlign: 'left',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 2,
    },

    //右边链接跳转的样式
    li_infoDetail: {
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    li_infoDetailImg: {
        width: 25,
        height: 25,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: '#0091ff',
        transform: [{rotate: '45deg'}],
    },

    textWidth: {
        width: 120,
    },

    gouDou: {
        height: 35,
        width: 60,
        borderWidth: Util.pixel,
        borderColor: '#3082ff',
        borderRadius: 3,
    },
});

