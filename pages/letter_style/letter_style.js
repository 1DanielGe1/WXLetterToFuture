// pages/letter_style/letter_style.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file_one: "/assets/addPicture.png",
    file_two: "/assets/addPicture.png",
    file_three: "/assets/addPicture.png",
    file_one_hidden: true,
    file_two_hidden: true,
    file_three_hidden: true,
    write_time: "2019/04/30",
    recordingFilePath: "none",
    recording_hidden: true,
    locationName: "获取当前位置",
    location_hidden: true,
    userInput: "",
    paperFontMaskFlag: "block",
    family: "",
    backgroundImage: "background-color:#AEDD81",

    m_family: "def",
    m_backgroundImage: "def",

    backgrounds: [
      { name: 'def', value: '默认', def:'true', checked: 'true' },
      { name: 'marble', value: '大理石纹理', src: '/assets/background-1.jpg' },
      { name: 'LL', value: '类类' },
      { name: 'aa', value: '啊啊' },
    ],

    fonts: [
      { name: 'def', value: '跟随系统', def:'true', checked: 'true' },
      { name: 'happy', value: '站酷快乐体', src: '/assets/happy_font.png' },
      { name: 'LL', value: '类类' },
      { name: 'aa', value: '啊啊' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: "letter_write",
      success(res) {
        console.log(res.data)
        that.setData({
          file_one: res.data.file_one,
          file_two: res.data.file_two,
          file_three: res.data.file_three,
          write_time: res.data.write_time,
          recordingFilePath: res.data.recordingFilePath,
          locationName: res.data.locationName,
          userInput: res.data.userInput
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    if (that.data.file_one == "/assets/addPicture.png") {
      that.setData({
        file_one: "none",
        file_one_hidden: true
      })
    } else {
      that.setData({
        file_one_hidden: false
      })
    }

    if (that.data.file_two == "/assets/addPicture.png") {
      that.setData({
        file_two: "none",
        file_two_hidden: true
      })
    } else {
      that.setData({
        file_two_hidden: false
      })
    }

    if (that.data.file_three == "/assets/addPicture.png") {
      that.setData({
        file_three: "none",
        file_three_hidden: true
      })
    } else {
      that.setData({
        file_three_hidden: false
      })
    }

    if (that.data.recordingFilePath == "none") {
      that.setData({
        recording_hidden: true
      })
    } else {
      that.setData({
        recording_hidden: false
      })
    }

    if ((that.data.locationName == "获取当前位置") || (that.data.locationName == "")) {
      that.setData({
        locationName: "none",
        location_hidden: true
      })
    } else {
      that.setData({
        location_hidden: false
      })
    }
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

  onclick_next: function () {
    var that = this;
    wx.setStorage({
      key: "letter_style",
      data: {
        file_one: that.data.file_one,
        file_two: that.data.file_two,
        file_three: that.data.file_three,
        write_time: that.data.write_time,
        recordingFilePath: that.data.recordingFilePath,
        locationName: that.data.locationName,
        userInput: that.data.userInput,
        family: that.data.m_family,
        backgroundImage: that.data.m_backgroundImage
      }
    })
    wx.navigateTo({
      url: "/pages/letter_send/letter_send",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  showPaperFont: function() {
    var that = this;
    that.setData({
      paperFontMaskFlag: "block"
    })
  },

  paperFontConfirm: function () {
    var that = this;
    that.setData({
      paperFontMaskFlag: "none"
    })

    if(that.data.m_backgroundImage == "def") {
      that.setData({
        backgroundImage: "background-color:#AEDD81"
      })
    } else if (that.data.m_backgroundImage == "marble") {
      that.setData({
        backgroundImage: "background-image:url('https://k51.github.io/background-1.jpg')"
      })
    }

    if (that.data.m_family == "def") {
      that.setData({
        family: ""
      })
    } else if (that.data.m_family == "happy") {
      wx.loadFontFace({
        family: "happy",
        source: 'url("https://www.liaojianpeng.work:8443/WXLetterToFutureServer/happy.ttf")',
        success: console.log
      })
      that.setData({
        family: "font-family:'happy'"
      })
    }
  },

  radioChange_paper(e) {
    this.setData({
      m_backgroundImage: e.detail.value
    })
  },

  radioChange_font(e) {
    this.setData({
      m_family: e.detail.value
    })
  }
})