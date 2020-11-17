// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const cars = db.collection('car').get().then(res => {
    console.log(res)
    return groupBy(res.data[0].RECORDS.sort(compare('initial')), 'initial')
  })
  return cars
}

const groupBy = (arr, name) => {
  let newArr = []
  let groups = {}
  console.log(arr)
  arr.forEach(item => {
    const group = item[name]
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  for(let key in groups) {
    newArr.push({
      initial: key,
      data: groups[key]
    })
  }
  console.log(newArr)
  return newArr
}
const compare = (key) => {
  return function(obj1, obj2) {
    var val1 = obj1[key]
    var val2 = obj2[key]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    } 
  }
}