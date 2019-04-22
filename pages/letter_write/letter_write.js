// pages/letter_write/letter_write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file_one: "/assets/letter_letter_write_addPicture.png",
    file_two: "/assets/letter_letter_write_addPicture.png",
    file_three: "/assets/letter_letter_write_addPicture.png",
    time_Wirte: "2019/4/9",
    locationName: "获取当前位置",
    maskFlag: "none",
    openRecordingdis: "block",
    stopRecordingdis: "none",
    playRecordingdis: "none",
    firstChooseLocation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  showRecording: function() {
    this.setData({
      maskFlag: "block",
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
          })
        }
      }
    })
  },

  onclick_add_picture_one: function() {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file_one: res.tempFilePaths
        });
      }
    })
  },

  onclick_add_picture_two: function() {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file_two: res.tempFilePaths
        });
      }
    })
  },

  onclick_add_picture_three: function() {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file_three: res.tempFilePaths
        });
      }
    })
  },

  onclick_SaveLetter: function() {
    wx.navigateTo({
      url: '../letter_send/letter_send',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  recConfirm: function() {
    this.setData({
      maskFlag: "none",
    })
  },

  openRecording: function() {
    var that = this;
    const recorderManager = wx.getRecorderManager();
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          that.openConfirm();
        } else {
          recorderManager.start(options);
          that.setData({
            openRecordingdis: "none",
            stopRecordingdis: "block"
          })
        }
      }
    })
  },

  openConfirm: function() {
    wx.showModal({
      content: '检测到您没打开相应权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {}
          })
        } else {}
      }
    })
  },

  stopRecording: function() {
    var that = this;
    const recorderManager = wx.getRecorderManager();
    recorderManager.onStop((res) => {
      var global = getApp(); // 测试用
      global.tempFilePath = res.tempFilePath; //  测试用
      console.log(res, '获取录制完的链接')
    })
    recorderManager.stop();
    that.setData({
      stopRecordingdis: "none",
      playRecordingdis: "block"
    })
  },

  playRecording: function() {
    var that = this;
    var global = getApp(); // 测试用
    var tempFilePath = global.tempFilePath; // 测试用
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = tempFilePath;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    innerAudioContext.play();
  },

  chooseLocation: function() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          if (that.data.firstChooseLocation) {
            wx.authorize({
              scope: 'scope.userLocation',
            })
          } else {
            that.openConfirm();
            that.setData({
              firstChooseLocation: false
            })
          }
        } else {
          wx.chooseLocation({
            success: function(res) {
              that.setData({
                locationName: res.name
              })
            }
          })
        }
      }
    })
  }
})