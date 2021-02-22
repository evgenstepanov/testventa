const {Schema, model} = require ('mongoose')

const schema = new Schema ({
  firstDayOfWeek: {type: Date, required: true},
  numberOfWeek: {type: String, required: true},
  userId: {type: String, required: true},
  date: {type: Date, required: true},
  person: {type: String, required: true},
  position: {type: String, required: true},
  report: {type: String, required: true},
  plans: {type: String, required: true},
})

module.exports = model( 'Post', schema)