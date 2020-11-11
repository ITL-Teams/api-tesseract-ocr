import { IService } from './IService'

export type ParserOutput = {
  names: string[]
}

enum PARSER_STATES {
  IN_NAME_READING,
  IGNORE,
  NEXT_NAME
}

export class StudentNameParserService implements IService<ParserOutput> {
  private data: string

  constructor(data: string) {
    this.data = data
  }

  public invoke(): ParserOutput {
    const dataTokens = this.data.split(/\s+/)
    const names = this.parseNames(dataTokens)

    return {
      names: names
    }
  }

  private parseNames(dataTokens: string[]): string[] {
    let names: string[] = []
    let parserState: PARSER_STATES = PARSER_STATES.IN_NAME_READING

    let current_name: string = ''
    dataTokens.forEach((token) => {
      parserState = this.parserState(token, parserState)

      if (parserState === PARSER_STATES.IGNORE) return
      if (parserState === PARSER_STATES.NEXT_NAME) {
        current_name = current_name.substring(1)
        names.push(current_name)
        current_name = ''
        return
      }

      current_name = `${current_name} ${token}`
    })

    return names
  }

  private parserState(
    token: string,
    actual_state: PARSER_STATES
  ): PARSER_STATES {
    if (token.includes('7')) return PARSER_STATES.IGNORE

    if (token === 'Presente') return PARSER_STATES.NEXT_NAME

    if (actual_state === PARSER_STATES.NEXT_NAME)
      return PARSER_STATES.IN_NAME_READING

    if (actual_state === PARSER_STATES.IN_NAME_READING) return actual_state

    return PARSER_STATES.IGNORE
  }
}
