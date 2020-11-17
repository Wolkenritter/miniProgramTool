//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      return
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'hpl-test',
        traceUser: true,
      })
    }

    this.globalData = {
      userId: "", // 用户id
      userInfo: null, // 用户信息
      logged: false, // 是否登录
      openid: "",
      isConnected: true, // 有无网络
    }

    /**
     * 初次加载判断网络情况
     */
    wx.getNetworkType({
      success: (result) => {
        const networkType = result.networkType
        if(networkType === 'none') {
          this.globalData.isConnected = false;
          wx.showToast({
            title: '当前无网络',
            icon: "loading"
          })
        }
      },
    })

    /**
     * 判断网络变化
     */
    wx.onNetworkStatusChange((result) => {
      console.log(result)
      if(!result.isConnected) {
        this.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: "loading"
        })
      } else {
        this.globalData.isConnected = true
        wx.hideToast()
      }
    })
  }
})
