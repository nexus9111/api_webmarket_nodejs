# Documentation de l'api pour IUT

## ✨ Présentation

🇫🇷 Dans le cadre d'un projet au sein de mon IUT informatique, j'ai réalisé cette api pour centraliser et stocker les produits. Chaque groupe de travail est identifié par un owner token qui est défini dans ```/models/productModel.js``` et ```/utils/misc.js``` (pensez a les modifier).

🇺🇸 As part of a project in my computer science IUT, I made this api to centralize and store the products. Each workgroup is identified by an owner token which is defined in ``/models/productModel.js`` and ``/utils/misc.js`` (think to modify them).

### I used my personnal NodeJS API boilerplate that you can find <a href="https://github.com/nexus9111/personal_api_boilerplate">here</a>

## ℹ️ INSTALLATION

```bash
$> cd api_webmarket_nodejs
// edit /models/productModel.js && /utils/misc.js
$> npm i
$> npm start
```

## 💾 TECHNOS

- MongoDB
- NodeJS (express)

## 🔗 ROUTES

### Headers
#### 🟡
```json
{ 
	owner: "<your owner token>",  
	"Content-Type": "application/json"
}
```
#### 🟢 
```json
{ 
	Authorization: "<auth token (have to login)>", 
	owner: "<your owner token>",
	"Content-Type": "application/json"
}
```
### Routes

#### 🟡 [POST] LOGIN

url: 

```
https://localhost:3000/users/login
```
body:

```json
{
	"email": "<your email>",
	"password": "<your password>"
}
```
return:

```json
{
	"success": true,
	"data": {
		"message": "Well loggin",
		"user": {
			"token": {
				"expiration": "<token expiration>",
				"token": "<auth token>"
			},
			"_id": "<user id>",
			"publicId": "<user public id>",
			"username": "<username>",
			"email": "<user email>",
			"role": "user",
			"content": "",
			"__v": 0
		}
	}
}
```


#### 🟡 [POST] Register

url:

```
https://localhost:3000/users/register
```
body:

```json
{
	"email": "<your email>",
	"username": "<your username>",
	"password": "<your password>"
}
```
return:

```json
{
	"success": true,
	"data": {
		"message": "New user added",
		"user": {
			"publicId": "<user public id>", 
			"username": "<username>",
			"email": "<user email>",
			"role": "user",
			"token": {
				"expiration": "current date>"
			},
			"content": "",
			"_id": "<user id>",
			"__v": 0
		}
	}
}
```

#### 🟢 [POST] Edit content

edit email or content

url:

```
https://localhost:3000/users/me
```
body:

```json
{
	"content": { //optional, can be anything you want (json or string)
		mycontent1: "myvalue1",
		mycontent2: "myvalue2",
		...
	},
	"email": "<your email>" //optionnal
}
```
return:

```json
{
	"success": true,
	"data": {
		"message": "New user added",
		"user": {
			"publicId": "<user public id>", 
			"username": "<username>",
			"email": "<user email>",
			"role": "user",
			"token": {
				"expiration": "current date>"
			},
			"content": { //optional
				mycontent1: "myvalue1",
				mycontent2: "myvalue2",
				...
			},
			"_id": "<user id>",
			"__v": 0
		}
	}
}
```

#### 🟡 [GET] Get products

url:

```
https://localhost:3000/products
```

return:

```json
{
	"success": true,
	"data": {
		"message": "Succes get products",
		"products": [
			{
				"_id": "<product id>",
				"content": "<content you save>",
				"image": "<image>", //you imgur image link
				"owner": "<creator public id>",
				"__v": 0
			},
			[...]
		]
	}
}
```

#### 🟡 [GET] Get one product

url:

```
https://localhost:3000/products/<product id>
```

return:

```json
{
	"success": true,
	"data": {
		"message": "Succes get products",
		"product": [
			{
				"_id": "<product id>",
				"content": "<content you save>",
				"image": "https://imgur.com/NMM4RJU.jpg", //you imgur image link
				"owner": "<creator public id>",
				"__v": 0
			}
		]
	}
}
```

#### 🟢 [POST] Create new products

url:

```
https://localhost:3000/products
```
body:

```json
{
	"content": "<product content, can be json, string ...>",
	"image": "<unsplash link find here: https://unsplash.com/>" 
}
```
return:

```json
{
	"success": true,
	"data": {
		"message": "Product save",
		"product": {
			"content": "<your content converted to string>",
			"image": "<product image>",
			"owner": "<owner token>",
			"_id": "<creator public id>",
			"__v": 0
		}
	}
}
```

#### 🟢 [POST] Edit products

url:

```
https://localhost:3000/products/<product id>
```
body:

```json
{
	"content": "<product content, can be json, string ...>",  //optional
	"image": "<unsplash link find here: https://unsplash.com/>"  //optional
}
```
return:

```json
{
	"success": true,
	"data": {
		"message": "Product edited",
		"product": {
			"content": "<your content converted to string>",
			"image": "<product image>",
			"owner": "<owner token>",
			"_id": "<creator public id>",
			"__v": 0
		}
	}
}
```

### 🟢 [DELETE] Delete products

url:

```
https://localhost:3000/products/<product id>
```

return:

```json
{
    "success": true,
    "data": {
        "message": "Product deleted"
    }
}
```
