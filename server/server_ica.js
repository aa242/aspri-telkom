import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'



dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello, I am  ASN Profiling AI Assistant!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    console.log(prompt)

    const response = await fetch('https://api-staging-ica-telkomai-afardyb6dbdueze9.z01.azurefd.net/app/v1/ask-bot', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": process.env.SERVER_ICA
        },
      body: JSON.stringify({
        username: "demo1",
        message: prompt})
    });

    const jawaban = await response.json();

    console.log(jawaban.data.output)

    res.status(200).send({
      bot: jawaban.data.output
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))