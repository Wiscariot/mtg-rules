export interface Rules {
  chapters:Chapter[],
}

export type Chapter = {
  title: String
  rules: string[],
}

