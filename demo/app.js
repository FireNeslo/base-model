import {Demo} from "./models"
import cors from "cors"
import {json} from "body-parser"
import {Router, default as express} from "express"

export default express()
  .use(cors())
  .use(json())
  .use('/demos', Router()
    .get('/', (req, res, next) => {
      next(null, req.body = Demo.where(JSON.parse(req.query.query)))
    })
    .post('/', (req, res, next) => {
      next(null, req.body = Demo.create(req.body))
    })
    .get('/:id', (req, res, next) => {
      next(null, req.body = Demo.find(req.params.id))
    })
    .put('/:id', (req, res, next) => {
      next(null, req.body = Demo.find(req.params.id).then(demo => {
        return demo.update(req.body)
      }))
    })
    .patch('/:id', (req, res, next) => {
      next(null, req.body = Demo.update(req.params.id, req.body))
    })
    .delete('/:id', (req, res, next) => {
      next(null, req.body = Demo.destroy(req.params.id))
    }))
  .use((req, res) => {
    Promise.resolve(req.body)
      .then(data => res.json(data))
      .catch(error => {
        console.error(error.stack || error)
        res.status(500).json({stack: error.stack})
      })
  })
