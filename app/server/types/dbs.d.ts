import type _dbs from 'dbs'
import type APIQuery from '../src/query'

declare global {
  type DBItem<T extends { findFirst: any }> = Exclude<
    Awaited<ReturnType<T['findFirst']>>,
    null
  >
  
  const dbs: typeof _dbs
  const db: typeof _dbs.db & { 
    query: typeof APIQuery['db']
    definition: (table: string) => Promise<any>
  }
}