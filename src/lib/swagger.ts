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
                "summary": "Get all pricing profiles",
                "description": "Retrieve a list of all pricing profiles, including their price adjustments.",
                "responses": {
                  "200": {
                    "description": "A list of pricing profiles.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": { "type": "string" },
                              "title": { "type": "string" },
                              "priceAdjustments": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "id": { "type": "string" },
                                    "title": { "type": "string" },
                                    "productId": { "type": "string" },
                                    "product": {
                                      "type": "object",
                                      "properties": {
                                        "id": { "type": "string" },
                                        "title": { "type": "string" }
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
                "summary": "Create a new pricing profile",
                "description": "Add a new pricing profile with associated price adjustments.",
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "title": { "type": "string" },
                          "expiry": { "type": "string", "format": "date-time" },
                          "adjustments": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "title": { "type": "string" },
                                "productId": { "type": "string" }
                              }
                            }
                          }
                        },
                        "required": ["title", "adjustments"]
                      }
                    }
                  }
                },
                "responses": {
                  "201": {
                    "description": "The newly created pricing profile.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "id": { "type": "string" },
                            "title": { "type": "string" },
                            "expiry": { "type": "string", "format": "date-time" }
                          }
                        }
                      }
                    }
                  },
                  "400": {
                    "description": "Invalid input."
                  }
                }
              }
            },
            "/api/apply-adjustments": {
              "post": {
                "summary": "Apply a price adjustment to a product",
                "description": "Calculates and applies a price adjustment to a product within a pricing profile. Ensures the resulting price is valid and creates an adjustment entry in the database.",
                "tags": ["Price Adjustment"],
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "type": {
                            "type": "string",
                            "enum": ["fixed", "dynamic"],
                            "description": "Type of adjustment. 'fixed' for a fixed amount, 'dynamic' for a percentage adjustment."
                          },
                          "isIncrement": {
                            "type": "boolean",
                            "description": "True if the adjustment increases the price, false if it decreases the price."
                          },
                          "value": {
                            "type": "string",
                            "format": "decimal",
                            "description": "The adjustment value. If 'fixed', it's a currency value. If 'dynamic', it's a percentage."
                          },
                          "productId": {
                            "type": "string",
                            "description": "The ID of the product being adjusted."
                          },
                          "pricingProfileId": {
                            "type": "string",
                            "description": "The ID of the pricing profile to which the adjustment belongs."
                          }
                        },
                        "required": ["type", "isIncrement", "value", "productId", "pricingProfileId"]
                      }
                    }
                  }
                },
                "responses": {
                  "201": {
                    "description": "Adjustment successfully applied.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "The ID of the newly created price adjustment."
                            },
                            "type": {
                              "type": "string",
                              "description": "The type of adjustment (fixed or dynamic)."
                            },
                            "isIncrement": {
                              "type": "boolean",
                              "description": "Whether the adjustment increased the price."
                            },
                            "value": {
                              "type": "string",
                              "format": "decimal",
                              "description": "The adjustment value applied."
                            },
                            "productId": {
                              "type": "string",
                              "description": "The ID of the adjusted product."
                            },
                            "pricingProfileId": {
                              "type": "string",
                              "description": "The ID of the pricing profile to which the adjustment belongs."
                            }
                          }
                        }
                      }
                    }
                  },
                  "400": {
                    "description": "Invalid request. Example: The adjustment value or type is invalid.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "error": {
                              "type": "string",
                              "description": "Error message describing why the request is invalid."
                            }
                          }
                        }
                      }
                    }
                  },
                  "404": {
                    "description": "Product not found.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "error": {
                              "type": "string",
                              "description": "Error message describing the missing product."
                            }
                          }
                        }
                      }
                    }
                  },
                  "422": {
                    "description": "The adjustment would result in a negative price.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "error": {
                              "type": "string",
                              "description": "Error message describing why the price adjustment is invalid."
                            }
                          }
                        }
                      }
                    }
                  },
                  "500": {
                    "description": "Unexpected server error.",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "error": {
                              "type": "string",
                              "description": "Error message for debugging purposes."
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
	},
	  apis: ['../app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
