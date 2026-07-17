---
title: Clash订阅导入教程：从零开始配置Clash客户端
layout: post
date: 2026-01-05 14:00:00 +0800
category: Clash教程
tags: [Clash, Clash Meta, Clash Verge, 订阅导入, 配置教程]
author: 杨帆云
toc: true
description: 从零开始教你如何配置Clash客户端，包括Clash Meta和Clash Verge的下载安装、订阅导入、节点选择和规则配置。小白也能轻松上手的完整教程。
---

## 前言

Clash 是目前最流行的代理客户端之一，支持多种代理协议和灵活的规则配置。无论你是新手还是老用户，这篇教程将带你从零开始完成 Clash 的配置。我们将覆盖 Clash Meta 和 Clash Verge 两款主流客户端。

## 一、Clash 客户端选择

目前主流的 Clash 客户端有以下几个选择：

| 客户端 | 平台 | 特点 | 推荐指数 |
|--------|------|------|----------|
| Clash Verge | Windows / macOS / Linux | 界面美观，操作简单，适合新手 | ⭐⭐⭐⭐⭐ |
| Clash Meta | Windows / macOS / Linux | 命令行/后台运行，性能最强 | ⭐⭐⭐⭐ |
| Clash for Windows | Windows | 经典客户端，已停止维护 | ⭐⭐⭐ |
| ClashX / ClashX Pro | macOS | macOS 原生体验 | ⭐⭐⭐⭐ |

**新手推荐使用 Clash Verge**，它拥有现代化的 GUI 界面，配置简单直观。

## 二、下载与安装

### 2.1 下载 Clash Verge

