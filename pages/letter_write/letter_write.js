// pages/letter_write/letter_write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Time_Wirte:"2019/4/9",
      isHidden_Pic_two:true,
      isHidden_Pic_three: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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


  onclick_add_picture_one:function(){
      this.setData({
          isHidden_Pic_two:false
      })
  },
    onclick_add_picture_two:function(){
        this.setData({
            isHidden_Pic_three: false
        })
    },
    onclick_add_picture_three:function(){

    },

    onclick_SaveLetter:function(){
        wx.navigateTo({
            url: '../letter_send/letter_send',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})