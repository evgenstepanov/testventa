const {Schema, model, Types} = require ('mongoose')

const schema = new Schema ({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String},
  surname: {type: String},
  position: {type: String},
  phone: {type: Number},
  patronymic: {type: String},
  date: {type: Date},
  access: {type: Boolean},
  admin: {type: Boolean}
})

module.exports = model( 'User', schema)