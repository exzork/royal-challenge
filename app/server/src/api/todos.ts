import { API } from 'server-web'

export default [
  '/api/todos/:id?',
  async ({ body, reply, req }) => {
    const { method } = req
    const data = req.body
    const id = Number(req.params.id)
    switch (method) {
      case 'GET':
        isNaN(id) ? reply.send({todos:await db.todos.findMany()}) : reply.send({todo:await db.todos.findUnique({where:{id}})})
        break
      case 'POST':
        reply.send({todo:await db.todos.create({data})})
        break
      case 'PUT':
        delete data.id
        reply.send({todo:await db.todos.update({where:{id},data})})
        break
      case 'DELETE':
        reply.send({todo:await db.todos.delete({where:{id}})})
        break
    }
  },
] as API
      