

# uni-shared-utils

### Github: https://github.com/hlhang-dev/uni-shared-utils

## API

### LangManagement (多语言管理)

支持 4 种语言：简体中文 (zh-CN)、繁体中文 (zh-TW)、英语 (en-US)、日语 (ja-JP)

|          methods |           type            | remark                   |
| ---------------: | :-----------------------: | ------------------------ |
|      getInstance |     LangManagement        | 获取单例实例             |
|        setLocale |           void            | 设置当前语言             |
|        getLocale |        LocaleType         | 获取当前语言             |
| setCustomLangPack|           void            | 设置自定义语言包         |
|clearCustomLangPack|          void            | 清除自定义语言包         |
|                t |          string           | 翻译指定的语言键         |
| getCurrentLangPack|        LangPack          | 获取当前语言包           |
|    getAllLocales |      LocaleType[]         | 获取所有支持的语言       |

##### 使用示例

```typescript
import { LangManagement, LangKey } from 'uni-shared-utils'

// 设置语言为英文
LangManagement.getInstance().setLocale('en-US')

// 获取翻译文本
const text = LangManagement.getInstance().t(LangKey.LOGIN_SUCCESS_TITLE)

// 设置自定义语言包（部分覆盖）
LangManagement.getInstance().setCustomLangPack({
  LOGIN_SUCCESS_TITLE: '登录成功啦！'
})
```

##### 支持的语言类型

- `zh-CN`: 简体中文（默认）
- `zh-TW`: 繁体中文
- `en-US`: 英语
- `ja-JP`: 日语

### TokenManagement (该token存入后会成为HttpService默认的token)

|            methods |       type       | remark    |
| -----------------: | :--------------: | --------- |
|   saveAccountToken |       void       | 保存token |
|    getAccountToken | string \|\| null | 获取token |
| removeAccountToken |       void       | 移除token |



### LoginManagement

|                 methods |       type       | remark                 |
| ----------------------: | :--------------: | ---------------------- |
|          isAccountLogin |     boolean      | 账户是否登录           |
| isAccountLoginBeOverdue |     boolean      | 账户是否登录但是过期了 |
|               getWxCode | Promise<string>  | 获取微信code           |
|     checkWxLoginSession | Promise<boolean> | 检查登录状态是否过期   |

### ShowNoticeManagement

|           methods | type | remark       |
| ----------------: | :--: | ------------ |
|  showNormalNotice | void | 显示正常提示 |
| showSuccessNotice | void | 显示成功提示 |
|   showErrorNotice | void | 显示错误提示 |

##### method的params

|   params |  type   | remark                 | 选填 |
| -------: | :-----: | ---------------------- | ---- |
|    title | string  | 提示内容               | 否   |
| duration | number  | 持续时间（默认2000ms） | 是   |
|   isMask | boolean | 是否遮罩(默认false)    | 是   |



### LoadingManagement

| methods | type | remark      |
| ------: | :--: | ----------- |
|    show | void | 显示Loading |
|    hide | void | 隐藏Loading |



### UniAppManagement  优化了UniAppApi的缺陷 例如打开文件还需要先调用dowloadApi 在UniAppManagement中可直接传入url 可以点开源码自行查看



### HttpInit(全局网络请求初始化)

| methods | type | remark     |
| ------: | :--: | ---------- |
|    init | void | 初始化方法 |

##### init参数

|                params |  type   |                            remark                            | 选填 |
| --------------------: | :-----: | :----------------------------------------------------------: | ---- |
|             loginPage | string  |                     当无权限时跳转的页面                     |      |
|               timeout | number  |                           超时时间                           | 是   |
|           successCode | number  |            成功的code（会影响到返回的success值）             | 是   |
|       successParamStr | string  |                      成功的code的字段名                      | 是   |
| serverMessageParamStr | string  |                    服务器message的字段名                     | 是   |
|                header | object  | 全局requestHeader（若不想使用自带的token处理器可以在这里覆盖header） | 是   |
|         isShowLoading | boolean |                  是否显示Loading(默认true)                   | 是   |

##### 示例

![image-20230301103920221](https://hlhang.oss-cn-chengdu.aliyuncs.com/typora/drawing-bed/image-20230301103920221.png)

### HttpService 发起网络请求

|   methods |         type          | remark       |
| --------: | :-------------------: | ------------ |
| doRequest | Promise<ApiUnifiedVO> | 发起http请求 |

##### doRequest参数

|      params |  type  |           remark           | 选填 |
| ----------: | :----: | :------------------------: | ---- |
|         url | string |          请求url           | 否   |
|      method | string |            方式            | 否   |
|        data | object |            数据            | 是   |
|     headers | object | 该请求携带header（局部的） | 是   |
| showLoading | object | 是否显示Loading(默认true)  | 是   |

### 示例

![image-20230301112757294](https://hlhang.oss-cn-chengdu.aliyuncs.com/typora/drawing-bed/image-20230301112757294.png)



### PageInit 初始化页面

| methods | type | remark |
| ------: | :--: | ------ |
|    init | void | 初始化 |

##### init 参数

|      param |   type   | remark         |
| ---------: | :------: | -------------- |
| tabBarPath | string[] | TabBar页面路径 |



### UniMapper

|     methods |     type      | remark       |
| ----------: | :-----------: | ------------ |
|  uploadFile | Promise<void> | 上传单个文件 |
| uploadFiles | Promise<void> | 上传多个文件 |

##### uploadFile params

|         params |     type      | remark                                              | 选填    |
| -------------: | :-----------: | --------------------------------------------------- | ------- |
| uploadFileItem | UploadItemDTO | 待上传文件                                          | 否      |
|            url |    string     | 文件上传后端url                                     | 否      |
|          token |    string     | 文件上传token(默认使用tokenManagement中存储的token) | 是      |
|            key |    string     | 文件上传key（默认”file“）                           | 是      |
|       fileType |    string     | 文件类型（默认 'image' ）                           | 'video' |

##### uploadFiles params

|         params |         type         | remark                                              | 选填 |
| -------------: | :------------------: | --------------------------------------------------- | ---- |
| uploadFileItem | Array<UploadItemDTO> | 待上传文件列表                                      | 否   |
|            url |        string        | 文件上传后端url                                     | 否   |
|          token |        string        | 文件上传token(默认使用tokenManagement中存储的token) | 是   |
|            key |        string        | 文件上传key（默认”file“）                           | 是   |
|       fileType |        string        | 文件类型（默认 'image' ）                           | 是   |





### Beans

##### UploadItemDTO

|   params    |  type   | remark                                 |
| :---------: | :-----: | -------------------------------------- |
|     id      | string  | 随机id                                 |
|  localPath  | string  | 本地路径                               |
| networkPath | string  | 网路路径                               |
| serverData  |   any   | 文件上传完会把服务器数据吐到这个字段里 |
|  isUpload   | boolean | 是否上传                               |

##### ApiUnifiedVO

|     params |      type      | remark         |
| ---------: | :------------: | -------------- |
|       data | BaseServiceVO  | 服务器数据     |
|     header |    HeaderVO    | responseHeader |
| statusCode | HttpStatusCode | 服务器状态码   |
|     errMsg |     string     | errMsg         |

##### BaseServiceVO

|  params |  type   | remark     |
| ------: | :-----: | ---------- |
| success | boolean | 是否成功   |
|    code | string  | 服务器code |
|     msg | string  | 服务器msg  |
|  result | string  | 服务器data |



##### HeaderVO

|      params |  type  | remark      |
| ----------: | :----: | ----------- |
| contentType | string | 数据类型    |
|        date | string | 时间        |
|      server | string | server name |

