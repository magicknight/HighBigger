/**
 * 音乐列表
 * */
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
 * context : 保存当前组件的this对象
 * state :
 *      dataSource :
 *      keyword :
 *      show :
 *      start : 当前已经加载了多少页数据，初始为-1，表示未加载
 *      onLoadMoreFinished : 表示加载更多的操作是否完成
 * */

export default class MusicList extends Component {
    context;

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        context = this;
        this.state = {
            dataSource: ds.cloneWithRows([]),
            keyword: '周杰伦',
            show: false,
            start: -1,
            onLoadMoreFinished : true,
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
                                this.setState({keyword: val});
                            }}/>
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            console.log('搜索按钮被点击');
                            this._getData();
                        }}>
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
                            renderFooter={this._renderFooter}/>
                        :
                        Util.loading
                }
            </View>
        );
    }

    componentDidMount() {
        console.log("组件装载完毕，开始从网络上获取数据。");
        this._getData();
    }

    _renderRow(row) {
        console.log('开始渲染行数据');
        return (
            <View style={styles.li_item}>
                <Image style={styles.li_img} source={{uri: row.image}}/>

                <View style={styles.li_info}>
                    <Text numberOfLines={1} style={styles.li_info_line}>专辑名称：{row.title}</Text>
                    <Text numberOfLines={1} style={styles.li_info_line}>演唱歌手：{row.attrs.singer[0]}</Text>
                    <Text numberOfLines={1} style={styles.li_info_line}>发行时间：{row.attrs.pubdate[0]}</Text>
                    <Text numberOfLines={1} style={styles.li_info_line}>综合评分：{row.rating.average} ({row.rating.numRaters}人评)</Text>
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
    _renderFooter(){
        if(this.state.onLoadMoreFinished){
            return ( <View style={{height : 0}}/> );
        }else {
            return ( Util.loading );
        }
    }

    _getData() {
        console.log('开始从网络获取数据');
        console.log('搜索关键字为：' + this.state.keyword);

        console.log('先设置show值为false，完成界面更新');
        this.setState({
            show: false,
            start : 0,
        });

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var baseURL = ServiceURL.music_seach + '?start='+ this.state.start +'&count=10&q=' + this.state.keyword;
        console.log('网络请求的url地址为：' + baseURL);
        var that = this;
        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonResult = eval('(' + responseText + ')');
                var musics = jsonResult.musics;
                if (musics === null || musics.length === 0) {
                    return;
                }
                console.log('数据请求成功，更新state值使界面刷新');
                that.setState({
                    dataSource: ds.cloneWithRows(musics),
                    show: true,
                    start : 1,
                });
            });
    }

    loadMore(){
        var baseURL = ServiceURL.music_seach + '?start='+ this.state.start +'&count=10&q=' + this.state.keyword;
        var that = this;
        fetch(baseURL)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonResult = eval('(' + responseText + ')');
                var musics = jsonResult.musics;
                if (musics === null || musics.length === 0) {
                    return;
                }
                that.state.dataSource.append(musics);
                that.setState({
                    onLoadMoreFinished : true,
                    start : that.start + 1,
                });
                console.log('数据请求成功，更新state值使界面刷新');
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
        marginTop: 5,
        marginBottom: 5,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: '#ddd',
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

