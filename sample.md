Step 1：飞书后台配置
创建飞书机器人应用：用户需要打开开放平台https://open.feishu.cn/app、创建机器人应用
事件订阅模式选择「长连接（WebSocket）」
勾选并启用消息相关事件
Step 2：办公网侧运行方式
在办公网内启动一个 Bot 进程：注意提醒用户去开放平台获取机器人获取app_id / app_secret用于配置bot（我已经配置成功）
使用飞书官方 SDK 作为 WebSocket Client 建立长连接（待配置）
网络访问策略仅允许：
域名：open.feishu.cn
端口：443（HTTPS / WSS）

使用长连接接收回调
长连接是飞书 SDK 内提供的能力，你可以在本地服务器集成飞书 SDK， 与开放平台建立一条 WebSocket 全双工通道（你的服务器需要能够访问公网）。后续当应用订阅的回调发生时，开放平台会通过该通道向你的服务器发送回调消息。

注意事项

长连接模式下接收到消息后，需要在 3 秒内处理完成。
长连接模式的消息推送为 集群模式，不支持广播，即如果同一应用部署了多个客户端（client），那么只有其中随机一个客户端会收到消息。
开放平台提供了一键开发卡片交互机器人的场景体验教程，你可以前往体验基于卡片回传交互回调所搭建的机器人应用，详情参见：
步骤一：集成 SDK

以下示例代码中以 卡片回传交互、拉取链接预览数据 回调为例。
/usage
Go SDK

安装

go get -u github.com/larksuite/oapi-sdk-go/v3@latest

示例代码

package main

import (
    "context"
    "fmt"
    larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
    "github.com/larksuite/oapi-sdk-go/v3/event/dispatcher"
    "github.com/larksuite/oapi-sdk-go/v3/event/dispatcher/callback"
    larkws "github.com/larksuite/oapi-sdk-go/v3/ws"
)
func main() {
    // 注册回调
    eventHandler := dispatcher.NewEventDispatcher("", "").
       // 监听「卡片回传交互 card.action.trigger」
       OnP2CardActionTrigger(func(ctx context.Context, event *callback.CardActionTriggerEvent) (*callback.CardActionTriggerResponse, error) {
          fmt.Printf("[ OnP2CardActionTrigger access ], data: %s\n", larkcore.Prettify(event))
          return nil, nil
       }).
       // 监听「拉取链接预览数据 url.preview.get」
       OnP2CardURLPreviewGet(func(ctx context.Context, event *callback.URLPreviewGetEvent) (*callback.URLPreviewGetResponse, error) {
          fmt.Printf("[ OnP2URLPreviewAction access ], data: %s\n", larkcore.Prettify(event))
          return nil, nil
       })
    // 创建Client
    cli := larkws.NewClient("YOUR_APP_ID", "YOUR_APP_SECRET",
       larkws.WithEventHandler(eventHandler),
       larkws.WithLogLevel(larkcore.LogLevelDebug),
    )
    // 建立长连接
    err := cli.Start(context.Background())
    if err != nil {
       panic(err)
    }
}

步骤说明：
通过 dispatcher.NewEventDispatcher() 初始化回调处理器（eventHandler），注意两个参数必须填空字符串。
通过 eventHandler 的 OnXXXX() 方法监听不同的回调类型，上述示例中分别监听了 卡片回传交互 card.action.trigger 和 拉取链接预览数据 url.preview.get 两个回调。
通过 larkws.NewClient() 初始化长连接客户端，必填参数为应用的 APP_ID 和 APP_SECRET，可在开发者后台的应用详情页内，进入 基础信息 > 凭证与基础信息 页面，获取应用的 APP_ID 和 APP_SECRET。
可选参数传入 eventHandler，同时可设置日志级别。
通过 cli.Start() 启动客户端，如连接成功，控制台会打印 connected to wss://xxxxx，主线程将阻塞，直到进程结束。
!

Python SDK

安装

pip install lark-oapi==1.4.0

示例代码

import lark_oapi as lark
from lark_oapi.event.callback.model.p2_card_action_trigger import P2CardActionTrigger, P2CardActionTriggerResponse
from lark_oapi.event.callback.model.p2_url_preview_get import P2URLPreviewGet, P2URLPreviewGetResponse

# 监听「卡片回传交互 card.action.trigger」
def do_card_action_trigger(data: P2CardActionTrigger) -> P2CardActionTriggerResponse:
    print(lark.JSON.marshal(data))
    resp = {
        "toast": {
            "type": "info",
            "content": "卡片回传成功 from python sdk"
        }
    }
    return P2CardActionTriggerResponse(resp)

# 监听「拉取链接预览数据 url.preview.get」
def do_url_preview_get(data: P2URLPreviewGet) -> P2URLPreviewGetResponse:
    print(lark.JSON.marshal(data))
    resp = {
        "inline": {
            "title": "链接预览测试",
        }
    }
    return P2URLPreviewGetResponse(resp)
event_handler = lark.EventDispatcherHandler.builder("", "") \
    .register_p2_card_action_trigger(do_card_action_trigger) \
    .register_p2_url_preview_get(do_url_preview_get) \
    .build()
def main():
    cli = lark.ws.Client(lark.APP_ID, lark.APP_SECRET,
                         event_handler=event_handler, log_level=lark.LogLevel.DEBUG)
    cli.start()
if __name__ == "__main__":
    main()
