// 引用資料庫套件
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
// env
import dotenv from 'dotenv'
// 信箱驗證
import isEmail from 'validator/lib/isEmail'

dotenv.config()

// 連接資料庫
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })

// 使用插件
mongoose.plugin(beautifyUnique)

// 顯示連接成功訊息
const connection = mongoose.connection
connection.once('open', () => {
  console.log('已連接資料庫')
})

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    // 欄位名稱
    account: {
      // 資料類型
      // https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
      type: String,
      // 內建驗證規則
      // https://mongoosejs.com/docs/schematypes.html#schematype-options
      // 最小長度4,自訂錯誤訊息
      minlength: [4, '使用者名稱最少4個字'],
      maxlength: [20, '使用者名稱最多20個字'],
      required: [true, '缺少帳號欄位'],
      // 不可重複，預設只能放true或false，除非使用套件
      unique: '帳號重複'
    },
    password: {
      type: String,
      minlength: [4, '密碼最少4個字'],
      maxlength: [20, '密碼最多20個字'],
      required: [true, '缺少密碼欄位']
    },
    age: {
      type: Number,
      // 最小值，自訂錯誤訊息
      min: [13, '須年滿13歲'],
      // 最大值，自訂錯誤訊息
      max: [150, '請輸入有效年齡'],
      required: [true, '缺少年齡欄位']
    },
    email: {
      type: String,
      required: [true, '缺少信箱欄位'],
      // 不可重複，預設只能放true或false，除非使用套件
      unique: '信箱重複',
      validate: {
      // 驗證function
      validator(value){
        return isEmail(value)
      },
      // 錯誤訊息
      message: '信箱格式錯誤'
    }
  }
)

// 建立model
// mongoose.model(collection名稱, Schema)
// collection名稱必須是複數，結尾加s
const users = mongoose.model('users', userSchema)

export default {
  users
}
