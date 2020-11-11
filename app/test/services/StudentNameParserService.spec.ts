import { StudentNameParserService } from '../../src/services/StudentNameParserService'
import { expect } from 'chai'

// TEST CONFIG
type TestInput = {
  value: string
  expected: string[]
}

const INPUTS: TestInput[] = [
  {
    value: `Alfonso Godinez Godinez 7:06
    Presente
    
    Sergio Alberto Fuentes Falcon 7:06
    Presente
    
    Juan Daniel Torres Vera 7:06
    Presente
    
    María del Carmen Reyes Rocha 7:06
    Presente
    
    Angel Ricardo Ramírez de la Torre 7:07
    Presente
    
    Diego Valadez 7:08
    Presente`,
    expected: [
      'Alfonso Godinez Godinez',      
      'Sergio Alberto Fuentes Falcon',      
      'Juan Daniel Torres Vera',      
      'María del Carmen Reyes Rocha',      
      'Angel Ricardo Ramírez de la Torre',      
      'Diego Valadez'      
      ]
  },
  {
    value: `CRISTOFER GERARDO TOSTADO LOPEZ 7:10
    Presente
    
    Leslie Karen Davila Gallegos 7:10
    Presente
    
    Diego Lopez 7:12
    Presente
    
    Cecilia Ponce 7:12
    Presente
    
    David Trinidad Becerra Lozano 7:15
    Presente
    
    Faviola Cruz Duran Ortega 7:17
    Presente`,
    expected: [
      'CRISTOFER GERARDO TOSTADO LOPEZ',
      'Leslie Karen Davila Gallegos',
      'Diego Lopez',
      'Cecilia Ponce',
      'David Trinidad Becerra Lozano',
      'Faviola Cruz Duran Ortega'
    ]
  }
]

// TEST COMPONENT
describe('Services::StudentNameParserService', () => {
  let test_index = 1
  for(const CURRENT_INPUT  of INPUTS) {
    it(`Parse test #${ test_index++ }`, () => {
      const service = new StudentNameParserService(CURRENT_INPUT.value)
      const service_output = service.invoke()
      expect(service_output.names).to.be.eql(CURRENT_INPUT.expected)
    })
  }
})
