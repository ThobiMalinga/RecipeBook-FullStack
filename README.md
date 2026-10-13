# RecipeBook Full Stack

A recipe book web app with an Angular frontend and an ASP.NET Core Web API backend. You can browse, add, edit and delete recipes, and keep a shopping cart.

| Folder | Stack | What it does |
|---|---|---|
| [`RecipeAPI/`](RecipeAPI) | ASP.NET Core 8 Web API, Entity Framework Core, SQL Server | REST API for recipes and the cart |
| [`RecipeBook/`](RecipeBook) | Angular 19 | The web frontend, which calls the API |

```
Browser ──► RecipeBook (Angular, :4200) ──► RecipeAPI (:5241) ──► SQL Server
```

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20 or 22 LTS
- SQL Server (SQL Server Express is fine)

## Getting started

```bash
git clone https://github.com/ThobiMalinga/RecipeBook-FullStack.git
cd RecipeBook-FullStack
```

### 1. Set up the database

The connection string is in `RecipeAPI/RecipeAPI/appsettings.json` under `ConnectionStrings:DefaultConnection`. It currently points to a local SQL Server Express instance, so change the `Data Source` to your own server.

Then create the database and the `Recipes` and `Carts` tables by applying the Entity Framework migrations:

```bash
dotnet tool restore
cd RecipeAPI/RecipeAPI
dotnet dotnet-ef database update
```

`dotnet tool restore` installs the EF Core CLI at the version pinned in `dotnet-tools.json`, so nothing needs installing globally. If the database doesn't exist yet, `database update` creates it.

If you change the models later, add a new migration with `dotnet dotnet-ef migrations add <Name>`, then run `database update` again.

### 2. Run the API

```bash
cd RecipeAPI/RecipeAPI
dotnet run
```

The API runs at `http://localhost:5241`, with Swagger UI at **http://localhost:5241/swagger**.

### 3. Run the frontend

In a second terminal:

```bash
cd RecipeBook
npm install
npm start
```

Then open **http://localhost:4200**.

The frontend expects the API at `http://localhost:5241`. If you change the API's port, update `baseUrl` in `src/app/services/recipe.service.ts` and `src/app/services/cart.service.ts`.

## API endpoints

### Recipes: `/api/Recipe`

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/Recipe` | List all recipes |
| `GET` | `/api/Recipe/{id}` | Get one recipe |
| `POST` | `/api/Recipe` | Create a recipe |
| `PUT` | `/api/Recipe/{id}` | Replace a recipe |
| `PATCH` | `/api/Recipe/{id}` | Update only the fields you send |
| `DELETE` | `/api/Recipe/{id}` | Delete a recipe |

### Cart: `/api/Cart`

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/Cart` | List cart items |
| `POST` | `/api/Cart` | Add an item to the cart |
| `PUT` | `/api/Cart/{id}` | Update an item's quantity |
| `DELETE` | `/api/Cart/{id}` | Remove an item |

## Frontend pages

| Route | Page |
|---|---|
| `/recipes` | Recipe list (the home page) |
| `/add-recipe` | Add a new recipe |
| `/recipes/:id/edit` | Edit a recipe |
| `/cart` | Shopping cart |
| `/login`, `/register` | Login and registration pages |

## Project history

This repo combines two earlier repos, with their full commit history kept:

- [ThobiMalinga/RecipeAPI](https://github.com/ThobiMalinga/RecipeAPI) → `RecipeAPI/`
- [ThobiMalinga/RecipeBook_Angular](https://github.com/ThobiMalinga/RecipeBook_Angular) → `RecipeBook/`
