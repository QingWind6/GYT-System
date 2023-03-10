Page({
  data: {
    queryResult: null,
    showView: 'false',
  },


  bindblur: function(e) {
    let that = this;
    wx.request({
      url: 'http://8.130.20.3:8081/ecs/getServerInfo',
      method: 'GET',
      data: {
        instanceId: e.detail.value
      },
      success(res) {
        if(res.statusCode == 200){
          that.setData({
            queryResult: res.data,
            showView: !that.data.showView,
          });
        }else{
          that.setData({
            showView: 'false',
          });
          wx.showToast({
            title: '请输入正确的实例ID',
            duration: 1500,
            icon: 'none',
            mask: true
          })
        }
      }

    })
  }
})