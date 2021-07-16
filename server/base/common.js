/*
 * @Author: 凡琛
 * @Date: 2021-07-16 17:10:33
 * @LastEditTime: 2021-07-17 01:09:39
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
      { name: '发布', icon: 'icon/publish', color: 0xffb3e16d, jumpUrl: '/publish' },
      { name: '专业', icon: "icon/professional", color: 0xfffc7cad, jumpUrl: '' },
      { name: '地图', icon: "icon/map", color: 0xffa5d8fd, jumpUrl: '/amap' },
      { name: '项目', icon: "icon/project_1", color: 0xff8eb1da, jumpUrl: '/project' },
      { name: '记录', icon: "icon/history", color: 0xffffdf8a, jumpUrl: '' },
    ];
    var newsList = [
      {
        title: '勘测云平台使用须知',
        detail: '工程勘察是设计和施工的前提，事关建筑质量安全。工程勘察项目管理服务云平台能精准的为勘察单位、土工试验室、审图机构、劳务公司、监管部门提供生产、管理和监督服务，通过“实时、实地、实人”操作实现对勘察项目的全过程管理和重点环节预警，通过信息化数据采集减少重复劳动。云平台是山东省工程勘察项目管理服务的信息化首创，能大大提高项目的管理水平和生产效率，能较好的促进勘察质量提升和完善监管部门的监管模式',
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