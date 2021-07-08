/*
 * @Author: 凡琛
 * @Date: 2021-06-29 11:55:36
 * @LastEditTime: 2021-06-29 14:49:30
 * @LastEditors: Please set LastEditors
 * @Description: 文件处理
 * @FilePath: /Amon_server/server/file/file.js
 */

exports.readFileBySuffixName = function (pathname, fs, req, res) {
  var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
  switch (ext) {    //根据后缀名读取相应的文件，设置响应头，并发送到客户端
    case ".css":
    case ".js":
      //读取文件
      fs.readFile(pathname, 'utf-8', function (err, data) {
        if (err) throw err;
        res.writeHead(200, {  //根据不同的后缀设置不同的响应头
          "Content-Type": {
            ".css": "text/css",
            ".js": "application/javascript",
          }[ext]
        });
        res.write(data);   //发送文件数据到客户端
        res.end();         //发送完成
      });
      break;
    //jpg、gif、png后缀的图片
    case ".jpg":
    case ".gif":
    case ".png":
      //二进制读取文件
      fs.readFile(pathname, 'binary', function (err, data) {
        if (err) throw err;
        res.writeHead(200, {
          "Content-Type": {
            ".jpg": "image/jpeg",
            ".gif": "image/gif",
            ".png": "image/png",
          }[ext]
        });
        res.write(data, 'binary'); //发送二进制数据
        res.end();
      });
      break;
    case ".mp4":
      //读取文件的状态
      fs.stat(pathname, function (err, stats) {
        if (err) {
          if (err.code === 'ENOENT') {
            return res.sendStatus(404);
          }
          res.end(err);
        }
        //断点续传，获取分段的位置
        var range = req.headers.range;
        if (!range) {
          //206状态码表示客户端通过发送范围请求头Range抓取到了资源的部分数据
          //416状态码表示所请求的范围无法满足
          range = `bytes=0-0/${stats.size}`;
          // return res.sendStatus(416);
        }
        //替换、切分，请求范围格式为：Content-Range: bytes 0-2000/4932
        var positions = range.replace(/bytes=/, "").split("-");

        //获取客户端请求文件的开始位置
        var start = parseInt(positions[0]);
        //获得文件大小
        var total = stats.size;

        //获取客户端请求文件的结束位置
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        //获取需要读取的文件大小
        var chunksize = (end - start) + 1;
        res.writeHead(206, {
          "Content-Range": "bytes " + start + "-" + end + "/" + total,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4"
        });
        //创建读取流
        var stream = fs.createReadStream(pathname, { start: start, end: end })
          .on("open", function () {
            stream.pipe(res); //读取流向写入流传递数据
          }).on("error", function (err) {
            res.end(err);
          });
      });
      break;
    case ".rar":
      //同步读取文件状态
      var stats = fs.statSync(pathname);
      res.writeHead(200, {
        "Content-Type": "application/octet-stream", //相应该文件应该下载
        //模板字符串
        "Content-Disposition": `attachment; filename = ${pathname.replace("/", "")}`,
        "Content-Length": stats.size
      });
      //管道流
      fs.createReadStream(pathname).pipe(res);
      break;
    //以上都不匹配则使用默认的方法
    case "":
      // 文件后缀空🙅‍♀️处理
      res.sendStatus(404);
      res.end();
      break;
    default:
      fs.readFile(pathname, 'utf-8', function (err, data) {
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.write(data);
        res.end();
      });
  }
}