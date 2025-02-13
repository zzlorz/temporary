const XLSX = require('xlsx');
const datas = require('./datas.js');
// 示例数据
const data = [
  ['姓名', '年龄', '城市'],
  ['张三', 25, '北京'],
  ['李四', 30, '上海'],
  ['王五', 22, '广州']
];
// 示例数组，数组中包含多个 JSON 对象
const jsonArray = datas;

// 初始化最大键数量和对应的 JSON 对象
let maxKeyCount = 0;
let maxKeyObj = null;

// 遍历数组中的每个 JSON 对象
for (let i = 0; i < jsonArray.length; i++) {
    const obj = jsonArray[i];
    // 获取当前 JSON 对象的键数量
    const keyCount = Object.keys(obj).length;
    // 如果当前键数量大于最大键数量
    if (keyCount > maxKeyCount) {
        // 更新最大键数量
        maxKeyCount = keyCount;
        // 更新对应的 JSON 对象
        maxKeyObj = obj;
    }
}
var keys = Object.keys(maxKeyObj);
console.log(keys)
const newDatas = datas.map(i => {
    let item = keys.map(s => {
        if(i[s]) {
            return i[s]
        }else{
            return ''
        }
    });
    return item;
});
newDatas.unshift(keys);
// console.log(newDatas);
// console.log("键最多的 JSON 对象是:", maxKeyObj);
// 创建工作表
const ws = XLSX.utils.aoa_to_sheet(newDatas);

// 创建工作簿
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// 导出为 Excel 文件
XLSX.writeFile(wb, 'output.xlsx');