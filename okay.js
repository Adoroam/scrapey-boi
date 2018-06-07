/*==============================
=========== IMPORTS ============
==============================*/
require('dotenv').config()
const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

/*==============================
========== CONSTANTS ===========
==============================*/

const app = express()

/*==============================
========== FUNCTIONS ===========
==============================*/

const scrape = (req, res) => {
  let url = ''
  request(url, (err, resp, html) => {
    if (err) res.send(err)
    let $ = cheerio.load(html)
    let output = {}

  })
}

/*==============================
========== LISTENERS ===========
==============================*/

app.get('/butts', scrape)

app.listen(8080, () => console.log('server started'))

/*==============================
=========== EXPORTS ============
==============================*/

module.exports = {}