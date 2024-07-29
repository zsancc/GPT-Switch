

# GPT多账号切换扩展

利用GPT-4o写了一个GPT多账号切换扩展，可实现快速切换账号白嫖GPT-4o

众所周知，GPT-4o是有限制的，发几条就被限制了，这时候这个扩展就派上用场了，可以内置多个账号，当某一个账号被限制后可实现点击一下切换账号，继续愉快的白嫖。

## 使用教程如下：

1. **安装扩展**，因为没上架扩展商店，只能通过开发者模式使用，在扩展界面打开开发者模式，选择加载解压缩的扩展，然后选择扩展解压后的文件夹（这个文件夹不能删除及挪位置，最好保存到固定路径） [![image](https://camo.githubusercontent.com/c2c9797434dc871c044b7715441794898220e4531762289d55a96534577e23fa/68747470733a2f2f64642d7374617469632e6a642e636f6d2f6464696d67702f6a66732f7432303235303930322f353033342f34302f32323331342f3732393835302f36366137373234344636363030303031612f376261353836383837633830343761312e706e67)](https://camo.githubusercontent.com/c2c9797434dc871c044b7715441794898220e4531762289d55a96534577e23fa/68747470733a2f2f64642d7374617469632e6a642e636f6d2f6464696d67702f6a66732f7432303235303930322f353033342f34302f32323331342f3732393835302f36366137373234344636363030303031612f376261353836383837633830343761312e706e67)
2. **获取账号cookie**，在你的浏览器中登录你的GPT账号，然后按ctrl+shift+I打开控制台，点击应用程序，在左边选择cookie，选择chatgpt网站，然后复制__Secure-next-auth.session-token这项的值，ey开头，有效期大概3个月，也就是说3个月左右不用重新登录账号。 [![image](https://camo.githubusercontent.com/8a50e74f1a55cf6715efc90c1e622df315549157450c650f7260f8aded628c6a/68747470733a2f2f64642d7374617469632e6a642e636f6d2f6464696d67702f6a66732f7432303235303930322f3233343333382f33322f32343238382f323937373230372f36366137373934384635363935333664352f363039363362303630323437383335652e706e67)](https://camo.githubusercontent.com/8a50e74f1a55cf6715efc90c1e622df315549157450c650f7260f8aded628c6a/68747470733a2f2f64642d7374617469632e6a642e636f6d2f6464696d67702f6a66732f7432303235303930322f3233343333382f33322f32343238382f323937373230372f36366137373934384635363935333664352f363039363362303630323437383335652e706e67)
3. **添加账号token到扩展**，打开扩展，点击添加用户，输入email（只是用来标记账号）和token，点确定即可导入账号，同样的方式添加多个账号就行了。账号默认设置了80天有效期。也就是每80天登录一批账号就可以了。 [![image](https://camo.githubusercontent.com/66c8f79692d48cd1f6bbd79bbf195a88b6b09ffec215876d7106969d8542f94a/68747470733a2f2f64642d7374617469632e6a642e636f6d2f6464696d67702f6a66732f7432303235303930322f3232353732392f32352f32343231392f3234353934342f36366137376135634631313161333861642f303664653063656139396464636338362e706e67)](https://camo.githubusercontent.com/66c8f79692d48cd1f6bbd79bbf195a88b6b09ffec215876d7106969d8542f94a/68747470733a2f2f64642d7374617469632e6a642e636f6d2f6464696d67702f6a66732f7432303235303930322f3232353732392f32352f32343231392f3234353934342f36366137376135634631313161333861642f303664653063656139396464636338362e706e67)
4. **导入cookie方式**，和3任选一个就行，导入cookie好处是可以一次性导入保存好的多个账号，多个浏览器使用方便导入。点击扩展，点击导入cookies，然后选择保存账号cookie的json文件，格式如下： 账号：token { "账号1email":"ey**", "账号2email":"ey**", "账号3email":"ey**", "账号4email":"ey**" } 5、切换账号，当当前登录的GPT-4o达到限额时，打开扩展，点击切换账号，然后点刷新页面就可以切换为下一个账号了

目前缺点就是没办法将一个账号的会话导入下一个账号，导致切换账号后只能重新开始会话，另外扩展界面有点丑，会前端的大佬们可以自己改一下
