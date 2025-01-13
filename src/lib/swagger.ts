import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "FOBOH Pricing Challenge API",
			version: "1.0.0",
			description: "API documentation for the FOBOH pricing challenge",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Local development server",
			},
		],
        paths: {
            "/api/products": {
              "get": {
                "summary": "Get all products",
                "description": "Retrieve a list of all products with optional filters.",
                "parameters": [
                  {
                    "in": "query",
                    "name": "category",
                    "schema": {
                      "type": "string"
                    },
                    "description": "Filter products by category."
                  },
                  {
                    "in": "query",
                    "name": "subCategory",
                    "schema": {
                      "type": "string"
                    },
                    "description": "Filter products by subcategory."
                  },
                  {
                    "in": "query",
                    "name": "brand",
                    "schema": {
                      "type": "string"
                    },
                    "description": "Filter products by brand."
                  }
                ],
                "responses": {
                  "200": {
                    "description": "A list of products.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": { "type": "string" },
                              "title": { "type": "string" },
                              "skuCode": { "type": "string" },
                              "brand": { "type": "string" },
                              "category": { "type": "string" },
                              "subCategory": { "type": "string" },
                              "segment": { "type": "string" },
                              "globalPrice": { "type": "number", "format": "float" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "/api/pricing-profiles": {
              "get": {
                "summary": "Get Pricing Profiles",
                "description": "Fetch all pricing profiles along with their price adjustments and associated products.",
                "responses": {
                  "200": {
                    "description": "A list of pricing profiles with adjustments.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": { "type": "string", "format": "uuid" },
                              "title": { "type": "string" },
                              "adjustmentMode": { "type": "string", "enum": ["increase", "decrease"] },
                              "adjustmentType": { "type": "string", "enum": ["fixed", "dynamic"] },
                              "priceAdjustments": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "productId": { "type": "string", "format": "uuid" },
                                    "value": { "type": "string" },
                                    "product": {
                                      "type": "object",
                                      "properties": {
                                        "id": { "type": "string", "format": "uuid" },
                                        "title": { "type": "string" },
                                        "skuCode": { "type": "string" },
                                        "brand": { "type": "string" },
                                        "category": { "type": "string" },
                                        "subCategory": { "type": "string" },
                                        "segment": { "type": "string" },
                                        "globalPrice": { "type": "string", "format": "decimal" }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "post": {
                "summary": "Create or Update a Pricing Profile",
                "description": "Create a new pricing profile or update an existing one based on the provided ID.",
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "id": { "type": "string", "format": "uuid", "nullable": true },
                          "title": { "type": "string" },
                          "adjustmentMode": { "type": "string", "enum": ["increase", "decrease"] },
                          "adjustmentType": { "type": "string", "enum": ["fixed", "dynamic"] },
                          "adjustments": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "productId": { "type": "string", "format": "uuid" },
                                "value": { "type": "string" }
                              }
                            }
                          }
                        },
                        "required": ["title", "adjustmentMode", "adjustmentType", "adjustments"]
                      }
                    }
                  }
                },
                "responses": {
                  "201": {
                    "description": "The newly created or updated pricing profile.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "id": { "type": "string", "format": "uuid" },
                            "title": { "type": "string" },
                            "adjustmentMode": { "type": "string", "enum": ["increase", "decrease"] },
                            "adjustmentType": { "type": "string", "enum": ["fixed", "dynamic"] },
                            "priceAdjustments": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "productId": { "type": "string", "format": "uuid" },
                                  "value": { "type": "string" }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }          },
	},
	  apis: ['../app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
