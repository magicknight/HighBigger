/**
 * 图书列表项，供图书列表组件和图书详情页组件调用
 * */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Util from '../commom/Util';

/**
 * row : 由父类传入的图书的相关信息
 * */
export default class BookItem extends Component {
    render() {
        var row = this.props.row;
        return (
            <TouchableOpacity
                style={[styles.row,styles.item]}
                {...this.props}>  {/*其它属性也由props传入，如 : onPress*/}
                <View style={[styles.center]}>
                    <Image source={{uri : row.image}} style={styles.book_img}/>
                </View>

                <View style={styles.content}>
                    <View>
                        <Text style={{width:200}} numberOfLines={1}>
                            {row.title}
                        </Text>
                    </View>

                    <View style={{marginTop:10}}>
                        <Text style={[styles.publisher, {width:200}]} numberOfLines={1}>
                            {row.publisher}
                        </Text>
                    </View>

                    <View style={{marginTop:10}}>
                        <Text style={[styles.publisher, {width:200}]} numberOfLines={1}>
                            {row.author}
                        </Text>
                    </View>

                    <View style={[styles.row, {marginTop:10}]}>
                        <Text style={styles.price}>{row.price}</Text>
                        <Text style={styles.pages}>{row.pages}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

var  styles = StyleSheet.create({
    row : {
        flexDirection : 'row',
    },
    item : {
        height : 120,
        borderTopWidth : Util.pixel,
        borderBottomWidth : Util.pixel,
        marginTop : 5,
        marginBottom : 5,
        borderColor : '#ccc',
    },
    book_img : {
        width : 80,
        height : 100,
        resizeMode : Image.resizeMode.contain

    },
    center : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    content : {
        marginTop : 10,
        marginLeft : 10,
    },
    publisher : {
        color : '#a3a3a3',
        fontSize : 13,
    },
    price : {
        color : '#2bb2a3',
        fontSize : 16,
    },
    pages : {
        marginLeft : 10,
        color : '#a7a0a0'
    },
});




















