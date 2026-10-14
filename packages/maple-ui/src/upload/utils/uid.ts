let seed = 0

export function createUploadUid() {
  seed += 1
  return `${Date.now()}-${seed}`
}
