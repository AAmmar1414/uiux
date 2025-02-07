export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-20'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET="production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID=="3uzipn5o",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const _AUTH_TOKEN= assertValue(
  process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN="skruz0xMF3Uh9MJYf2hQwTQgndfO2L9g1MVzbaULK5QiyYypLgSUHNxkqHKX3zvYZDWTH5U1qA8xcsCL6bchGdSDkafPS9pk3AN6RT8HhItif4f2eVcsDTUqjO8u0bSmMdRPrOl9wtI7vRstHrYzcYeiLy86pOlPz7t1QhP68FLv5N9R4Cox",
  'Missing environment variable:NEXT_PUBLIC_SANITY_AUTH_TOKEN '
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