1. 访问 Clash Verge 的 GitHub Releases 页面：[https://github.com/clash-verge-rev/clash-verge-rev/releases](https://github.com/clash-verge-rev/clash-verge-rev/releases)
2. 根据你的操作系统选择对应的安装包：
   - Windows：选择 `Clash.Verge_x.x.x_x64-setup.exe`
   - macOS：选择 `Clash.Verge_x.x.x_x64.dmg`（Intel）或 `Clash.Verge_x.x.x_aarch64.dmg`（Apple Silicon）
   - Linux：选择 `Clash.Verge_x.x.x_amd64.deb` 或 `Clash.Verge_x.x.x_x86_64.AppImage`
3. 下载完成后，双击安装包按照提示完成安装

### 2.2 下载 Clash Meta（可选）

如果你需要命令行版本或使用 Clash Verge 的内核：

1. 访问 Clash Meta 的 GitHub Releases 页面：[https://github.com/MetaCubeX/Clash.Meta/releases](https://github.com/MetaCubeX/Clash.Meta/releases)
2. 选择对应的系统架构版本下载
3. 解压后即可使用

## 三、获取机场订阅链接

在配置 Clash 之前，你需要先拥有一个机场的订阅链接。

1. 在机场网站注册并购买套餐
2. 登录用户中心，找到「订阅」或「我的订阅」页面
3. 复制 Clash 格式的订阅链接（通常以 `https://` 开头，后缀名为 `.yaml` 或 `.clash`）

> 如果机场只提供通用订阅链接（如 SS/v2ray 格式），你需要使用订阅转换服务将其转换为 Clash 格式。推荐使用在线订阅转换工具如 [subconverter](https://sub.id9.cc/)。

## 四、在 Clash Verge 中导入订阅

### 4.1 打开 Clash Verge

安装完成后，启动 Clash Verge。首次启动时，系统可能会提示防火墙权限，请允许通过。

### 4.2 添加订阅

1. 点击左侧菜单的「订阅」按钮
2. 在「订阅 URL」输入框中粘贴你从机场复制的订阅链接
3. 点击「导入」按钮
4. Clash Verge 会自动下载并解析订阅中的节点

### 4.3 更新订阅

- 点击订阅卡片上的「刷新」按钮可以手动更新订阅
- Clash Verge 支持自动更新，可以在设置中配置更新间隔（建议设置为 24 小时）

## 五、配置代理模式

导入订阅后，你需要选择合适的代理模式：

### 5.1 代理模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **Rule（规则）** | 根据规则自动分流，国内流量直连，国外流量走代理 | 🌟 推荐日常使用 |
| **Global（全局）** | 所有流量都走代理 | 访问特定海外网站 |
| **Direct（直连）** | 所有流量都不走代理 | 关闭代理 |
| **Script（脚本）** | 使用 JavaScript 脚本自定义分流规则 | 进阶用户 |

**推荐选择「Rule」模式**，这是最常用的模式，可以实现国内网站直连、国外网站走代理的智能分流。

### 5.2 节点选择

1. 点击左侧菜单的「代理」或「节点」页面
2. 你可以手动选择要使用的节点
3. 推荐开启「自动选择」或「负载均衡」模式：
   - **自动选择（Auto）：** 自动选择延迟最低的节点
   - **负载均衡（Load Balance）：** 在多个节点间分配流量

## 六、配置系统代理（重要）

为了让代理生效，你需要开启系统代理：

### 6.1 Clash Verge

在 Clash Verge 主界面，打开右上角的「系统代理」开关（或称为「TUN 模式」）。

- **系统代理模式：** 仅代理 HTTP/HTTPS 流量
- **TUN 模式：** 代理所有流量（包括 UDP、游戏等）

推荐开启 TUN 模式以获得最佳体验。

### 6.2 浏览器配置（可选）

如果不想使用系统级代理，也可以在浏览器中安装代理插件（如 SwitchyOmega），配置指向 Clash 的代理地址（默认 127.0.0.1:7890）。

## 七、TUN 模式配置

TUN 模式可以让 Clash 代理所有流量，包括游戏、UDP 等。

### 7.1 开启 TUN

1. 在 Clash Verge 中点击「设置」
2. 找到「TUN 模式」开关并开启
3. 如果首次开启，系统可能会要求安装虚拟网卡驱动，请允许

### 7.2 TUN 配置建议

在 Clash 配置文件中，建议如下配置 TUN：

```yaml
tun:
  enable: true
  stack: system # 或 gvisor
  dns-hijack:
    - any:53
  auto-route: true
  auto-detect-interface: true
```

## 八、规则配置

Clash 的强大之处在于灵活的规则配置。默认规则已经能满足大部分需求，但你可以根据需要自定义。

### 8.1 常用规则说明

```yaml
rules:
  # 广告屏蔽
  - DOMAIN-SUFFIX,doubleclick.net,REJECT
  # 国内网站直连
  - DOMAIN-SUFFIX,baidu.com,DIRECT
  - DOMAIN-SUFFIX,qq.com,DIRECT
  # 流媒体走代理
  - DOMAIN-SUFFIX,netflix.com,Proxy
  - DOMAIN-SUFFIX,youtube.com,Proxy
  # 其余国外流量走代理
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```

### 8.2 使用规则集

Clash Meta 支持 rule-set 功能，可以将规则集中管理：

```yaml
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400

rules:
  - RULE-SET,reject,REJECT
```

## 九、常见问题

### 9.1 无法连接节点
- 检查订阅链接是否过期，尝试更新订阅
- 切换其他节点测试
- 检查系统代理是否已开启

### 9.2 部分网站无法访问
- 尝试切换为 Global 模式
- 检查规则配置是否正确
- 确认 DNS 设置正常

### 9.3 速度慢
- 手动选择延迟更低的节点
- 开启负载均衡模式
- 检查本地网络环境
- 尝试更换协议或端口

### 9.4 提示"核心文件缺失"
- 在 Clash Verge 设置中重新下载或指定核心文件路径
- 手动下载 Clash Meta 核心并配置路径

## 十、进阶技巧

### 10.1 使用 yacd 面板

Clash 提供了 Web 管理面板，可以在浏览器中管理节点和规则：

1. 打开浏览器访问 `http://127.0.0.1:9090/ui/`
2. 在面板中可以查看节点延迟、切换节点、查看流量统计等

### 10.2 配置自动更新

在 Clash Verge 设置中，可以配置订阅自动更新时间，建议设置为 24 小时自动更新一次。

### 10.3 多订阅合并

如果你有多个机场的订阅，Clash Verge 支持导入多个订阅，并将所有节点合并在一起使用。

## 总结

通过这篇教程，你应该已经掌握了 Clash 客户端的基本配置方法。从下载安装到订阅导入，从模式选择到规则配置，希望每一步都让你感到清晰易懂。

Clash 是一款功能强大的工具，掌握它可以让你的网络体验更加流畅和自由。如果遇到任何问题，欢迎在我们的博客中查找更多教程，或通过联系我们页面获取帮助。

**相关教程：**
- [Shadowrocket 配置教程](/tutorial/shadowrocket/)
- [Sing-box 配置教程](/tutorial/singbox/)
- [OpenClash 配置教程](/tutorial/openclash/)
- [订阅使用教程](/tutorial/subscription/)
