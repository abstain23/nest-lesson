async function async1 () {
  await async2()
  console.log('A')
}

async function async2 () {
  return new Promise((resolve, reject) => {
      resolve()
  })
}

async1()

new Promise((resolve) => {
  console.log('B')
  resolve()
}).then(() => {
  console.log('C')
}).then(() => {
  console.log('D')
}).then(() => {
  console.log('E')
})


// B C D A

/**
 * async函数在抛出返回值时，会根据返回值类型开启不同数目的微任务
  return结果值：非thenable、非promise（不等待）
  return结果值：thenable（等待 1个then的时间）
  return结果值：promise（等待 2个then的时间）

 */
