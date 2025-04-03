**概要：**在这篇记录中，我们将探讨如何将自己的域名解析到部署在Vercel服务器上的项目。

## A记录和CNAME记录

A记录（Address Record）：将一个域名直接映射到一个IPv4地址。

CNAME记录（Canonical Name Record）：将一个域名（别名）指向另一个域名（规范名）。它本质上是一个别名记录，用于将一个域名重定向到另一个域名。



## CloudFlare

CF具有Worker.js、全球无限CDN流量、网站防火墙、DDoS等特性、边缘节点、DNS解析等特点



## 步骤

1. 申请一个域名，我用的阿里云（长期使用的话，建议去其他平台比如[porkbun](https://porkbun.com/),[Namesilo](http://www.namesilo.com/?rid=fe5a225yc)等等，因为阿里云续费死贵了）

   我这里以刚刚申请的`coderpeng.xyz`为例

2. 将域名给CloudFlare托管，选择免费计划

   ![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/cf添加域.png)

3. 登录 DNS 提供商，找到并关闭 DNS 安全 (DNSSEC) 设置（无则忽略此步骤）

4. 将您当前的名称服务器替换为 Cloudflare 名称服务器：控制台>域名管理（不是云解析管理）>选中要修改的域名点击管理 DNS管理

   ![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/修改dns.png)

   注意修改不是立马生效，要等几个小时

   ![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/修改DNS2.png)

5. 生效后在Cloudflare的DNS下面，添加你的域名解析A记录指向Vercel服务器地址**76.76.21.21**，也可以根据需要添加CNAME记录，值指向Vercel的CNAME服务器：**cname-china.vercel-dns.com**

   ![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/cf修改dns.png)

6. 最后那如果你已经有其他的CDN服务，记得把这里对应记录的Proxied改为`DNS only`，否则会多次重定向报错，在速度>优化那把免费的都开启，最后我们就能在国内愉快的访问部署到Vercel上的项目啦



## 常见问题

**1.访问域名提示`重定向次数过多`?**

在Cloudflare里进入存在这个问题的域名控制台，在左侧导航栏中找到SSL\TLS，将`SSL/TLS 加密模式`更改为完全或者完全(严格)，若还是存在这个问题，则将DNS的代理更改为`仅 DNS`。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/加密模式.png)



## 参考

- [Vercel应用如何绑定自己的域名](https://blog.tangly1024.com/article/vercel-domain)

