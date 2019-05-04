// pages/letter_send/letter_send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file_one: "",           //相册图片路径
    file_two: "",           //相册图片路径
    file_three: "",         //相册图片路径
    write_time: "",         //写信时间
    recordingFilePath: "",  //录音地址路径
    locationName: "",       //定位位置
    userInput: "",          //信件内容
    family: "",             //选择的字体
    backgroundImage: "",    //背景图片
    userEmail: "",          //邮箱地址
    openDate: "2019-05-01", //信件开启时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: "letter_style",
      success(res) {
        console.log(res.data)
        that.setData({
          file_one: res.data.file_one,
          file_two: res.data.file_two,
          file_three: res.data.file_three,
          write_time: res.data.write_time,
          recordingFilePath: res.data.recordingFilePath,
          locationName: res.data.locationName,
          userInput: res.data.userInput,
          family: res.data.family,
          backgroundImage: res.data.backgroundImage
        })
      }
    })
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

  getUserEmail: function(e) {
    this.setData({
      userEmail: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      openDate: e.detail.value
    })
  },

  send_comfirm: function() {
    
  }
})