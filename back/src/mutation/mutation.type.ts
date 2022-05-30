export interface Annotation {
  gene?: string,
  mutation?: string,
  pathogenicity: number,
}

export interface Support {
  filters: string[],
  source: string,
  sample: Sample,
}

export interface Sample {
  name: string,
  positiveCount: number,
  count: number,
}

export interface Frequency {
  frequency: number,
  population: string,
  source: string,
}

export enum ValidationState {
  NOT_VALIDATED = 'NOT_VALIDATED',
  VALIDATED = 'VALIDATED',
  FALSE_DETECTION = 'FALSE_DETECTION',
}

export interface Mutation {
  annotations: Annotation[],
  coordinates: {
    region: string,
    position: number,
  },
  id?: string,
  maxFrequency?: Frequency,
  state: ValidationState,
  supports: Support[]
}