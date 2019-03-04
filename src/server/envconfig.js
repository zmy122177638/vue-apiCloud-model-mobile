/**
 * 环境配置文件
 */
let baseURL;

if (process.env.NODE_ENV === "production") {
  // 干一些线上才要做的事情
  baseURL = "https://hy.yixueqm.com/interface/index.php/";
}
if (process.env.NODE_ENV === "development") {
  // 干一些测试时不可告人的事情
  baseURL = "https://hy.yixueqm.com/interface/index.php/";
}
export default { baseURL };
