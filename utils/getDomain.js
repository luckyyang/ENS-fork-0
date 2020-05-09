const data = require('./Alexa_top_3000')
const util = require('util')

let result = [];

data.map(domainObj => {
  let subdomain = domainObj.domain.split('.')[0]
  result.push(subdomain)
})

result = result.filter((item, index, arr) => arr.indexOf(item, 0) === index);

result.map(domain=>console.log(domain))