// miniprogram/pages/tools/cars.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    carSearchList: [], // 搜索出来的列表
    searchText: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "Loading..."
    })
    this.getCarData()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCarData() {
    wx.cloud.init({
      // env: 'hpl-test'
    })
    wx.cloud.callFunction({
      name: "getCar"
    }).then(res => {
      console.log(res)
      this.setData({
        carList: res.result
      })
      wx.hideLoading()
    })
  },

  bindKeyInput(e) {
    console.log(e)
    this.setData({
      searchText: e.detail.value
    })
  },
})