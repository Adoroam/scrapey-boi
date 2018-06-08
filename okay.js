/*==============================
=========== IMPORTS ============
==============================*/

require('dotenv').config()
const express = require('express')
const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const { urlencoded, json } = require('body-parser')
const jwt = require('jsonwebtoken')

/*==============================
========== CONSTANTS ===========
==============================*/

const app = express()

const { TWITCH_A, TWITCH_B, REDIRECT } = process.env


/*==============================
========== FUNCTIONS ===========
==============================*/


const scrape = async (req, res) => {
  let { url } = req.method === 'POST'
    ? req.body
    : { url: 'https://www.youtube.com/watch?v=eUYMiztBEdY' }
  let html = await axios.get(url).then(d => d.data).catch(err => console.error(err))
  const $ = cheerio.load(html)
  let output = {
    // description: $('#description'),
    desc_links: await $('#description').children('a').map((i, ele) => $(this).attr('href')).toArray()
  }
  // let text = $('.mw-headline').map((i, ele) => $(ele).text()).toArray()

  let test_var = $('#upnext').text()
  console.dir(test_var, {colors: true, depth: 1})

  res.json(output)  
}
const to_index = (req, res) => {
  res.sendFile(__dirname + '/index.html')
}

/*==============================
========== LISTENERS ===========
==============================*/

app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/', to_index)
app.get('/scrape', scrape)
app.post('/scrape', scrape)

app.listen(80, () => console.log('server started'))

/*==============================
=========== EXPORTS ============
==============================*/

module.exports = {}