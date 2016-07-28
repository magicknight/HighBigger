/**
 * 音乐列表
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
 * musicsData : 保存已加载的所有音乐数据
 * ds : 用于将音乐数据复制到数据源中的对象
 * context : 保存当前组件的this对象
 * state :
 *      dataSource : ListView的数据源
 *      keyword : 搜索关键字
 *      show : 是否显示ListView
 *      start : 即将加载第几页数据，初始为0
 *      onLoadMoreFinished : 表示加载更多的操作是否完成
 * */
var context;
var musicsData;
var ds;

export default class MusicList extends Component {

    constructor(props) {
        super(props);
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        context = this;
        musicsData = [];
        this.state = {
            dataSource: ds.cloneWithRows(musicsData),
            keyword: '周杰伦',
            show: false,
            start: 0,
            onLoadMoreFinished: true,
            isGettingData: false,
        };
    }

    render() {
        console.log("开始渲染组件");
        return (
            <View style={styles.flex_1}>
                <View style={[styles.search, styles.row]}>
                    <View style={styles.flex_1}>
                        <Search
                            placeholder="请输入歌曲/歌手名称"
                            onChangeText={(val) => {
                                console.log('搜索框文本变化为：' + val);
                                context.setState({keyword: val});
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
                    this.state.show?
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

    componentDidMount() {
        console.log("组件装载完毕，开始从网络上获取数据。");
        context._getData();
    }

    _renderRow(row) {
        console.log('开始渲染行数据');
        var title = row.title;
        var singer = row.attrs.singer[0];
        var pubdate = null;
        if (typeof (row.attrs.pubdate) != 'undefined') {
            pubdate = row.attrs.pubdate[0];
        }
        var rate = row.rating.average;
        return (
            <View style={styles.li_item}>
                <Image style={styles.li_img} source={{uri: row.image}}/>

                <View style={styles.li_info}>
                    {
                        typeof (title) === 'undefined' ?
                            <View style={{height: 1}}/>
                            :
                            <Text numberOfLines={1} style={styles.li_info_line}>专辑名称：{title}</Text>
                    }
                    {
                        typeof (singer) === 'undefined' ?
                            <View style={{height: 1}}/>
                            :
                            <Text numberOfLines={1} style={styles.li_info_line}>演唱歌手：{singer}</Text>
                    }
                    {
                        ((null == pubdate) || typeof (pubdate) === 'undefined') ?
                            <View style={{height: 1}}/>
                            :
                            <Text numberOfLines={1} style={styles.li_info_line}>发行时间：{pubdate}</Text>
                    }
                    {
                        typeof (rate) === 'undefined' ?
                            <View style={{height: 1}}/>
                            :
                            <Text
                                numberOfLines={1}
                                style={styles.li_info_line}>
                                综合评分：{rate}({row.rating.numRaters}人评)
                            </Text>
                    }
                </View>

                <TouchableOpacity
                    style={styles.li_infoDetail}
                    onPress={() => {
                        context.props.navigator.push({
                            component: MyWebView,
                            passProps: {
                                title: row.title,
                                url: row.mobile_link,
                                backName: '音乐'
                            }
                        });
                    }}>
                    <View style={styles.li_infoDetailImg}/>
                </TouchableOpacity>
            </View>
        );
    }

    //根据加载更多的操作是否完成来确定是否显示底部布局
    _renderFooter() {
        if (typeof (context.state.onLoadMoreFinished) == 'undefined'
            || context.state.onLoadMoreFinished == null
            || context.state.onLoadMoreFinished) {
            return ( <View style={{height: 1}}/> );
        } else {
            return Util.loading;
        }
    }

    _getData() {
        console.log('开始从网络获取数据');
        if (context.state.isGetingData) {
            console.log('正在获取数据，不再再次请求');
            return;
        }

        console.log('设置state的值以更新界面');
        musicsData.splice(0, musicsData.length);
        context.setState({
            show: false,
            start: 0,
            onLoadMoreFinished: true,
            dataSource: ds.cloneWithRows(musicsData),
            isGettingData: true,
        });

        var baseURL = ServiceURL.music_seach + '?start=' + context.state.start + '&count=10&q=' + context.state.keyword;
        console.log('网络请求的url地址为：' + baseURL);

        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonResult = eval('(' + responseText + ')');
                var musics = jsonResult.musics;
                if (musics === null || musics.length === 0) {
                    return;
                }
                console.log('数据请求成功，更新state值使界面刷新');
                musicsData = musics;
                console.log('目前musicsData中的数据为：' + musicsData.length);
                context.setState({
                    dataSource: ds.cloneWithRows(musicsData),
                    show: true,
                    start: 1,
                    isGettingData: false,
                });
            });
    }

    loadMore() {
        console.log('*****************************');
        console.log('滑动到了底部,开始请求更多数据');

        if (!context.state.onLoadMoreFinished) {
            console.log('加载动作正在进行，不再再次加载');
            return;
        }

        context.setState({onLoadMoreFinished: false});
        var baseURL = ServiceURL.music_seach + '?start=' + context.state.start + '&count=10&q=' + context.state.keyword;
        console.log('请求的URL地址为：' + baseURL);
        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                console.log('加载更多数据的请求成功');
                var jsonResult = eval('(' + responseText + ')');
                var musics = jsonResult.musics;
                if (musics === null || musics.length === 0) {
                    return;
                }
                musicsData.push.apply(musicsData, musics);
                console.log('更新musicsData,目前musicsData中的数据为：' + musicsData.length);
                var currStart = context.state.start;
                context.setState({
                    start: currStart + 1,
                    onLoadMoreFinished: true,
                    dataSource: ds.cloneWithRows(musicsData),
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
        height: 110,
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

