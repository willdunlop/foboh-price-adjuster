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
				post: {
					summary: "Filter and search products",
					description:
						"This endpoint allows filtering and searching for products based on category, segment, brand, and search terms (title or SKU code).",
					tags: ["Products"],
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										search: {
											type: "string",
											description:
												"Search term to filter by title or SKU code.",
										},
										category: {
											type: "string",
											description:
												"Category to filter products.",
										},
										segment: {
											type: "string",
											description:
												"Segment to filter products.",
										},
										brand: {
											type: "string",
											description:
												"Brand to filter products.",
										},
									},
									example: {
										search: "Product A",
										category: "Liquor",
										segment: "Luxury",
										brand: "High Garden",
									},
								},
							},
						},
					},
					responses: {
						"200": {
							description:
								"Successful response with filtered products.",
							content: {
								"application/json": {
									schema: {
										type: "array",
										items: {
											type: "object",
											properties: {
												id: {
													type: "string",
													description: "Product ID.",
												},
												title: {
													type: "string",
													description:
														"Product title.",
												},
												skuCode: {
													type: "string",
													description: "SKU code.",
												},
												category: {
													type: "string",
													description:
														"Product category.",
												},
												segment: {
													type: "string",
													description:
														"Product segment.",
												},
												brand: {
													type: "string",
													description:
														"Product brand.",
												},
											},
										},
									},
									example: [
										{
											id: "1",
											title: "Product A",
											skuCode: "SKU123",
											category: "Liquor",
											segment: "Luxury",
											brand: "High Garden",
										},
									],
								},
							},
						},
						"400": {
							description:
								"Bad request, e.g., when 'search' is not a string.",
							content: {
								"application/json": {
									schema: {
										type: "object",
										properties: {
											error: {
												type: "string",
												example:
													"Search must be a string",
											},
										},
									},
								},
							},
						},
						"500": {
							description: "Internal server error.",
							content: {
								"application/json": {
									schema: {
										type: "object",
										properties: {
											error: {
												type: "string",
												example:
													"Failed to fetch products. Please try again.",
											},
										},
									},
								},
							},
						},
					},
				},
			},
			"/api/pricing-profiles": {
				get: {
					summary: "Get Pricing Profiles",
          tags: ["Pricing Profiles"],
					description:
						"Fetch all pricing profiles along with their price adjustments and associated products.",
					responses: {
						"200": {
							description:
								"A list of pricing profiles with adjustments.",
							content: {
								"application/json": {
									schema: {
										type: "array",
										items: {
											type: "object",
											properties: {
												id: {
													type: "string",
													format: "uuid",
												},
												title: { type: "string" },
												adjustmentMode: {
													type: "string",
													enum: [
														"increase",
														"decrease",
													],
												},
												adjustmentType: {
													type: "string",
													enum: ["fixed", "dynamic"],
												},
												priceAdjustments: {
													type: "array",
													items: {
														type: "object",
														properties: {
															productId: {
																type: "string",
																format: "uuid",
															},
															value: {
																type: "string",
															},
															product: {
																type: "object",
																properties: {
																	id: {
																		type: "string",
																		format: "uuid",
																	},
																	title: {
																		type: "string",
																	},
																	skuCode: {
																		type: "string",
																	},
																	brand: {
																		type: "string",
																	},
																	category: {
																		type: "string",
																	},
																	subCategory:
																		{
																			type: "string",
																		},
																	segment: {
																		type: "string",
																	},
																	globalPrice:
																		{
																			type: "string",
																			format: "decimal",
																		},
																},
															},
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
				post: {
					summary: "Create or Update a Pricing Profile",
          tags: ["Pricing Profiles"],
					description:
						"Create a new pricing profile or update an existing one based on the provided ID.",
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "string",
											format: "uuid",
											nullable: true,
										},
										title: { type: "string" },
										adjustmentMode: {
											type: "string",
											enum: ["increase", "decrease"],
										},
										adjustmentType: {
											type: "string",
											enum: ["fixed", "dynamic"],
										},
										adjustments: {
											type: "array",
											items: {
												type: "object",
												properties: {
													productId: {
														type: "string",
														format: "uuid",
													},
													value: { type: "string" },
												},
											},
										},
									},
									required: [
										"title",
										"adjustmentMode",
										"adjustmentType",
										"adjustments",
									],
								},
							},
						},
					},
					responses: {
						"201": {
							description:
								"The newly created or updated pricing profile.",
							content: {
								"application/json": {
									schema: {
										type: "object",
										properties: {
											id: {
												type: "string",
												format: "uuid",
											},
											title: { type: "string" },
											adjustmentMode: {
												type: "string",
												enum: ["increase", "decrease"],
											},
											adjustmentType: {
												type: "string",
												enum: ["fixed", "dynamic"],
											},
											priceAdjustments: {
												type: "array",
												items: {
													type: "object",
													properties: {
														productId: {
															type: "string",
															format: "uuid",
														},
														value: {
															type: "string",
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
	apis: ["../app/api/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
