/*
 * @Author: 凡琛
 * @Date: 2021-07-16 17:10:33
 * @LastEditTime: 2021-07-16 22:15:56
 * @LastEditors: Please set LastEditors
 * @Description: 一般通用接口管理
 * @FilePath: /Amon_server/server/base/common.js
 */

class commonManager {
  // 首页列表接口
  async homeList(req, res, next) {
    //创建数据
    var pagingList = [
      { imageUrl: 'http://www.hdec.com/cn/images/banner1.jpg', jumpUrl: 'www.baidu.com' },
      { imageUrl: 'http://www.hdec.com/cn/images/banner2.jpg', jumpUrl: 'www.baidu.com' },
      { imageUrl: 'http://www.hdec.com/cn/images/banner3.jpg', jumpUrl: 'www.baidu.com' },
      { imageUrl: 'http://www.hdec.com/cn/images/banner4.jpg', jumpUrl: 'www.baidu.com' },
      { imageUrl: 'http://www.hdec.com/cn/images/banner5.jpg', jumpUrl: 'www.baidu.com' }
    ];
    var entryList = [
      { name: '样本采集', icon: 'icon/camera', jumpUrl: '/publish' },
      { name: '工程师', icon: "icon/engineer", jumpUrl: '' },
      { name: '地图', icon: "icon/map", jumpUrl: '/amap' },
      { name: '项目', icon: "icon/data_compare", jumpUrl: '/project' },
      { name: '项目', icon: "icon/data_compare", jumpUrl: '/project' },
    ];
    var newsList = [
      {
        title: '勘测云平台使用须知',
        detail: '勘测云平台使用须知，包含项目',
        date: '2021-06-07',
        imageUrl:
          [
            "http://www.hdec.com/cn/images/banner1.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg",
            "http://www.hdec.com/cn/images/banner1.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg",
            "http://www.hdec.com/cn/images/banner1.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg",
            "http://www.hdec.com/cn/images/banner1.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg"
          ]
      },
      {
        title: '勘测云平台使用须知1',
        detail: '勘测云平台使用须知，包含项目',
        date: '2021-06-07',
        imageUrl:
          [
            "http://www.hdec.com/cn/images/banner1.jpg"
          ]
      },
      {
        title: '勘测云平台使用须知2',
        detail: '勘测云平台使用须知，包含项目',
        date: '2021-06-07',
        imageUrl:
          [
            "http://www.hdec.com/cn/images/banner1.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg",
            "http://www.hdec.com/cn/images/banner3.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg",
          ]
      },
      {
        title: '勘测云平台使用须知2',
        detail: '勘测云平台使用须知，包含项目',
        date: '2021-06-07',
        imageUrl:
          [
            "http://www.hdec.com/cn/images/banner1.jpg",
            "http://www.hdec.com/cn/images/banner2.jpg",
            "http://www.hdec.com/cn/images/banner3.jpg",
          ]
      }
    ]
    var list = {
      pagingList,
      entryList,
      newsList
    }
    response(res, {
      success: true,
      msg: "用户注销成功",
      list
    });
  }
}

module.exports = new commonManager();