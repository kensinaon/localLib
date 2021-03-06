var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  // return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  var x = moment(this.date_of_death).format('MMMM Do, YYYY').toString();
  var y = moment(this.date_of_birth).format('MMMM Do, YYYY').toString();
  return x;
});

// Virtual for author's Formatted Birth
AuthorSchema
.virtual('the_birth')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do, YYYY').toString();
});

// Virtual for author's Formatted Death
AuthorSchema
.virtual('the_death')
.get(function () {
  return moment(this.date_of_death).format('MMMM Do, YYYY').toString();

});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);