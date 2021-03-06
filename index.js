const express = require('express');
const app = express()
const db = require('./database/db')
const cors = require('cors')

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/messages', require('./routes/messages'))
app.use('/api/events', require('./routes/events'))
app.use('/api/payments', require('./routes/payments'))
app.use('/api/chapters', require('./routes/chapters'))
app.use('/api/postings', require('./routes/volunteer'))

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// unnecessary comment

db.initDb((err, db) => {
    if(err) console.log(err)
    else {
        app.listen(PORT, () => {
            console.log(`Now listen on PORT ${PORT}`)
        })
    }
})

