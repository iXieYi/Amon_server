#依赖基础镜像
FROM node

#容器内项目存放目录   TODO 文件服务地址需要调整
RUN mkdir -p /home/nodeapp && mkdir -p /Users/apple/Desktop/images

#进入到该文件路径下
WORKDIR /home/nodeapp

#拷贝项目文件
COPY . /home/Service

#进入项目文件夹下
WORKDIR /home/Service

RUN npm install

#暴露端口
EXPOSE 3000

#容器启动执行命令
#CMD [ "node", "app.js" ]
CMD ["node","./bin/www"]