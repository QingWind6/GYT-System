// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
    count:0,
    status : '',
    receivedData: '', // 用于存储接收到的数据
    current: 'homepage',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
        });
      },
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onTapButton1:function(){
    this.setData({
      status : "运行中",
      count : this.data.count + 1
    })
  },
  onTapButton2:function(){
    this.setData({
      status : "空闲中"
    })
  },
  onTapButton3:function(){
    this.setData({
      status : '已预定'
    })
  },
  sendSocket: function() {
    wx.connectSocket({
      url: 'wss://8.130.20.3:8081' // WebSocket 服务器地址
    })
    wx.onSocketMessage((res) => {
      this.setData({
        receivedData: this.data.receivedData + res.data // 将接收到的数据添加到文本框中
      })
    })

  },
  onUnload: function() {
    wx.closeSocket()
  },


  handleChange({detail}){
    var pageName = detail.key
    // var pageName_url = detail.item.url
    var url = "/pages/" + pageName + "/" + pageName
    console.log(url)
    wx.navigateTo({
      url: url
    })
  },
  // 获取当前设备的信息


})



