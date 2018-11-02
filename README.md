# back-stage
React网站后台管理系统搭建

## 一、分支类型和作用：
master分支：生产环境的稳定分支，代码最权威，随时可发布。
feature分支：功能开发分支，用于较大的功能开发。
release分支：测试分支，用于feature测试。
hotfix分支：紧急修改分支，用于少量代码的修改、发布。

## 二、流程
- 开发新功能：
1. 从 master 拉取处 feature 分支，在feature分支完成开发和自测
- 提测：
1. 从 master 拉取 release 分支
2. 把 feature 分支提 MR 到 release，进行 Code Review（增加此过程是为了方便code review。）
- 发布：
1. 把 release 分支合并到 master
- 线上修复：
1. 从 master 拉取 hotfix 分支。
2. 在hotfix分支完成开发、自测。
3. 测试通过后，将 hotfix 合回 master，等待发布。

## 三、分支命名
- 格式：
1. 分支类型/用途_时间戳。分支类型有feature、release、hotfix；用简单准确的单词表明分支用途，多词用中划线连接；时间戳格式YYMMDD。
- 例子：
1. 功能分支：feature/goods-1.0_180214
2. 多个功能合并：feature/goods-1.0+member-2.0_180214
3. 提测分支：release/goods-1.0_180222
4. Bug修复hotfix/week-0628 
## 四、commit
1、好的commit能够帮助追踪问题，回溯变更，生成change log等。

2、要控制好commit的粒度，让每次commit都是有意义的。commit也会反推自己把任务划分成一个个有意义的片段，形成开发节奏。

3、commit message清晰易读。填写type，scope，subject三个部分。

- type：类型。feat(功能特性)，fix(bug修复)，docs(文档修改或补充)，style(代码格式修改)，refactor(重构)，pref(性能优化)，test(单元测试)，build(构建配置或脚本修改)，revert(代码回滚)，ci(持续集成)，chore(其它不会影响功能的改动)

- scope：影响范围。

- subject：简短描述本次修改的内容。

4、commit message可以直接按格式输入

- 一条commit log的格式大概是这样子的

` type(scope):subject，例如：feat(reserve):增加预约模式弹窗组件；`
