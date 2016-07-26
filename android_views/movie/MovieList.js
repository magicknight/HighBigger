/**
 * 电影列表
 * */
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ListView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Search from './../commom/Search';
import Util from './../commom/Util';
import ServiceURL from './../commom/Service';
import webView from '../commom/MyWebView';

export default class MovieList extends React.Component {

    constructor(props) {
        super(props);

        console.log('开始加载电影页面');
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            keywords: '周星驰',
            show: false
        };
    }

    render() {
        console.log('开始渲染组件');
        return (
            <View style={styles.flex_1}>
                <View style={[styles.search, styles.row]}>
                    <View style={styles.flex_1}>
                        <Search placeholder="请输入电影名称" onChangeText={this._changeText}/>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={this._getData}>
                        <Text style={styles.fontFFF}>搜索</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show ?
                        <ListView
                            style={{flex : 1}}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}/>
                        :
                        Util.loading
                }
            </View>
        );
    }

    _renderRow(row) {
        console.log('开始渲染每一行数据');

        var casts = row.casts;
        var names = [];
        for (var i = 0; i < casts.length; i++) {
            var temp = casts[i];
            if (temp.hasOwnProperty('name')) {
                names.push(casts[i].name);
            }
        }
        return (
            <View style={[styles.row, styles.item]}>
                <View>
                    <Image style={styles.img} source={{uri: row.images.medium}}/>
                </View>

                <View>
                    <Text style={styles.textWidth} numberOfLines={1}>
                        名称 ： {row.title}
                    </Text>

                    <Text style={styles.textWidth} numberOfLines={1}>
                        演员 ： {names}
                    </Text>

                    <Text style={styles.textWidth} numberOfLines={1}>
                        评分 ： {row.rating.average}
                    </Text>

                    <Text style={styles.textWidth} numberOfLines={1}>
                        时间 ： {row.year}
                    </Text>

                    <Text style={styles.textWidth} numberOfLines={1}>
                        标签 ： {row.genres}
                    </Text>

                    <TouchableOpacity
                        style={styles.goDou}>
                        <Text>详情</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // 当组件装载成功是调用
    componentDidMount() {
        this._getData();
    }

    // 搜索框文本发生改变时就保存关键字
    _changeText(val) {
        this.setState({
            keywords: val,
        });
    }

    // 从网上获取数据的方法
    _getData() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var that = this;
        var BaseURL = ServiceURL.movie_seach + '?count=10&q=' + this.state.keywords;
        this.setState({
            show: false
        });
        Util.get(
            BaseURL,
            function (data) {
                console.log('请求到的json数据为：' + JSON.stringify(data));
                if (!data.subjects || !data.subjects.length) {
                    return alert('电影服务出错');
                }
                var subjects = data.subjects;
                that.setState({
                    dataSource: ds.cloneWithRows(subjects),
                    show: true
                });
            },
            function (err) {
                alert(err);
            }
        );
    }

    // 在豆瓣网查看影片的详情
    _goDouBan(title, url) {
        this.props.navigator.push({
            component: webView,
            passProps: {
                backName: '电影',
                title: title,
                url: url
            }
        });
    }
}


var styles = StyleSheet.create({
    flex_1: {
        flex: 1,
        marginTop: 5
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
        alignItems: 'center',
    },
    fontFFF: {
        color: '#fff'
    },
    row: {
        flexDirection: 'row',
    },
    img: {
        width: 80,
        height: 110,
        resizeMode: Image.resizeMode.contain,
    },
    textWidth: {
        width: 200,
        marginLeft: 10,
    },
    item: {
        marginTop: 10,
        height: 140,
        paddingTop: 15,
        paddingLeft: 10,
        borderBottomWidth: Util.pixel,
        borderTopWidth: Util.pixel,
        borderColor: '#ddd',
    },
    goDou: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 60,
        borderWidth: Util.pixel,
        borderColor: '#3c9bfd',
        marginLeft: 30,
        marginTop: 10,
        borderRadius: 3
    },
});


