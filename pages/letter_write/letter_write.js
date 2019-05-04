// pages/letter_write/letter_write.js
Page({

<<<<<<< HEAD
  /**
   * 页面的初始数据
   */
  data: {
    file_one: "/assets/addPicture.png",
    file_two: "/assets/addPicture.png",
    file_three: "/assets/addPicture.png",
    file_two_hidden: true,
    file_three_hidden: true,
    write_time: "2019/04/30",
    locationName: "获取当前位置",
    maskFlag: "none",
    openRecordingdis: "block",
    stopRecordingdis: "none",
    recordingFilePath: "none",
    playRecordingdis: "none",
    firstChooseLocation: true,
    userInput: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    that.setData({
      write_time: Y + '/' + M + '/' + D
    })
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
          file_one: res.tempFilePaths[0],
          file_two_hidden: false
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
          file_two: res.tempFilePaths[0],
          file_three_hidden: false
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
          file_three: res.tempFilePaths[0]
        });
      }
    })
  },

  onclick_next: function() {
    var that = this;
    wx.setStorage({
      key: "letter_write",
      data: {
        file_one: that.data.file_one,
        file_two: that.data.file_two,
        file_three: that.data.file_three,
        write_time: that.data.write_time,
        recordingFilePath: that.data.recordingFilePath,
        locationName: that.data.locationName,
        userInput: that.data.userInput
      }
    })
    wx.navigateTo({
      url: "/pages/letter_style/letter_style",
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
      that.setData({
        recordingFilePath: res.tempFilePath
      })
    })
    recorderManager.stop();
    that.setData({
      stopRecordingdis: "none",
      playRecordingdis: "block"
    })
  },

  playRecording: function() {
    var that = this;
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = that.data.recordingFilePath;
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
              if (res.name != "") {
                that.setData({
                  locationName: res.name
                })
              }
            }
          })
        }
      }
    })
  },

  getUserInput: function(e) {
    this.setData({
      userInput: e.detail.value
    })
  }
=======
    /**
     * 页面的初始数据
     */
    data: {
        file_one: "/assets/letter_letter_write_addPicture.png",   //第一张图片的url
        file_two: "/assets/letter_letter_write_addPicture.png",    //第二张图片的url
        file_three: "/assets/letter_letter_write_addPicture.png",    //第三张图片的url
        time_Wirte: "2019/4/9",     //写信的时间
        locationName: "获取当前位置",    //位置，默认值是 "获取当前位置"
        maskFlag: "none",
        openRecordingdis: "block",
        stopRecordingdis: "none",
        playRecordingdis: "none",
        firstChooseLocation: true,
        isHiddenPictureTwo: true,    //默认隐藏第二个添加图片的按钮，添加了第一张图片后，该参数变为false
        isHiddenPictureThree: true,   //默认隐藏第三个添加图片的按钮，添加了第二张图片后，该参数变为false
        numberOfPicture: 0    //这封信添加的图片数，取值0~3
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

    //添加第一张图片
    onclick_add_picture_one: function() {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    file_one: res.tempFilePaths[0],
                    isHiddenPictureTwo: false,
                    numberOfPicture: 1
                });
            }
        })
    },

    //添加第二张图片
    onclick_add_picture_two: function() {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    file_two: res.tempFilePaths[0],
                    isHiddenPictureThree: false,
                    numberOfPicture: 2
                });
            }
        })
    },

    //添加第三张图片
    onclick_add_picture_three: function() {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    file_three: res.tempFilePaths[0],
                    numberOfPicture: 3
                });
            }
        })
    },


    //写完信后点击保存
    //注意：这里将图片、录音传输但服务器，仅仅用于测试，最后还需要改变传服务器的位置
    onclick_SaveLetter: function() {
        var that = this;
        var num = that.data.numberOfPicture;
        var pathArray = new Array();
        pathArray[0] = that.data.file_one;
        pathArray[1] = that.data.file_two;
        pathArray[2] = that.data.file_three;
        var path = pathArray[0];

        //循环传输所有的图片
        for (var i = 0; i < num; i++) {
            var path=pathArray[i];
            wx.uploadFile({
                url: 'https://www.liaojianpeng.work:8443/WXLetterToFutureServer/UploadLetterPictureServlet', //仅为示例，非真实的接口地址
                filePath: path,
                name: 'file',
                header: {
                    "Content-Type": "multipart/form-data"
                },
                formData: {
                    user: 'test'
                },
                success: function(res) {
                    console.log(res)
                    console.log(res.data)
                },
                fail: function(res) {
                    console.log(res)
                }
            })
        }

        //传输完成，页面跳转
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
>>>>>>> dev
})