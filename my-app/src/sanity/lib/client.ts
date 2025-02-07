import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId:"3uzipn5o",
  dataset:"production",
  token:"skruz0xMF3Uh9MJYf2hQwTQgndfO2L9g1MVzbaULK5QiyYypLgSUHNxkqHKX3zvYZDWTH5U1qA8xcsCL6bchGdSDkafPS9pk3AN6RT8HhItif4f2eVcsDTUqjO8u0bSmMdRPrOl9wtI7vRstHrYzcYeiLy86pOlPz7t1QhP68FLv5N9R4Cox",
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
