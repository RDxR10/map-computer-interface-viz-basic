export interface MilitaryBase {
  id: number
  name: string
  state: string
  coordinates: {
    x: number
    y: number
  }
  personnel: number
  description: string
  type: string
}

