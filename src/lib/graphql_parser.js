import { parse, buildSchema } from 'graphql'

export class GraphqlSchema {
  constructor(doc) {
    // this.doc = parse(doc, {noLocation: true})
    this.doc = parse(doc)
    // TODO: validation
    try {
      this._schema = buildSchema(doc)
    } catch (e) {
      alert('failed to read schema', e)
    }
  }

  getSchema () {
    return this._schema
  }

  getTypes () {
    // TODO: 他にも除外するキーワードがある
    const definitions = this.doc.definitions.filter(d => d.name.value !== 'Query')
    return definitions
      .map(d => new graphqlSchemaType(d))
      .sort(t => t.getName)
  }

  getQueryFields () {
    const definitions = this.doc.definitions.filter(d => d.name.value === 'Query')
    const fields = definitions.map(q => q.fields)
    return Array.prototype.concat.apply([], fields)  // flatten
      .map(f => new GraphqlSchemaQueryField(f, this.getTypes()))
      .sort(f => f.getName)
  }
}

class graphqlSchemaType {
  constructor(definition) {
    this.definition = definition
  }

  getName () {
    return this.definition.name.value
  }
}

class GraphqlSchemaQueryField {
  constructor(field, types) {
    this.field = field
    this.types = types
  }

  getName () {
    return this.field.name.value
  }

  getArgNames () {
    return this.field.arguments.map(arg => arg.name.value)
  }

  getArgs () {
    return this.field.arguments.map(arg => {
      return arg.type.kind === 'NonNullType' ? 
        {
          name: arg.name.value,
          type: arg.type.type.name.value,
          required: true,
        }
        :
        {
          name: arg.name.value,
          type: arg.type.name.value,
          required: false,
        }
    })
  }

  getType () {
    return this.field.type.name.value
  }

  getQuery () {
    return `{
  ${this.getName()} (
    ${this.getArgs().map(arg => `${arg.name}: `).join(",\n    ")}
  ) {

  }  
}`
  }
}