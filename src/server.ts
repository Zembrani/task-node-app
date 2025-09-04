import express, { Request, Response, Express } from 'express'
import { taskRouter } from './presentation/routes/tasksRouter'
const app: Express = express()
const port = 3000

app.use(express.json());
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
