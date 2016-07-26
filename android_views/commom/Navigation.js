/**
 * 封装Navigator对象，暴露passProps属性
 *
 * 所有的切换过场动画都是从底部往上，退回是从上往下
 * */
import React, {Component} from 'react';
import {
    View,
    Navigator,
} from 'react-native';

/**
 * 自定义的导航对象可以传递进入一个component 属性，这样我们就可以实现页面的跳转
 *  component : navigator进行渲染的组件的名称

 路由对象中包含的属性为：
     name :
     component :
     index :
 * */
export default class Navigation extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{component: this.props.component, passProps : null}}
                configureScene={()=> {
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
                renderScene={ (route, navigator) => {
                    const Component = route.component;
                    return (
                        <View style={{flex: 1}}>
                            {/**navigator 属性将navigator对象装递给了子对象，这样它就能回来*/}
                            <Component navigator={navigator} route={route} {...route.passProps}/>
                        </View>
                    );
                }}/>
        );
    }
}