步骤说明：
通过 lark.EventDispatcherHandler.builder() 初始化回调处理器（event_handler），两个参数必须填空字符串。
通过 event_handler 的 register_xxxx() 方法监听不同的回调类型，上述示例中监听了 卡片回传交互 card.action.trigger 和 拉取链接预览数据 url.preview.get 两个回调。
通过 register_p2_card_action_trigger 注册卡片回调的处理函数。
通过 register_p2_url_preview_get 注册链接预览的回调的处理函数。
通过 lark.ws.Client() 初始化长连接客户端，必填参数为应用的 APP_ID 和 APP_SECRET，可在开发者后台获取应用的 APP_ID 和 APP_SECRET。
可选参数传入 event_handler，同时可设置日志级别。
通过 cli.start() 启动客户端，如连接成功，控制台会打印 connected to wss://xxxxx，主线程将阻塞，直到进程结束。
!

Java SDK

安装 SDK

<dependencies>
  ...
  <dependency>
    <groupId>com.larksuite.oapi</groupId>
    <artifactId>oapi-sdk</artifactId>
    <version>2.4.0</version>
  </dependency>
  ...
</dependencies>

示例代码

package com.lark.oapi.sample.ws;

import com.lark.oapi.core.request.EventReq;
import com.lark.oapi.core.utils.Jsons;
import com.lark.oapi.event.CustomEventHandler;
import com.lark.oapi.event.EventDispatcher;
import com.lark.oapi.event.cardcallback.P2CardActionTriggerHandler;
import com.lark.oapi.event.cardcallback.P2URLPreviewGetHandler;
import com.lark.oapi.event.cardcallback.model.*;
import com.lark.oapi.service.im.ImService;
import com.lark.oapi.service.im.v1.model.P2MessageReceiveV1;
import com.lark.oapi.ws.Client;
import java.nio.charset.StandardCharsets;

public class Sample {
    private static final EventDispatcher EVENT_HANDLER = EventDispatcher.newBuilder("", "")  // 长连接不需要这两个参数，请保持空字符串
            // 监听「卡片回传交互 card.action.trigger」
            .onP2CardActionTrigger(new P2CardActionTriggerHandler() {
                @Override
                public P2CardActionTriggerResponse handle(P2CardActionTrigger event) throws Exception {
                    System.out.printf("[ P2CardActionTrigger access ], data: %s\n", Jsons.DEFAULT.toJson(event.getEvent()));
                    P2CardActionTriggerResponse resp = new P2CardActionTriggerResponse();
                    CallBackToast toast = new CallBackToast();
                    toast.setType("info");
                    toast.setContent("卡片交互成功 from Java SDk");
                    resp.setToast(toast);
                    return resp;
                }
            })
            // 监听「拉取链接预览数据 url.preview.get」
            .onP2URLPreviewGet(new P2URLPreviewGetHandler() {
                @Override
                public P2URLPreviewGetResponse handle(P2URLPreviewGet event) throws Exception {
                    System.out.printf("[ P2URLPreviewGet access ], data: %s\n", Jsons.DEFAULT.toJson(event.getEvent()));
                    P2URLPreviewGetResponse resp = new P2URLPreviewGetResponse();
                    URLPreviewGetInline inline = new URLPreviewGetInline();
                    inline.setTitle("链接预览测试fromJavaSDK");
                    resp.setInline(inline);
                    return resp;
                }
            })
            .build();
    public static void main(String[] args) {
        Client client = new Client.Builder("", "")
                .eventHandler(EVENT_HANDLER)
                .build();
        client.start();
    }
}
步骤说明：
通过 EventDispatcher.*newBuilder*() 初始化回调处理器（*EVENT_HANDLER*），注意两个参数必须填空字符串。
通过 EVENT_HANDLER 的 onXXXX() 方法监听不同的回调类型，上述示例中分别监听了 卡片回传交互 card.action.trigger 和 拉取链接预览数据 url.preview.get 两个回调。
通过 new Client.Builder() 初始化长连接客户端，必填参数为应用的 APP_ID 和 APP_SECRET，可在开发者后台获取。
可选参数传入 EVENT_HANDLER。
日志级别在自己项目的日志框架（log4j2、logback等）配置中修改。
通过 cli.start() 启动客户端，如连接成功，控制台会打印 "connected to wss://xxxxx"，主线程将阻塞，直到进程结束。
!

Node SDK

安装

npm install @larksuiteoapi/node-sdk@1.36.0

示例代码

import * as Lark from "@larksuiteoapi/node-sdk";
const wsClient = new Lark.WSClient({
  appId: "YOUR_APP_ID",
  appSecret: "YOUR_APP_SECRET",
});
const eventDispatcher = new Lark.EventDispatcher({}).register({
  "card.action.trigger": async (data) => {
    console.log(data);
    return {
      toast: {
        type: "success",
        content: "卡片交互成功",
        i18n: {
          zh_cn: "卡片交互成功",
          en_us: "card action success",
        },
      },
    };
  },
});
wsClient.start({ eventDispatcher });
步骤说明：
通过 new Lark.WSClient() 初始化长连接客户端，必填参数为应用的 APP_ID 和 APP_SECRET，可在开发者后台的应用详情页内，进入 基础信息 > 凭证与基础信息 页面，获取应用的 APP_ID 和 APP_SECRET。
通过 new Lark.EventDispatcher 初始化回调处理器（eventDispatcher）。
通过 eventDispatcher 的 register 方法监听不同的回调类型，上述示例中监听了 卡片回传交互 card.action.trigger 回调。
通过 wsClient.start 启动客户端，如连接成功，控制台会打印 [info]: [ "[ws]", "ws client ready" ]，主线程将阻塞，直到进程结束。
!

步骤二：设置订阅方式

登录 开发者后台，进入指定的企业自建应用详情页。
目前长连接模式不支持商店应用。

进入 事件与回调 > 回调配置 页面。
编辑订阅方式，选择 使用长连接接收事件，并点击 保存。warning
     此时本地基于 SDK 建立的长连接程序必须处于已连接并运行中状态，才能成功保存。