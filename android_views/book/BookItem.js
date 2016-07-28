import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import Util from './../commom/Util';




export default class BookItem extends Component {

    render(){
        var row = this.props.row;

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

                {/*...this.props表明将该TouchableOpacity的其他所有属性都交由父类赋值，onPress方法将有onPress属性转入，*/}
                <TouchableOpacity
                    style={styles.li_infoDetail}
                    {...this.props}>
                    <View style={styles.li_infoDetailImg}/>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    //ListView每一列数据的布局
    li_item: {
        marginTop: 5,
        marginBottom: 5,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: '#ddd',
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
});