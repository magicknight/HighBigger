/*
 * 工具类
 * */
import React from 'react';

import Dimensions from 'Dimensions';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

export default {
    // 最小线宽
    // pixel : 1 / PixelRatio.get(),
    pixel: 1,
    // 屏幕尺寸
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    /**
     * 基于fetch的get方法，用于获取网络信息
     * @param url
     * @param successCallback
     */
    get: function (url, successCallback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText))
            })

    },

    loading: (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="#0091ff" styleAttr='Inverse'/>
            <Text style={{
                fontSize : 16,
                color : '#0091ff',
                marginTop : 15,
            }}>
                正在加载中，请稍后...
            </Text>
        </View>
    )
}




























