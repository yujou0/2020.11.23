// 引用網頁伺服器套件
import express from 'express'
// env
import dotenv from 'dotenv'
// 引用資料庫檔
import db from './db.js'

dotenv.config()

const app = express()

// express監聽指定PORT的請求
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
