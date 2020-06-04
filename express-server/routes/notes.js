const router = require('express').Router()
const axios = require('axios')

// define the default route that fetches all of our notes
router.get('/', async function (req, res) {

    // data the conserves our API quota for development
    // const placeholderData = [
    //     {
    //         "_id": "database1591127768852",
    //         "note": "Hello",
    //         "_createdOn": "2020-06-02T19:56:08.852Z",
    //         "_lastModifiedOn": "2020-06-02T19:56:08.852Z"
    //     },
    //     {
    //         "_id": "database1591134992139",
    //         "note": "New note",
    //         "_createdOn": "2020-06-02T21:56:32.139Z",
    //         "_lastModifiedOn": "2020-06-02T21:56:32.139Z"
    //     }
    // ]

    try {
        // add api call
        const { data } = await axios({
            method: 'GET',
            url: "https://fairestdb.p.rapidapi.com/notes/note",
            headers: {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "useQueryString": true
            }
        })

        res.json({ notes: data })
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

router.post('/add', async function (req, res) {
    // extract note text from request body
    const { note } = req.body

    const data = {
        note
    }

    console.log(note)

    try {
        // add api call
        await axios({
            method: 'POST',
            url: "https://fairestdb.p.rapidapi.com/notes/note",
            data,
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "useQueryString": true
            }
        })
        res.json({
            message: 'Note added'
        })
    } catch (e) {
        console.log(e)
        res.status(500).send("Error.")
    }
})

router.post('/delete', async function (req, res) {
    // extract the note id to delete from request body
    const { noteId } = req.body

    console.log(noteId)

    try {
        // add api call

        res.send('Note deleted')
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

module.exports = router