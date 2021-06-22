const { expect } = require('chai');
const { describe, it } = require('mocha');
const { buildSchema, graphqlSync } = require("graphql");
const sdlString = require('../schema.graphql')
const graphqlSchemaObj = buildSchema(sdlString);

function queryPeople(introspectionQuery) {
  const result = graphqlSync(graphqlSchemaObj, introspectionQuery);
  expect(Object.keys(result)).to.deep.equal(['data']);
  // console.log("=====Result====")
  // console.log(result);
  return result.data;
}

describe('All People Introspection Tests', () => {
  describe('Basic Introspection', () => {
    it('Allows querying the schema for types', () => {
      const data = queryPeople(`
        {
          __schema {
            types {
              name
            }
          }
        }
      `);
      expect(data).to.not.null;
      // Include all types used by All People schema, introspection types and
      // standard directives. For example, `Boolean` is used in `@skip`,
      // `@include` and also inside introspection types.
      expect(data).to.deep.equal({
        __schema: {
          types: [
            { "name": "Film" },
            { "name": "String" },
            { "name": "Int" },
            { "name": "ID" },
            { "name": "PeopleFilmsEdge" },
            { "name": "PeopleFilmsConnection" },
            { "name": "Person" },
            { "name": "AllPeople" },
            { "name": "Review" },
            { "name": "AllReviews" },
            { "name": "Query" },
            { "name": "Mutation" },
            { "name": "ReviewInput" },
            { "name": "Boolean" },
            { "name": "__Schema" },
            { "name": "__Type" },
            { "name": "__TypeKind" },
            { "name": "__Field" },
            { "name": "__InputValue" },
            { "name": "__EnumValue" },
            { "name": "__Directive" },
            { "name": "__DirectiveLocation" }
          ],
        },
      });
    });

    it('Allows querying the schema for query type', () => {
      const data = queryPeople(`
        {
          __schema {
            queryType {
              name
            }
          }
        }
      `);

      expect(data).to.deep.equal({
        __schema: {
          queryType: {
            name: 'Query',
          },
        },
      });
    });

    it('Allows querying the schema for a specific type', () => {
      const data = queryPeople(`
        {
          __type(name: "Person") {
            name
          }
        }
      `);

      expect(data).to.deep.equal({
        __type: {
          name: 'Person',
        },
      });
    });

    it('Allows querying the schema for an object kind', () => {
      const data = queryPeople(`
        {
          __type(name: "Person") {
            name
            kind
          }
        }
      `);

      expect(data).to.deep.equal({
        __type: {
          name: 'Person',
          kind: 'OBJECT',
        },
      });
    });

    it('Allows querying the schema for nested object fields', () => {
      const data = queryPeople(`
        {
          __type(name: "Person") {
            name
            fields {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
        }
      `);

      expect(data).to.deep.equal(
        {
          "__type": {
            "name": "Person",
            "fields": [
              {
                "name": "id",
                "type": {
                  "name": null,
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "ID",
                    "kind": "SCALAR"
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "birthYear",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "eyeColor",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "gender",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "hairColor",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "height",
                "type": {
                  "name": "Int",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "mass",
                "type": {
                  "name": "Int",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "skinColor",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "created",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "edited",
                "type": {
                  "name": "String",
                  "kind": "SCALAR",
                  "ofType": null
                }
              },
              {
                "name": "filmConnection",
                "type": {
                  "name": "PeopleFilmsConnection",
                  "kind": "OBJECT",
                  "ofType": null
                }
              }
            ]
          }
        }
      );
    });

  });
});
