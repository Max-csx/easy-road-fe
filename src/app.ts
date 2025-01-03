import React, { useEffect } from 'react'
import Taro, { useDidShow, useDidHide,useLaunch } from '@tarojs/taro'
// 全局样式
import './app.scss'
import './assets/iconfont/iconfont.css'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  useLaunch(()=>{

  })



  return props.children
}

export default App
