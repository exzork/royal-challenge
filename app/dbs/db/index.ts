import * as pc from './node_modules/.prisma/client'
export type db_type = pc.PrismaClient
export const db = new pc.PrismaClient() as unknown as pc.PrismaClient
export const raw = pc.Prisma.raw

if (process.send && process.connected) {
  ;(BigInt as any).prototype.toJSON = function () {
    return this.toString()
  }

  const models = {} as Record<string, any>; 
  const dmmf = (pc as any).dmmf; 
  if (dmmf.datamodel) {
    for (let i of dmmf.datamodel.models) {
      models[i.name] = i;
    }
  }
  db.$connect()
    .catch((e) => {
      if (process.send) {
        process.send({ event: 'killed', reason: e.message })
      }
    })
    .then(() => {
      if (process.send) {
        process.send({ event: 'ready' })
      }
      process.on('message', async (data: any) => {
        if (process.send) {
          if (data.id && data.action) {
            if (data.action === 'definition') {
              const rels:any = {}
              const columns:any = {}
              const t = models[data.table]

              let pk = []

              if (t) {
                pk = t.fields.filter((e:any) => e.isId)

                for (let f of t.fields) {
                  if (f.kind === 'scalar') {
                    columns[f.name] = {
                      name: f.name,
                      type: convertDBType(f.type),
                      pk: pk.length > 0 ? pk[0].name === f.name : false,
                      nullable: f.isNullable,
                    }
                  } else if (f.kind === 'object') {
                    const rel = models[f.type].fields.filter(
                      (e:any) => e.relationName === f.relationName
                    )[0]
                    if (f.relationToFields.length > 0 
                        && f.relationFromFields.length > 0) {
                      rels[f.name] = {
                        relation: f.isList
                          ? 'Model.HasManyRelation'
                          : 'Model.BelongsToOneRelation',
                        modelClass: f.type,
                        join: {
                          from: `${data.table}.${f.relationFromFields[0]}`,
                          to: `${f.type}.${f.relationToFields[0]}`,
                        }
                      };
                    } else if (rel) {
                      rels[f.name] = {
                        relation: f.isList
                          ? 'Model.HasManyRelation'
                          : 'Model.BelongsToOneRelation',
                        modelClass: f.type,
                        join: {
                          from: `${f.type}.${rel.relationToFields[0]}`,
                          to: `${rel.type}.${rel.relationFromFields[0]}`,
                        },
                      };
                    }
                  }
                }
              }

              process.send({
                id: data.id,
                value: { 
                  pk: pk.length > 0 ? pk[0].name : false,
                  db: {
                    name: data.table,
                  },
                  columns, 
                  rels,
                  t
                }
              })
            }
            if (typeof (db as any)[data.table] === 'function') {
              if (data.table.startsWith('$query')) {
                let q = data.params.shift()
                if (!!q.strings) q = q.strings
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
                    reason: e.toString(),
                    failedQuery: q,
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
                    reason: e.toString(),
                    failedQuery: data,
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
                reason: e.toString(),
                failedQuery: data,
              })
            }
          }
        }
      })
    })
}
    

const convertDBType = (type: any) => {
  switch (type) {
    case 'Int':
    case 'BigInt':
    case 'Float':
    case 'Decimal':
      return 'number'
    case 'Boolean':
      return 'boolean'
    case 'String':
      return 'string'
    case 'Date':
    case 'date':
      return 'date'
    case 'DateTime':
      return 'date'
    case 'Json':
      return 'object'
  }

  console.log(`Failed to convert DB Type: ${type} `)
  return ''
}

