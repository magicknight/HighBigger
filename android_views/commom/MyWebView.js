/**
 * 对原生WebView组件的封装，添加了头部，
 * */
import React, {Component} from 'react';
import {
    WebView,
    View,
    ActivityIndicator
} from 'react-native';
import Util from './Util';
import Header from './Header';

/**
 * 该组件需要传入的参数:
 *    navigator :
 *    backName :
 *    title :
 *    url:
 * */
export default class MyWebView extends React.Component {
    mContext;
    constructor(props){
        super(props);
        mContext = this;
        console.log('构造WebView组件，其navigator对象为：' + this.props.navigator);
    }

    render() {
        return (
            <View>
                <Header
                    navigator={this.props.navigator}
                    initObj = {{
                        backName : this.props.backName,
                        title : this.props.title
                    }}/>
                <WebView
                    contentInset={{top: - 40}}
                    startInLoadingState={true}
                    domStorageEnabled = {true}
                    javaScriptEnabled={true}
                    style={{width:Util.size.width,height:Util.size.height - 50}}
                    renderLoading={() => {
                        return <ActivityIndicator color="#0091ff" styleAttr='Inverse'/>;
                    }}
                    url={this.props.url}/>
            </View>
        );
    }
}