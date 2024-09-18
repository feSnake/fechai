// 提问：写一个工具函数，对文件大小的单位进行转换，加注释
// 回答：下面是一个JavaScript工具函数，它接受文件大小、初始单位、目标单位和小数位数，然后返回目标单位下的文件大小。

/**
 * 将文件大小从一个单位转换为另一个单位。
 *
 * @param {number} size 文件大小。
 * @param {string} fromUnit 初始单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {string} toUnit 目标单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {number} [decimalPoint=2] 结果保留的小数位数，默认为2。
 * @return {string} 转换后的文件大小，带单位。
 */
function convertFileSize(size, fromUnit, toUnit, decimalPoint = 2) {
    // 定义单位与字节之间的转换关系
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    // 获取初始单位和目标单位的索引
    const fromIndex = units.indexOf(fromUnit);
    const toIndex = units.indexOf(toUnit);

    // 如果单位不在列表中，抛出错误
    if (fromIndex === -1 || toIndex === -1) {
        throw new Error('Invalid units');
    }

    // 计算初始单位与目标单位之间的转换系数
    const exponent = toIndex - fromIndex;
    // 计算结果大小
    const resultSize = size / Math.pow(1024, exponent);

    // 返回格式化后的结果
    return parseFloat(resultSize.toFixed(decimalPoint)) + ' ' + toUnit;
}

// 示例使用
console.log(convertFileSize(1, 'GB', 'MB')); // 输出: 1024.00 MB
console.log(convertFileSize(1, 'MB', 'KB')); // 输出: 1024.00 KB
console.log(convertFileSize(1, 'KB', 'B'));  // 输出: 1024.00 B
console.log(convertFileSize(1, 'MB', 'GB', 5)); // 输出: 0.00098 GB