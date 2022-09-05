import * as pc from './node_modules/.prisma/client'
export type db_type = pc.PrismaClient
export const db = new pc.PrismaClient() as unknown as pc.PrismaClient

if (process.send && process.connected) {
  ;(BigInt as any).prototype.toJSON = function () {
    return this.toString()
  }

  db.$connect().then(() => {
    if (process.send) {
      process.send({ event: 'ready' })
    }
    process.on('message', async (data: any) => {
      if (process.send) {
        if (data.id) {
          if (typeof (db as any)[data.table] === 'function') {
            if (data.table.startsWith('$query')) {
              const q = data.params.shift()
              q.sql = true
              Object.freeze(q)

              try {
                let val = await (db as any)[data.table](q, ...data.params)
                process.send({
                  id: data.id,
                  value: await val,
                })
              } catch (e) {
                process.send({
                  id: data.id,
                  event: 'error',
                  reason: e,
                  failedQuery: q
                })
              }
            } else {
              try {
                const val = await (db as any)[data.table](...data.params)
                process.send({
                  id: data.id,
                  value: val,
                })
              } catch (e) {
                process.send({
                  id: data.id,
                  event: 'error',
                  reason: e,
                  failedQuery: data
                })
              }
            }
            return
          }
          try {
            const val = await (db as any)[data.table][data.action](
              ...data.params
            )

            process.send({
              id: data.id,
              event: 'result',
              value: val,
            })
          } catch (e) {
            process.send({
              id: data.id,
              event: 'error',
              reason: e,
              failedQuery: data
            })
          }
        }
      }
    })
  })
}
