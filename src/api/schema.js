import { buildSchema } from "graphql";

export const schema = buildSchema(`
	type Product {
		id: ID!
		name: String!
		slug: String!
		description: String!
		status: ActiveStatus!
		price: [ProductPrice]
		brands: [Brand]
		main_image: MainImage
	}

	type ProductPrice {
		amount: Int!
		currency: String
		includes_tax: Boolean!
	}

	type MainImage {
		file_name: String
		href: String
	}

	enum ActiveStatus {
		draft
		live
	}

	type Brand {
		id: ID!
		type: String!
		name: String!
		slug: String!
		description: String
		status: ActiveStatus!
		products: [Product]
	}

	type Collection {
		id: ID!
		type: String!
		status: ActiveStatus
		name: String
		slug: String
		description: String
	}

	type Category {
		id: ID!
		type: String!
		status: ActiveStatus
		name: String
		slug: String
		description: String
	}

	type Query {
		products: [Product]
		product(id: ID!): Product
		brands: [Brand]
		brand(id: ID!): Brand
		collections: [Collection]
		collection(id: ID!): Collection
		categories: [Category]
		category(id: ID!): Category
	}
`);
