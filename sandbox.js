// Container
const Container = function(x) {
  this.__value = x
}

Container.of = function(x) {
  return new Container(x)
}

Container.prototype.map = function (func) {
  return Container.of(func(this.__value))
}

const three = Container
  .of('test')
  .map(value => value.toUpperCase())
  .map(value => value[0])

// Maybe
const Maybe = function (x) {
  this.__value = x
}

Maybe.of = function (x) {
  return new Maybe(x)
}

Maybe.prototype.isNothing = function () {
  return this.__value === undefined || this.__value === null
}

Maybe.prototype.map = function (func) {
  return this.isNothing() ? Maybe.of(null) : Maybe(func(this.__value))
}
