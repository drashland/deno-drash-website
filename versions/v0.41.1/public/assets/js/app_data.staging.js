const app_data = {
  "example_code": {
    "/src": {
      "example_code": {
        "contents": "",
        "filename": "example_code",
        "title": "/path/to/your/project/example_code"
      }
    },
    "/src/example_code": {
      "advanced_tutorials": {
        "contents": "",
        "filename": "advanced_tutorials",
        "title": "/path/to/your/project/advanced_tutorials"
      },
      "dependency_management": {
        "contents": "",
        "filename": "dependency_management",
        "title": "/path/to/your/project/dependency_management"
      },
      "tutorials": {
        "contents": "",
        "filename": "tutorials",
        "title": "/path/to/your/project/tutorials"
      },
      "third_party_tutorials": {
        "contents": "",
        "filename": "third_party_tutorials",
        "title": "/path/to/your/project/third_party_tutorials"
      },
      "getting_started": {
        "contents": "",
        "filename": "getting_started",
        "title": "/path/to/your/project/getting_started"
      }
    },
    "/src/example_code/advanced_tutorials": {
      "content_negotiation": {
        "contents": "",
        "filename": "content_negotiation",
        "title": "/path/to/your/project/content_negotiation"
      },
      "creating_a_web_app": {
        "contents": "",
        "filename": "creating_a_web_app",
        "title": "/path/to/your/project/creating_a_web_app"
      },
      "creating_an_api": {
        "contents": "",
        "filename": "creating_an_api",
        "title": "/path/to/your/project/creating_an_api"
      },
      "creating_an_spa": {
        "contents": "",
        "filename": "creating_an_spa",
        "title": "/path/to/your/project/creating_an_spa"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation": {
      "user_profiles": {
        "contents": "",
        "filename": "user_profiles",
        "title": "/path/to/your/project/user_profiles"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles": {
      "part_5": {
        "contents": "",
        "filename": "part_5",
        "title": "/path/to/your/project/part_5"
      },
      "part_2": {
        "contents": "",
        "filename": "part_2",
        "title": "/path/to/your/project/part_2"
      },
      "part_3": {
        "contents": "",
        "filename": "part_3",
        "title": "/path/to/your/project/part_3"
      },
      "part_4": {
        "contents": "",
        "filename": "part_4",
        "title": "/path/to/your/project/part_4"
      },
      "part_1": {
        "contents": "",
        "filename": "part_1",
        "title": "/path/to/your/project/part_1"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_5": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport response from \"./response.ts\";\nDrash.Http.Response = response;\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "user": {
        "contents": "<user>\n\t<alias>{{ alias }}</alias>\n\t<name>{{ name }}</name>\n\t<api_key>**********</api_key>\n\t<api_secret>**********</api_secret>\n</user>\n",
        "extension": "xml",
        "filename": "user.xml",
        "title": "/path/to/your/project/user.xml"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "users_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  public GET() {\n    let userId = this.request.getPathParam(\"id\");\n    let user = this.getUser(userId);\n\n    if (!user) {\n      throw new Drash.Exceptions.HttpException(404);\n    }\n\n    switch (this.request.response_content_type) {\n      case \"text/html\":\n        this.response.body = this.generateHtml(user);\n        break;\n      case \"text/plain\":\n        this.response.body = this.generatePlainText(user);\n        break;\n      case \"application/xml\":\n      case \"text/xml\":\n        this.response.body = this.generateXml(user);\n        break;\n      case \"application/json\":\n      default:\n        this.response.body = this.generateJson(user);\n        break;\n    }\n\n    return this.response;\n  }\n\n  protected getUser(userId) {\n    try {\n      let users = this.readFileContents(\"./users.json\");\n      users = JSON.parse(users);\n      return users[userId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(404, `User with ID \"${userId}\" not found.`);\n    }\n  }\n\n  protected generateHtml(user) {\n    try {\n      let html = this.readFileContents(\"./user.html\");\n      html = html\n        .replace(/\\{\\{ alias \\}\\}/, user.alias)\n        .replace(/\\{\\{ name \\}\\}/, user.name);\n      return html;\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(500, error.message);\n    }\n  }\n\n  protected generateJson(user) {\n    user.api_key = \"**********\";\n    user.api_secret = \"**********\";\n    return user;\n  }\n\n  protected generatePlainText(user) {\n    return `${user.alias}, Name: ${user.name}, API Key: **********, API Secret: **********`;\n  }\n\n  protected generateXml(user) {\n    try {\n      let xml = this.readFileContents(\"./user.xml\");\n      xml = xml\n        .replace(/\\{\\{ alias \\}\\}/, user.alias)\n        .replace(/\\{\\{ name \\}\\}/, user.name);\n      return xml;\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(500, error.message);\n    }\n  }\n\n  protected readFileContents(file: string) {\n    let fileContentsRaw = Deno.readFileSync(file);\n    const decoder = new TextDecoder();\n    let decoded = decoder.decode(fileContentsRaw);\n    return decoded;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tprofile_card.html\n\tusers.json\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "response": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class Response extends Drash.Http.Response {\n  public generateResponse(): any {\n    let contentType = this.headers.get(\"Content-Type\")\n\n    switch (contentType) {\n      case \"application/json\":\n        return JSON.stringify(this.body);\n      case \"application/xml\":\n      case \"text/html\":\n      case \"text/xml\":\n      case \"text/plain\":\n        return this.body;\n    }\n\n    throw new Drash.Exceptions.HttpResponseException(400, `Response Content-Type \"${contentType}\" unknown.`);\n  }\n}\n\n",
        "extension": "ts",
        "filename": "response.ts",
        "language": "typescript",
        "title": "/path/to/your/project/response.ts"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_2": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tusers.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_3": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "users_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  public GET() {\n    let userId = this.request.getPathParam(\"id\");\n    this.response.body = this.getUser(userId);\n    return this.response;\n  }\n\n  protected getUser(userId) {\n    let user = null;\n\n    try {\n      let users = this.readFileContents(\"./users.json\");\n      users = JSON.parse(users);\n      user = users[userId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(400, `Error getting user with ID \"${userId}\". Error: ${error.message}.`);\n    }\n\n    if (!user) {\n      throw new Drash.Exceptions.HttpException(404, `User with ID \"${userId}\" not found.`);\n    }\n\n    return user;\n  }\n\n  protected readFileContents(file: string) {\n    let fileContentsRaw = Deno.readFileSync(file);\n    const decoder = new TextDecoder();\n    let decoded = decoder.decode(fileContentsRaw);\n    return decoded;\n  }\n}\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tusers.json\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_4": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "user": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://images.bewakoof.com/original/avengers-logos-mini-backpack-avl-essential-printed-mini-backpacks-183193-1524728878.jpg\" alt=\"Avengers\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t\t<div class=\"font-bold text-xl my-6\">{{ alias }}</div>\n\t\t\t\t\t<div class=\"mb-6\">\n\t\t\t\t\t\t<div class=\"flex my-2\">\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base font-bold\">Name</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">{{ name }}</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"flex my-2\">\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base font-bold\">API Key</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">**********</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"flex my-2\">\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base font-bold\">API Secret</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"w-1/2\">\n\t\t\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">**********</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#marvel</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "html",
        "filename": "user.html",
        "title": "/path/to/your/project/user.html"
      },
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "users_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  public GET() {\n    let userId = this.request.getPathParam(\"id\");\n    let user = this.getUser(userId);\n\n    switch (this.request.response_content_type) {\n      case \"text/html\":\n        this.response.body = this.generateHtml(user);\n        break;\n      case \"application/json\":\n      default:\n        this.response.body = this.generateJson(user);\n        break;\n    }\n\n    return this.response;\n  }\n\n  protected getUser(userId) {\n    let user = null;\n\n    try {\n      let users = this.readFileContents(\"./users.json\");\n      users = JSON.parse(users);\n      user = users[userId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(400, `Error getting user with ID \"${userId}\". Error: ${error.message}.`);\n    }\n\n    if (!user) {\n      throw new Drash.Exceptions.HttpException(404, `User with ID \"${userId}\" not found.`);\n    }\n\n    return user;\n  }\n\n  protected generateHtml(user) {\n    try {\n      let html = this.readFileContents(\"./user.html\");\n      html = html\n        .replace(/\\{\\{ alias \\}\\}/, user.alias)\n        .replace(/\\{\\{ name \\}\\}/, user.name);\n      return html;\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(500, error.message);\n    }\n  }\n\n  protected generateJson(user) {\n    user.api_key = \"**********\";\n    user.api_secret = \"**********\";\n    return user;\n  }\n\n  protected readFileContents(file: string) {\n    let fileContentsRaw = Deno.readFileSync(file);\n    const decoder = new TextDecoder();\n    let decoded = decoder.decode(fileContentsRaw);\n    return decoded;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tuser.html\n\tusers.json\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/content_negotiation/user_profiles/part_1": {
      "users": {
        "contents": "{\n  \"1\": {\n    \"id\": 1,\n    \"alias\": \"Captain America\",\n    \"name\": \"Steve Rogers\",\n    \"api_key\": \"46096ec9-5bf9-4978-b77b-07018dc32a74\",\n    \"api_secret\": \"1b64d3ac-7e19-4018-ab99-29f50e097f4b\"\n  },\n  \"2\": {\n    \"id\": 2,\n    \"alias\": \"Black Widow\",\n    \"name\": \"Natasha Romanoff\",\n    \"api_key\": \"3d93a3f9-c5ad-439d-bacb-75a9e4fb2b42\",\n    \"api_secret\": \"e5b11faa-629f-4255-bf3a-ee736dc9468d\"\n  },\n  \"3\": {\n    \"id\": 3,\n    \"alias\": \"Thor\",\n    \"name\": \"Thor Odinson\",\n    \"api_key\": \"7442f354-2a89-47ef-a3ce-5a7c68e82157\",\n    \"api_secret\": \"365e362f-fa21-4e5a-bb84-9da76e1c5f49\"\n  }\n}\n",
        "extension": "json",
        "filename": "users.json",
        "title": "/path/to/your/project/users.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tusers.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app": {
      "hello_world": {
        "contents": "",
        "filename": "hello_world",
        "title": "/path/to/your/project/hello_world"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world": {
      "part_2": {
        "contents": "",
        "filename": "part_2",
        "title": "/path/to/your/project/part_2"
      },
      "part_3": {
        "contents": "",
        "filename": "part_3",
        "title": "/path/to/your/project/part_3"
      },
      "part_4": {
        "contents": "",
        "filename": "part_4",
        "title": "/path/to/your/project/part_4"
      },
      "part_1": {
        "contents": "",
        "filename": "part_1",
        "title": "/path/to/your/project/part_1"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_2": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\"><%= body %></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#resources</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs/dejs.ts\";\n\nclass Response extends Drash.Http.Response {\n  public async generateHtmlResponse(): Promise<any> {\n    let rawOutput = await renderFile(Deno.cwd() + \"/index.ejs\", {\n      body: this.body\n    });\n    let html = rawOutput.toString();\n    return html;\n  }\n}\n\nDrash.Http.Response = Response;\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "run": {
        "contents": "deno --allow-net --allow-read app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "txt",
        "filename": "output.txt",
        "title": "/path/to/your/project/output.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_3": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\"><%= body %></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"mb-2\"><strong>POST Response: </strong></p>\n\t\t\t\t\t\t<p id=\"post_message\" class=\"text-grey-darker text-base\">...</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<label class=\"block text-grey-darker text-sm font-bold mb-2\" for=\"name\">Name</label>\n\t\t\t\t\t\t<input class=\"shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline\" id=\"name\" type=\"text\" placeholder=\"Name\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4 text-right\">\n\t\t\t\t\t\t<button class=\"bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full\" style=\"outline: none\" onclick=\"post()\">POST</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#resources</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<script src=\"https://unpkg.com/axios/dist/axios.min.js\"><//script>\n\t\t<script>\n\t\t\tlet post = function() {\n\t\t\t\tlet postBody = {\n\t\t\t\t\tresponse_content_type: \"application/json\",\n\t\t\t\t\tname: document.getElementById(\"name\").value\n\t\t\t\t};\n\t\t\t\taxios.post(\"/\", postBody)\n\t\t\t\t\t.then(function (response) {\n\t\t\t\t\t\tdocument.getElementById(\"post_message\").innerHTML = response.data.body;\n\t\t\t\t\t})\n\t\t\t\t\t.catch(function (error) {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\t\t<//script>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs/dejs.ts\";\n\nclass Response extends Drash.Http.Response {\n  public async generateHtmlResponse(): Promise<any> {\n    let rawOutput = await renderFile(Deno.cwd() + \"/index.ejs\", {\n      body: this.body\n    });\n    let html = rawOutput.toString();\n    return html;\n  }\n}\n\nDrash.Http.Response = Response;\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n  public POST() {\n    this.response.body = \"POST request received!\";\n    let name = this.request.body_parsed.name;\n    if (name) {\n      this.response.body += ` Thanks for the request, ${name}!`;\n    }\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "run": {
        "contents": "deno --allow-net --allow-read app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "txt",
        "filename": "output.txt",
        "title": "/path/to/your/project/output.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_4": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1.0, user-scalable=no\"/>\n\t\t<title>Hello World</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\"><%= body %></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"mb-2\"><strong>POST Response: </strong></p>\n\t\t\t\t\t\t<p id=\"post_message\" class=\"text-grey-darker text-base\">...</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<label class=\"block text-grey-darker text-sm font-bold mb-2\" for=\"name\">Name</label>\n\t\t\t\t\t\t<input class=\"shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline\" id=\"name\" type=\"text\" placeholder=\"Name\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"mb-4 text-right\">\n\t\t\t\t\t\t<button class=\"bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full\" style=\"outline: none\" onclick=\"post()\">POST</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#resources</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<script src=\"https://unpkg.com/axios/dist/axios.min.js\"><//script>\n\t\t<script>\n\t\t\tlet post = function() {\n\t\t\t\tlet postBody = {\n\t\t\t\t\tresponse_content_type: \"application/json\",\n\t\t\t\t\tname: document.getElementById(\"name\").value\n\t\t\t\t};\n\t\t\t\taxios.post(\"/\", postBody)\n\t\t\t\t\t.then(function (response) {\n\t\t\t\t\t\tdocument.getElementById(\"post_message\").innerHTML = response.data.body;\n\t\t\t\t\t})\n\t\t\t\t\t.catch(function (error) {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\t\t<//script>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs/dejs.ts\";\n\nclass Response extends Drash.Http.Response {\n  public async generateHtmlResponse(): Promise<any> {\n    let rawOutput = await renderFile(Deno.cwd() + \"/index.ejs\", {\n      body: this.body\n    });\n    let html = rawOutput.toString();\n    return html;\n  }\n}\n\nDrash.Http.Response = Response;\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n  public POST() {\n    this.response.body = \"POST request received!\";\n    let name = this.request.body_parsed.name;\n    if (name) {\n      this.response.body += ` Thanks for the request, ${name}!`;\n    }\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource],\n  logger: new Drash.CoreLoggers.ConsoleLogger({\n    enabled: true,\n    level: \"debug\",\n    tag_string: \"{datetime} | {level} | \",\n    tag_string_fns: {\n      datetime() {\n        return new Date().toISOString().replace(\"T\", \" \");\n      }\n    }\n  })\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "sh",
        "filename": "output.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "run": {
        "contents": "deno --allow-net --allow-read app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output_post": {
        "contents": "Deno server started at localhost:1337.\n\n2019-04-13 01:57:56.693Z | INFO |  Request received: GET /\n2019-04-13 01:57:56.693Z | DEBUG |  Calling HomeResource.GET() method.\n2019-04-13 01:57:56.693Z | INFO |  Sending response. Content-Type: text/html. Status: 200 (OK).\n2019-04-13 01:57:56.765Z | DEBUG |  /favicon.ico requested.\n2019-04-13 01:57:56.765Z | DEBUG |  All future log messages for /favicon.ico will be muted.\n2019-04-13 01:58:51.026Z | INFO |  Request received: POST /?response_content_type=application/json&name=Eric\n2019-04-13 01:58:51.026Z | DEBUG |  Calling HomeResource.POST() method.\n2019-04-13 01:58:51.026Z | INFO |  Sending response. Content-Type: application/json. Status: 200 (OK).\n",
        "extension": "txt",
        "filename": "output_post.txt",
        "title": "/path/to/your/project/output_post.txt"
      },
      "output_get": {
        "contents": "Deno server started at localhost:1337.\n\n2019-04-13 01:57:56.693Z | INFO |  Request received: GET /\n2019-04-13 01:57:56.693Z | DEBUG |  Calling HomeResource.GET() method.\n2019-04-13 01:57:56.693Z | INFO |  Sending response. Content-Type: text/html. Status: 200 (OK).\n2019-04-13 01:57:56.765Z | DEBUG |  /favicon.ico requested.\n2019-04-13 01:57:56.765Z | DEBUG |  All future log messages for /favicon.ico will be muted.\n",
        "extension": "txt",
        "filename": "output_get.txt",
        "title": "/path/to/your/project/output_get.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_a_web_app/hello_world/part_1": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1337\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "folder_structure_setup": {
        "contents": "mkdir /path/to/your/project\ncd /path/to/your/project\n",
        "extension": "txt",
        "filename": "folder_structure_setup.txt",
        "title": "/path/to/your/project/folder_structure_setup.txt"
      },
      "run": {
        "contents": "deno --allow-net app.ts\n",
        "extension": "sh",
        "filename": "run.sh",
        "language": "shell",
        "title": "Terminal"
      },
      "output": {
        "contents": "Deno server started at localhost:1337.\n",
        "extension": "txt",
        "filename": "output.txt",
        "title": "/path/to/your/project/output.txt"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api": {
      "coffee_and_tea": {
        "contents": "",
        "filename": "coffee_and_tea",
        "title": "/path/to/your/project/coffee_and_tea"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea": {
      "part_2": {
        "contents": "",
        "filename": "part_2",
        "title": "/path/to/your/project/part_2"
      },
      "part_3": {
        "contents": "",
        "filename": "part_3",
        "title": "/path/to/your/project/part_3"
      },
      "part_4": {
        "contents": "",
        "filename": "part_4",
        "title": "/path/to/your/project/part_4"
      },
      "part_1": {
        "contents": "",
        "filename": "part_1",
        "title": "/path/to/your/project/part_1"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_2": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport CoffeeResource from \"./coffee_resource.ts\";\nimport TeaResource from \"./tea_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    CoffeeResource,\n    TeaResource\n  ],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tcoffee.json\n\ttea.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_3": {
      "coffee_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class CoffeeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/coffee/:id\",\n    \"/coffee/:id/\"\n  ];\n\n  public GET() {\n    let coffeeId = this.request.getPathParam(\"id\");\n    this.response.body = this.getCoffee(coffeeId);\n    return this.response;\n  }\n\n  protected getCoffee(coffeeId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./coffee.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[coffeeId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting coffee with ID \"${coffeeId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Coffee with ID \"${coffeeId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "coffee_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/coffee_resource.ts"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport CoffeeResource from \"./coffee_resource.ts\";\nimport TeaResource from \"./tea_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    CoffeeResource,\n    TeaResource\n  ],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tcoffee.json\n\tcoffee_resource.ts\n\ttea.json\n\ttea_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "tea_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class TeaResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/tea/:id\",\n    \"/tea/:id/\"\n  ];\n\n  public GET() {\n    let teaId = this.request.getPathParam(\"id\");\n    this.response.body = this.getTea(teaId);\n    return this.response;\n  }\n\n  protected getTea(teaId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./tea.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[teaId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting tea with ID \"${teaId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Tea with ID \"${teaId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "tea_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/tea_resource.ts"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_4": {
      "coffee_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class CoffeeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/coffee/:id\",\n    \"/coffee/:id/\"\n  ];\n\n  public GET() {\n    let coffeeId = this.request.getPathParam(\"id\");\n    this.response.body = this.getCoffee(coffeeId);\n    return this.response;\n  }\n\n  protected getCoffee(coffeeId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./coffee.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[coffeeId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting coffee with ID \"${coffeeId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Coffee with ID \"${coffeeId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "coffee_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/coffee_resource.ts"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport response from \"./response.ts\";\nDrash.Http.Response = response;\n\nimport CoffeeResource from \"./coffee_resource.ts\";\nimport TeaResource from \"./tea_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    CoffeeResource,\n    TeaResource\n  ],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tcoffee.json\n\tcoffee_resource.ts\n\ttea.json\n\ttea_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "response": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class Response extends Drash.Http.Response {\n  public generateResponse(): any {\n    let schema = {\n      status_code: this.status_code,\n      status_message: this.getStatusMessage(),\n      data: this.body,\n      request: {\n        method: this.request.method.toUpperCase(),\n        uri: this.request.uri\n      }\n    };\n\n    return JSON.stringify(schema);\n  }\n}\n",
        "extension": "ts",
        "filename": "response.ts",
        "language": "typescript",
        "title": "/path/to/your/project/response.ts"
      },
      "tea_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class TeaResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/tea/:id\",\n    \"/tea/:id/\"\n  ];\n\n  public GET() {\n    let teaId = this.request.getPathParam(\"id\");\n    this.response.body = this.getTea(teaId);\n    return this.response;\n  }\n\n  protected getTea(teaId: number) {\n    let record = null;\n\n    try {\n      let fileContentsRaw = Deno.readFileSync(\"./tea.json\");\n      let decoder = new TextDecoder();\n      let records = decoder.decode(fileContentsRaw);\n      records = JSON.parse(records);\n      record = records[teaId];\n    } catch (error) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        `Error getting tea with ID \"${teaId}\". Error: ${error.message}.`\n      );\n    }\n\n    if (!record) {\n      throw new Drash.Exceptions.HttpException(\n        404,\n        `Tea with ID \"${teaId}\" not found.`\n      );\n    }\n\n    return record;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "tea_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/tea_resource.ts"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/advanced_tutorials/creating_an_api/coffee_and_tea/part_1": {
      "coffee": {
        "contents": "{\n  \"17\": {\n    \"id\": 17,\n    \"name\": \"Light Roast: Breakfast Blend\",\n    \"price\": 2.25\n  },\n  \"28\": {\n    \"id\": 28,\n    \"name\": \"Medium Roast: Classico\",\n    \"price\": 2.50\n  },\n  \"32\": {\n    \"id\": 32,\n    \"name\": \"Medium Roast: Premium Single Origin (Sumatra)\",\n    \"price\": 3.50\n  }\n}\n",
        "extension": "json",
        "filename": "coffee.json",
        "title": "/path/to/your/project/coffee.json"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tcoffee.json\n\ttea.json\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "tea": {
        "contents": "{\n  \"50\": {\n    \"id\": 50,\n    \"name\": \"Earl Gray\",\n    \"price\": 4.00\n  },\n  \"68\": {\n    \"id\": 68,\n    \"name\": \"Citrus Chamomile\",\n    \"price\": 3.50\n  },\n  \"83\": {\n    \"id\": 83,\n    \"name\": \"Imperial Blend\",\n    \"price\": 4.50\n  }\n}\n",
        "extension": "json",
        "filename": "tea.json",
        "title": "/path/to/your/project/tea.json"
      }
    },
    "/src/example_code/dependency_management": {
      "response": {
        "contents": "import { Drash } from \"../../mod.ts\";\nimport { STATUS_TEXT, Status } from \"../../deps.ts\";\n\n/**\n * @memberof Drash.Http\n * @class Response\n *\n * @description\n *     Response handles sending a response to the client making the request.\n */\nexport default class Response { ... }\n",
        "extension": "ts",
        "filename": "response.ts",
        "language": "typescript",
        "title": "/path/to/your/project/response.ts"
      },
      "deps": {
        "contents": "export {\n  serve,\n  ServerRequest\n} from \"https://deno.land/std@v0.32.0/http/server.ts\";\n\nexport {\n  STATUS_TEXT,\n  Status\n} from \"https://deno.land/std@v0.32.0/http/http_status.ts\";\n\nexport {\n  walkSync\n} from \"https://deno.land/std@v0.32.0/fs/mod.ts\";\n\nexport {\n  runTests,\n  test\n} from \"https://deno.land/std@v0.32.0/testing/mod.ts\";\n\nexport {\n  assertEquals\n} from \"https://deno.land/std@v0.32.0/testing/asserts.ts\";\n\nexport {\n  contentType\n} from \"https://deno.land/std@v0.32.0/media_types/mod.ts\";\n\nexport {\n  BufReader,\n  ReadLineResult\n} from \"https://deno.land/std@v0.32.0/io/bufio.ts\";\n\nexport {\n  StringReader\n} from \"https://deno.land/std@v0.32.0/io/readers.ts\";\n\nexport {\n  MultipartReader\n} from \"https://deno.land/std@v0.32.0/mime/multipart.ts\";\n",
        "extension": "ts",
        "filename": "deps.ts",
        "language": "typescript",
        "title": "/path/to/your/project/deps.ts"
      }
    },
    "/src/example_code/tutorials": {
      "misc": {
        "contents": "",
        "filename": "misc",
        "title": "/path/to/your/project/misc"
      },
      "middleware": {
        "contents": "",
        "filename": "middleware",
        "title": "/path/to/your/project/middleware"
      },
      "resources": {
        "contents": "",
        "filename": "resources",
        "title": "/path/to/your/project/resources"
      },
      "requests": {
        "contents": "",
        "filename": "requests",
        "title": "/path/to/your/project/requests"
      },
      "testing": {
        "contents": "",
        "filename": "testing",
        "title": "/path/to/your/project/testing"
      },
      "logging": {
        "contents": "",
        "filename": "logging",
        "title": "/path/to/your/project/logging"
      },
      "servers": {
        "contents": "",
        "filename": "servers",
        "title": "/path/to/your/project/servers"
      },
      "resource_lifecycle_hooks": {
        "contents": "",
        "filename": "resource_lifecycle_hooks",
        "title": "/path/to/your/project/resource_lifecycle_hooks"
      }
    },
    "/src/example_code/tutorials/misc": {
      "adding_global_members": {
        "contents": "",
        "filename": "adding_global_members",
        "title": "/path/to/your/project/adding_global_members"
      }
    },
    "/src/example_code/tutorials/misc/adding_global_members": {
      "my_thing": {
        "contents": "export default class MyThing {\n  public greet() {\n    return \"Hello from MyThing!\";\n  }\n}\n",
        "extension": "ts",
        "filename": "my_thing.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_thing.ts"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\n// When this file is imported, it will register MyThing as a global member\nimport \"./bootstrap.ts\";\n\nconsole.log(Drash.Members.MyThing.greet());\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tbootstrap.ts\n\tmy_thing.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "bootstrap": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\n// Register MyThing as a global member\nimport myThing from \"./my_thing.ts\";\nDrash.addMember(\"MyThing\", new myThing());\n",
        "extension": "ts",
        "filename": "bootstrap.ts",
        "language": "typescript",
        "title": "/path/to/your/project/bootstrap.ts"
      }
    },
    "/src/example_code/tutorials/middleware": {
      "adding_server_level_middleware": {
        "contents": "",
        "filename": "adding_server_level_middleware",
        "title": "/path/to/your/project/adding_server_level_middleware"
      },
      "introduction": {
        "contents": "",
        "filename": "introduction",
        "title": "/path/to/your/project/introduction"
      },
      "adding_resource_level_middleware": {
        "contents": "",
        "filename": "adding_resource_level_middleware",
        "title": "/path/to/your/project/adding_resource_level_middleware"
      },
      "morgan_style_logging_middleware": {
        "contents": "",
        "filename": "morgan_style_logging_middleware",
        "title": "/path/to/your/project/morgan_style_logging_middleware"
      }
    },
    "/src/example_code/tutorials/middleware/adding_server_level_middleware": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport VerifyTokenMiddleware from \"./verify_token_middleware.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        VerifyTokenMiddleware\n      ]\n    }\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tverify_token_middleware.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "verify_token_middleware": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class VerifyTokenMiddleware extends Drash.Http.Middleware {\n  public run() {\n    let token = this.request.getQueryParam('super_secret_token');\n\n    if (!token) {\n      throw new Drash.Exceptions.HttpMiddlewareException(400, \"Where is the token?\");\n    }\n\n    if (token != \"AllYourBaseAreBelongToUs\") {\n      throw new Drash.Exceptions.HttpMiddlewareException(403, `Mmm... \"${token}\" is a bad token.`);\n    }\n  }\n}\n",
        "extension": "ts",
        "filename": "verify_token_middleware.ts",
        "language": "typescript",
        "title": "/path/to/your/project/verify_token_middleware.ts"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"Hello!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/middleware/introduction": {
      "location_resource_level": {
        "contents": "class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  static middleware = {\n    before_request: [\n      \"MyFirstMiddleware\"\n    ],\n    after_request: [\n      \"MySecondMiddleware\"\n    ]\n  };\n\n  public GET() {\n    this.response.body = \"Hello\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "location_resource_level.ts",
        "language": "typescript",
        "title": "/path/to/your/project/location_resource_level.ts"
      },
      "location_server_level": {
        "contents": "const server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        AuthMiddleware,\n        CacheMiddleware,\n      ],\n      after_request: [\n        SomeOtherMiddleware,\n      ]\n    }\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n",
        "extension": "ts",
        "filename": "location_server_level.ts",
        "language": "typescript",
        "title": "/path/to/your/project/location_server_level.ts"
      },
      "sorting": {
        "contents": "const server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        OneMiddleware,\n        TwoMiddleware\n      ]\n    },\n    resource_level: [\n      RedMiddleware,\n      BlueMiddleware\n    ]\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n",
        "extension": "ts",
        "filename": "sorting.ts",
        "language": "typescript",
        "title": "/path/to/your/project/sorting.ts"
      },
      "location_resource_level_server": {
        "contents": "const server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    resource_level: [\n      MyFirstMiddleware,\n      MySecondMiddleware,\n      MyThirdMiddleware\n    ]\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n",
        "extension": "ts",
        "filename": "location_resource_level_server.ts",
        "language": "typescript",
        "title": "/path/to/your/project/location_resource_level_server.ts"
      }
    },
    "/src/example_code/tutorials/middleware/adding_resource_level_middleware": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport SecretResource from \"./secret_resource.ts\";\nimport VerifyTokenMiddleware from \"./verify_token_middleware.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    resource_level: [\n      VerifyTokenMiddleware\n    ]\n  },\n  resources: [\n    HomeResource,\n    SecretResource\n  ],\n  response_output: \"application/json\",\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tsecret_resource.ts\n\tverify_token_middleware.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "verify_token_middleware": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class VerifyTokenMiddleware extends Drash.Http.Middleware {\n  public run() {\n    let token = this.request.getQueryParam('super_secret_token');\n\n    if (!token) {\n      throw new Drash.Exceptions.HttpMiddlewareException(400, \"Where is the token?\");\n    }\n\n    if (token != \"AllYourBaseAreBelongToUs\") {\n      throw new Drash.Exceptions.HttpMiddlewareException(403, `Mmm... \"${token}\" is a bad token.`);\n    }\n  }\n}\n",
        "extension": "ts",
        "filename": "verify_token_middleware.ts",
        "language": "typescript",
        "title": "/path/to/your/project/verify_token_middleware.ts"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"Hello!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "secret_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class SecretResource extends Drash.Http.Resource {\n\n  static paths = [\"/secret\", \"/secret/\"];\n\n  static middleware = {\n    before_request: [\n      \"VerifyTokenMiddleware\"\n    ]\n  };\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"You have accessed the secret resource!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "secret_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/secret_resource.ts"
      }
    },
    "/src/example_code/tutorials/middleware/morgan_style_logging_middleware": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport MorganStyleLoggingMiddleware from \"./morgan_style_logging_middleware.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  middleware: {\n    server_level: {\n      before_request: [\n        MorganStyleLoggingMiddleware\n      ],\n      after_request: [\n        MorganStyleLoggingMiddleware\n      ]\n    }\n  },\n  resources: [\n    HomeResource\n  ],\n  response_output: \"application/json\",\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tmorgan_style_logging_middleware.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = {\n      method: \"GET\",\n      body: \"Hello!\"\n    };\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "morgan_style_logging_middleware": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nconst logger = new Drash.CoreLoggers.ConsoleLogger({\n  enabled: true,\n  level: \"all\",\n  tag_string: \"{datetime} | {level} |\",\n  tag_string_fns: {\n    datetime() {\n      return new Date().toISOString().replace(\"T\", \" \");\n    }\n  }\n});\n\nexport default class MorganStyleLoggingMiddleware extends Drash.Http.Middleware {\n  public run() {\n    if (!this.response) {\n      logger.info(`Request received: ${this.request.method} ${this.request.url}`);\n    }\n    if (this.response) {\n      logger.info(`Response: ${this.response.status_code} ${this.response.getStatusMessage()}`);\n    }\n  }\n}\n",
        "extension": "ts",
        "filename": "morgan_style_logging_middleware.ts",
        "language": "typescript",
        "title": "/path/to/your/project/morgan_style_logging_middleware.ts"
      }
    },
    "/src/example_code/tutorials/resources": {
      "creating_a_resource": {
        "contents": "",
        "filename": "creating_a_resource",
        "title": "/path/to/your/project/creating_a_resource"
      }
    },
    "/src/example_code/tutorials/resources/creating_a_resource": {
      "my_resource_get_post_put_delete": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n\n  public POST() {\n    this.response.body = \"POST request received!\";\n    return this.response;\n  }\n\n  public PUT() {\n    this.response.body = \"PUT request received!\";\n    return this.response;\n  }\n\n  public DELETE() {\n    this.response.body = \"DELETE request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_get_post_put_delete.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_get_post_put_delete.ts"
      },
      "registering_resources": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "registering_resources.ts",
        "language": "typescript",
        "title": "/path/to/your/project/registering_resources.ts"
      },
      "my_resource_path_params": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\n    \"/users/:user_id\",\n    \"/users/:user_id/\",\n  ];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n\n    let userId = this.request.getPathParam('user_id');\n\n    this.response.body += ` Parsing User #${userId} data!`;\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_path_params.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_path_params.ts"
      },
      "my_resource_get_post": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n\n  public POST() {\n    this.response.body = \"POST request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_get_post.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_get_post.ts"
      },
      "my_resource_regular_expression": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\n    \"/(users?)/([0-9]$)\",\n  ];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n\n    let userId = this.request.getPathParam('user_id');\n\n    this.response.body += ` Parsing User #${userId} data!`;\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "my_resource_regular_expression.ts",
        "language": "typescript",
        "title": "/path/to/your/project/my_resource_regular_expression.ts"
      }
    },
    "/src/example_code/tutorials/requests": {
      "handling_url_query_params": {
        "contents": "",
        "filename": "handling_url_query_params",
        "title": "/path/to/your/project/handling_url_query_params"
      },
      "handling_application_json_bodies": {
        "contents": "",
        "filename": "handling_application_json_bodies",
        "title": "/path/to/your/project/handling_application_json_bodies"
      },
      "handling_multipart_form_data_bodies": {
        "contents": "",
        "filename": "handling_multipart_form_data_bodies",
        "title": "/path/to/your/project/handling_multipart_form_data_bodies"
      },
      "handling_application_x_www_form_urlencoded_bodies": {
        "contents": "",
        "filename": "handling_application_x_www_form_urlencoded_bodies",
        "title": "/path/to/your/project/handling_application_x_www_form_urlencoded_bodies"
      },
      "handling_path_params": {
        "contents": "",
        "filename": "handling_path_params",
        "title": "/path/to/your/project/handling_path_params"
      }
    },
    "/src/example_code/tutorials/requests/handling_url_query_params": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users\"\n  ];\n\n  public GET() {\n    let userId = this.request.getUrlQueryParam(\"id\");\n\n    if (!userId) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `id` URL query param.\"\n      );\n    }\n\n    userId = parseInt(userId);\n    if (isNaN(userId)) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `id` URL query param to be a number.\"\n      );\n    }\n\n    this.response.body = `You passed in the following user ID as the URL query param: ${userId}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/requests/handling_application_json_bodies": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/\"\n  ];\n\n  public POST() {\n    const param = this.request.getBodyParam(\"name\");\n\n    if (!param) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `name` body param.\"\n      );\n    }\n\n    this.response.body = `You passed in the following body param: ${param}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/requests/handling_multipart_form_data_bodies": {
      "my_file": {
        "contents": "Hello, world!\n\nI am a simple text file.\n",
        "extension": "txt",
        "filename": "my_file.txt",
        "title": "/path/to/your/project/my_file.txt"
      },
      "files_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/files\"\n  ];\n\n  public POST() {\n    const decoder = new TextDecoder();\n    const file = this.request.getBodyFile(\"my_file\");\n\n    if (!file) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires files to be uploaded via the request body.\"\n      );\n    }\n\n    const outputFile = \"./uploads/my_uploaded_file.txt\";\n\n    Deno.writeFileSync(outputFile, file.content);\n\n    this.response.body = `You uploaded the following to ${outputFile}: `\n      + `\\n${decoder.decode(file.content)}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "files_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/files_resource.ts"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport FilesResource from \"./files_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [FilesResource],\n  memory_allocation: {\n    multipart_form_data: 128\n  },\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "uploads": {
        "contents": "",
        "filename": "uploads",
        "title": "/path/to/your/project/uploads"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\t▾ uploads/\n\t\tmy_uploaded_file.txt\n\tapp.ts\n\tfiles_resource.ts\n\tmy_file.txt\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/tutorials/requests/handling_multipart_form_data_bodies/uploads": {
      "my_uploaded_file": {
        "contents": "Hello, world!\n\nI am a simple text file.\n",
        "extension": "txt",
        "filename": "my_uploaded_file.txt",
        "title": "/path/to/your/project/my_uploaded_file.txt"
      }
    },
    "/src/example_code/tutorials/requests/handling_application_x_www_form_urlencoded_bodies": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/\"\n  ];\n\n  public POST() {\n    const param = this.request.getBodyParam(\"snack\");\n\n    if (!param) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `snack` body param.\"\n      );\n    }\n\n    this.response.body = `You passed in the following body param: ${param}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/requests/handling_path_params": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/plain\",\n  resources: [UsersResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\"\n  ];\n\n  public GET() {\n    const userId = parseInt(this.request.getPathParam(\"id\"));\n\n    if (isNaN(userId)) {\n      throw new Drash.Exceptions.HttpException(\n        400,\n        \"This resource requires the `:id` path param to be a number.\"\n      );\n    }\n\n    this.response.body = `You passed in the following user ID as the path param: ${userId}`;\n\n    return this.response;\n  }\n\n}\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      }
    },
    "/src/example_code/tutorials/testing": {
      "unit_testing": {
        "contents": "",
        "filename": "unit_testing",
        "title": "/path/to/your/project/unit_testing"
      }
    },
    "/src/example_code/tutorials/testing/unit_testing": {
      "tests": {
        "contents": "import { assertEquals } from \"https://deno.land/std/testing/asserts.ts\";\nimport { test } from \"https://deno.land/std/testing/mod.ts\";\n\ntest({\n  name: \"HomeResource - GET /\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), \"Welcome home!\");\n  }\n});\n\ntest({\n  name: \"UsersResource - GET /users/1\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/users/1\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), \"User #1 not found.\");\n  }\n});\n\ntest({\n  name: \"UsersResource - GET /users/1388873\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/users/1388873\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 1388873,\n      name: \"Seller\",\n    });\n  }\n});\n\ntest({\n  name: \"UsersResource - GET /users/1983765\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/users/1983765\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 1983765,\n      name: \"Buyer\",\n    });\n  }\n});\n\ntest({\n  name: \"OrdersResource - GET /orders/1\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/orders/1\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), \"Order #1 not found.\");\n  }\n});\n\ntest({\n  name: \"OrdersResource - GET /orders/1090987\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/orders/1090987\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 1090987,\n      name: \"Gadgets\",\n      quantity: 50,\n      price: 1000\n    });\n  }\n});\n\ntest({\n  name: \"OrdersResource - GET /orders/8878213\",\n  async fn(): Promise<any> {\n    let response = await fetch(\"http://localhost:1447/orders/8878213\", {\n      method: \"GET\",\n    });\n    assertEquals(JSON.parse(await response.text()), {\n      id: 8878213,\n      name: \"Gizmos\",\n      quantity: 25,\n      price: 2000\n    });\n  }\n});\n",
        "extension": "ts",
        "filename": "tests.ts",
        "language": "typescript",
        "title": "/path/to/your/project/tests.ts"
      },
      "orders_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class OrdersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/orders/:id\",\n    \"/orders/:id/\"\n  ];\n\n  // Simulate a database with order records\n  protected database = {\n    1090987: {\n      id: 1090987,\n      name: \"Gadgets\",\n      quantity: 50,\n      price: 1000\n    },\n    8878213: {\n      id: 8878213,\n      name: \"Gizmos\",\n      quantity: 25,\n      price: 2000\n    },\n  };\n\n  public GET() {\n    this.response.body = this.getOrder(this.request.getPathParam(\"id\"));\n    return this.response;\n  }\n\n  protected getOrder(id) {\n    if (this.database[id]) {\n      return this.database[id];\n    }\n\n    throw new Drash.Exceptions.HttpException(404, `Order #${id} not found.`);\n  }\n}\n",
        "extension": "ts",
        "filename": "orders_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/orders_resource.ts"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport OrdersResource from \"./orders_resource.ts\";\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    HomeResource,\n    OrdersResource,\n    UsersResource\n  ]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "users_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class UsersResource extends Drash.Http.Resource {\n\n  static paths = [\n    \"/users/:id\",\n    \"/users/:id/\"\n  ];\n\n  // Simulate a database with user records\n  protected database = {\n    1388873: {\n      id: 1388873,\n      name: \"Seller\",\n    },\n    1983765: {\n      id: 1983765,\n      name: \"Buyer\",\n    },\n  };\n\n  public GET() {\n    this.response.body = this.getUser(this.request.getPathParam(\"id\"));\n    return this.response;\n  }\n\n  protected getUser(id) {\n    if (this.database[id]) {\n      return this.database[id];\n    }\n\n    throw new Drash.Exceptions.HttpException(404, `User #${id} not found.`);\n  }\n}\n",
        "extension": "ts",
        "filename": "users_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/users_resource.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\torders_resource.ts\n\trun_tests.ts\n\ttests.ts\n\tusers_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"Welcome home!\";\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "run_tests": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { runTests } from \"https://deno.land/std/testing/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\nimport OrdersResource from \"./orders_resource.ts\";\nimport UsersResource from \"./users_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [\n    HomeResource,\n    OrdersResource,\n    UsersResource\n  ],\n});\n\n// Run your server\n\nserver.run();\n\n// Import your tests so they can be run\n\nimport \"./tests.ts\";\n\n// Run your tests and then shut down the server when done\n\nrunTests()\n  .then(() => {\n    server.close();\n  });\n",
        "extension": "ts",
        "filename": "run_tests.ts",
        "language": "typescript",
        "title": "/path/to/your/project/run_tests.ts"
      }
    },
    "/src/example_code/tutorials/logging": {
      "logging_to_the_terminal": {
        "contents": "",
        "filename": "logging_to_the_terminal",
        "title": "/path/to/your/project/logging_to_the_terminal"
      },
      "logging_using_log_from_deno_std": {
        "contents": "",
        "filename": "logging_using_log_from_deno_std",
        "title": "/path/to/your/project/logging_using_log_from_deno_std"
      },
      "logging_to_files": {
        "contents": "",
        "filename": "logging_to_files",
        "title": "/path/to/your/project/logging_to_files"
      }
    },
    "/src/example_code/tutorials/logging/logging_to_the_terminal": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource],\n  logger: new Drash.CoreLoggers.ConsoleLogger({\n    enabled: true,\n    level: \"all\",\n    tag_string: \"{datetime} | {level} |\",\n    tag_string_fns: {\n      datetime() {\n        return new Date().toISOString().replace(\"T\", \" \");\n      }\n    }\n  })\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.server.logger.fatal(\"This is a FATAL log message.\");\n    this.server.logger.error(\"This is an ERROR log message\");\n    this.server.logger.warn(\"This is a WARN log message\");\n    this.server.logger.info(\"This is an INFO log message\");\n    this.server.logger.debug(\"This is a DEBUG log message\");\n    this.server.logger.trace(\"This is a TRACE log message\");\n\n    this.response.body = \"GET request received! Also, check your terminal to see the log messages written by this resource.\";\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/logging/logging_using_log_from_deno_std": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport * as log from \"https://deno.land/std/log/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    log.info(\"Setting a response.\");\n\n    this.response.body = \"Hello!\";\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/logging/logging_to_files": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource],\n  logger: new Drash.CoreLoggers.FileLogger({\n    enabled: true,\n    level: \"all\",\n    file: \"./server.log\",\n    tag_string: \"{datetime} | {level} |\",\n    tag_string_fns: {\n      datetime() {\n        return new Date().toISOString().replace(\"T\", \" \");\n      }\n    }\n  })\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tserver.log\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.server.logger.fatal(\"This is a FATAL log message.\");\n    this.server.logger.error(\"This is an ERROR log message\");\n    this.server.logger.warn(\"This is a WARN log message\");\n    this.server.logger.info(\"This is an INFO log message\");\n    this.server.logger.debug(\"This is a DEBUG log message\");\n    this.server.logger.trace(\"This is a TRACE log message\");\n\n    this.response.body = \"GET request received! Also, check your server.log file to see the log messages written by this resource.\";\n\n    return this.response;\n  }\n}\n\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "server": {
        "contents": "2019-12-27 17:33:32.853Z | INFO | Request received: GET /\n2019-12-27 17:33:32.853Z | DEBUG | [drash] Using `HomeResource` resource class to handle the request.\n2019-12-27 17:33:32.855Z | DEBUG | [drash] Calling GET().\n2019-12-27 17:33:32.855Z | FATAL | This is a FATAL log message.\n2019-12-27 17:33:32.855Z | ERROR | This is an ERROR log message\n2019-12-27 17:33:32.856Z | WARN | This is a WARN log message\n2019-12-27 17:33:32.856Z | INFO | This is an INFO log message\n2019-12-27 17:33:32.856Z | DEBUG | This is a DEBUG log message\n2019-12-27 17:33:32.857Z | TRACE | This is a TRACE log message\n2019-12-27 17:33:32.857Z | DEBUG | [drash] Sending response. 200.\n",
        "extension": "log",
        "filename": "server.log",
        "title": "/path/to/your/project/server.log"
      }
    },
    "/src/example_code/tutorials/servers": {
      "serving_static_paths": {
        "contents": "",
        "filename": "serving_static_paths",
        "title": "/path/to/your/project/serving_static_paths"
      },
      "creating_a_server": {
        "contents": "",
        "filename": "creating_a_server",
        "title": "/path/to/your/project/creating_a_server"
      }
    },
    "/src/example_code/tutorials/servers/serving_static_paths": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  directory: \"/path/to/your/project\",\n  resources: [HomeResource],\n  response_output: \"text/html\",\n  static_paths: [\"/public\"]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\t▾ public/\n\t\tstyle.css\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = `\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>Drash</title>\n        <link href=\"/public/style.css\" rel=\"stylesheet\">\n      </head>\n      <body>\n        <h1 class=\"my-text\">This is my title and it is red.</h1>\n      </body>\n    </html>`;\n\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      },
      "public": {
        "contents": "",
        "filename": "public",
        "title": "/path/to/your/project/public"
      }
    },
    "/src/example_code/tutorials/servers/serving_static_paths/public": {
      "style": {
        "contents": ".my-text {\n    color: #ff0000;\n}\n",
        "extension": "css",
        "filename": "style.css",
        "language": "css",
        "title": "/path/to/your/project/style.css"
      }
    },
    "/src/example_code/tutorials/servers/creating_a_server": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\", // Accepts text/html, text/xml, application/xml\n  resources: [HomeResource],\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n\n  public POST() {\n    this.response.body = \"POST request received!\";\n    return this.response;\n  }\n\n  public PUT() {\n    this.response.body = \"PUT request received!\";\n    return this.response;\n  }\n\n  public DELETE() {\n    this.response.body = \"DELETE request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/tutorials/resource_lifecycle_hooks": {
      "hook_after_request": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public hook_afterRequest() {\n    console.log(\"Hooked after the request!\");\n  }\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "hook_after_request.ts",
        "language": "typescript",
        "title": "/path/to/your/project/hook_after_request.ts"
      },
      "hook_before_request": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nexport default class MyResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n\n  public hook_beforeRequest() {\n    console.log(\"Hooked before the request!\");\n  }\n\n  public GET() {\n    this.response.body = \"GET request received!\";\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "hook_before_request.ts",
        "language": "typescript",
        "title": "/path/to/your/project/hook_before_request.ts"
      }
    },
    "/src/example_code/third_party_tutorials": {
      "databases": {
        "contents": "",
        "filename": "databases",
        "title": "/path/to/your/project/databases"
      },
      "template_engines": {
        "contents": "",
        "filename": "template_engines",
        "title": "/path/to/your/project/template_engines"
      }
    },
    "/src/example_code/third_party_tutorials/databases": {
      "deno_postgres_test": {
        "contents": "",
        "filename": "deno_postgres_test",
        "title": "/path/to/your/project/deno_postgres_test"
      },
      "deno_postgres": {
        "contents": "",
        "filename": "deno_postgres",
        "title": "/path/to/your/project/deno_postgres"
      },
      "deno_mysql": {
        "contents": "",
        "filename": "deno_mysql",
        "title": "/path/to/your/project/deno_mysql"
      },
      "deno_mysql_test": {
        "contents": "",
        "filename": "deno_mysql_test",
        "title": "/path/to/your/project/deno_mysql_test"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_postgres_test": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport members from \"../../../../../tests/members.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/postgres/mod.ts\";\n\nconst denoPostgres = new Client({\n  database: \"deno_postgres\",\n  host: \"localhost\",\n  port: \"5432\",\n  user: \"crookse\", // specify your db user\n});\n\nexport {\n  denoPostgres\n}\n\nmembers.test(\"deno-postgres\", async () => {\n  server.run();\n  const response = await members.fetch.get(\"http://localhost:1447\");\n  members.assert.responseJsonEquals(await response.text(), [[\"eric\",\"m\"]]);\n  server.deno_server.close();\n});\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { denoPostgres } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    await denoPostgres.connect();\n    let result = await denoPostgres.query(\"SELECT * FROM users;\");\n    this.response.body = result.rows;\n    await denoPostgres.end();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_postgres": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\nserver.run();\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/postgres/mod.ts\";\n\nconst denoPostgres = new Client({\n  database: \"deno_postgres\",\n  host: \"localhost\",\n  port: \"5432\",\n  user: \"user\", // specify your db user\n});\n\nexport {\n  denoPostgres\n}\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { denoPostgres } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    await denoPostgres.connect();\n    let result = await denoPostgres.query(\"SELECT * FROM users;\");\n    this.response.body = result.rows;\n    await denoPostgres.end();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_mysql": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\nserver.run();\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/mysql/mod.ts\";\n\nconst denoMysql = await new Client().connect({\n  hostname: \"127.0.0.1\",\n  username: \"username\", // specify your username\n  db: \"deno_mysql\",\n  // password: \"password\", // uncomment and specify your password if using a password\n});\n\nexport {\n  denoMysql\n}\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { denoMysql } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    this.response.body = await denoMysql.query(`select * from users`);\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/databases/deno_mysql_test": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport members from \"../../../../../tests/members.ts\";\n\n// Set up the server\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"application/json\",\n  resources: [HomeResource]\n});\n\n// Set up the database\n\nimport { Client } from \"https://deno.land/x/mysql/mod.ts\";\n\nconst denoMysql = await new Client().connect({\n  hostname: \"127.0.0.1\",\n  username: \"root\", // specify your username\n  db: \"deno_mysql\",\n  // password: \"password\", // uncomment and specify your password if using a password\n});\n\nexport {\n  denoMysql\n}\n\nmembers.test(\"deno_mysql\", async () => {\n  server.run();\n  const response = await members.fetch.get(\"http://localhost:1447\");\n  members.assert.responseJsonEquals(await response.text(), [\n    {\n      \"name\": \"manyuanrong\",\n      \"role\": \"author\"\n    }\n  ]);\n  server.deno_server.close();\n});\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { denoMysql } from \"./app.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    this.response.body = await denoMysql.query(`select * from users`);\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/template_engines": {
      "dejs_test": {
        "contents": "",
        "filename": "dejs_test",
        "title": "/path/to/your/project/dejs_test"
      },
      "dejs": {
        "contents": "",
        "filename": "dejs",
        "title": "/path/to/your/project/dejs"
      }
    },
    "/src/example_code/third_party_tutorials/template_engines/dejs_test": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>Drash + dejs</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash + dejs</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">Hello, <%= name %>! Drash + dejs is cool!</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#dejs</span>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport members from \"../../../../../tests/members.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nlet expected = `<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>Drash + dejs</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash + dejs</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">Hello, (name not specified)! Drash + dejs is cool!</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#dejs</span>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n`;\n\nmembers.test(\"dejs\", async () => {\n  server.run();\n  const response = await members.fetch.get(\"http://localhost:1447\");\n  members.assert.equals(await response.text(), expected);\n  server.deno_server.close();\n});\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs@0.3.4/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    // Set the data if any\n    let data = {\n      name: this.request.getQueryParam(\"name\")\n        ? this.request.getQueryParam(\"name\")\n        : \"(name not specified)\"\n    };\n    // Render and serve the template to the client\n    const output = await renderFile(\"./src/example_code/third_party_tutorials/template_engines/dejs_test/index.ejs\", data);\n    this.response.body = output.toString();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/third_party_tutorials/template_engines/dejs": {
      "index": {
        "contents": "<!DOCTYPE html>\n<html class=\"h-full w-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>Drash + dejs</title>\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css\">\n\t</head>\n\t<body class=\"h-full w-full\">\n\t\t<div class=\"flex h-full w-full items-center justify-center\">\n\t\t\t<div class=\"max-w-sm rounded overflow-hidden shadow-lg\">\n\t\t\t\t<img class=\"w-full\" src=\"https://tailwindcss.com/img/card-top.jpg\" alt=\"Sunset in the mountains\">\n\t\t\t\t<div class=\"px-6\">\n\t\t\t\t<div class=\"font-bold text-xl mt-4 mb-2\">Drash + dejs</div>\n\t\t\t\t\t<div class=\"mb-4\">\n\t\t\t\t\t\t<p class=\"text-grey-darker text-base\">Hello, <%= name %>! Drash + dejs is cool!</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr class=\"border-b border-gray\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"px-6 py-4\">\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#deno</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2\">#drash</span>\n\t\t\t\t\t<span class=\"inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker\">#dejs</span>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n",
        "extension": "ejs",
        "filename": "index.ejs",
        "title": "/path/to/your/project/index.ejs"
      },
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nimport HomeResource from \"./home_resource.ts\";\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "folder_structure": {
        "contents": "▾ /path/to/your/project/\n\tapp.ts\n\thome_resource.ts\n\tindex.ejs\n",
        "extension": "txt",
        "filename": "folder_structure.txt",
        "title": "Project Folder Structure"
      },
      "home_resource": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\nimport { renderFile } from \"https://deno.land/x/dejs@0.3.4/mod.ts\";\n\nexport default class HomeResource extends Drash.Http.Resource {\n\n  static paths = [\"/\"];\n\n  public async GET() {\n    // Set the data if any\n    let data = {\n      name: this.request.getQueryParam(\"name\")\n        ? this.request.getQueryParam(\"name\")\n        : \"(name not specified)\"\n    };\n    // Render and serve the template to the client\n    const output = await renderFile(\"./index.ejs\", data);\n    this.response.body = output.toString();\n    return this.response;\n  }\n}\n",
        "extension": "ts",
        "filename": "home_resource.ts",
        "language": "typescript",
        "title": "/path/to/your/project/home_resource.ts"
      }
    },
    "/src/example_code/getting_started": {
      "quickstart": {
        "contents": "",
        "filename": "quickstart",
        "title": "/path/to/your/project/quickstart"
      }
    },
    "/src/example_code/getting_started/quickstart": {
      "app": {
        "contents": "import { Drash } from \"https://deno.land/x/drash/mod.ts\";\n\nclass HomeResource extends Drash.Http.Resource {\n  static paths = [\"/\"];\n  public GET() {\n    this.response.body = \"Hello World!\";\n    return this.response;\n  }\n}\n\nconst server = new Drash.Http.Server({\n  address: \"localhost:1447\",\n  response_output: \"text/html\",\n  resources: [HomeResource]\n});\n\nserver.run();\n",
        "extension": "ts",
        "filename": "app.ts",
        "language": "typescript",
        "title": "/path/to/your/project/app.ts"
      },
      "execute": {
        "contents": "deno --allow-net app.ts\n\nDeno server started at localhost:1447.\n",
        "extension": "sh",
        "filename": "execute.sh",
        "language": "shell",
        "title": "Terminal"
      }
    }
  },
  "store": {
    "page_data": {
      "api_reference": {
        "Drash.Exceptions": {
          "HttpException": {
            "fully_qualified_name": "Drash.Exceptions.HttpException",
            "namespace": "Drash.Exceptions",
            "name": "HttpException",
            "description": [
              "This class gives you a way to throw HTTP errors semantically.",
              "This class extends `Error`."
            ],
            "properties": {
              "code": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the HTTP response code associated with this\nexception."
                ],
                "annotation": {
                  "line": "@property number code",
                  "data_type": "number",
                  "name": "code"
                },
                "signature": "public code: number",
                "name": "code",
                "fully_qualified_name": "Drash.Exceptions.HttpException.code"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "code": {
                    "name": "code",
                    "description": [
                      "The HTTP response code associated with this exception."
                    ],
                    "annotation": {
                      "line": "@param number code",
                      "data_type": "number",
                      "name": "code"
                    }
                  },
                  "message": {
                    "name": "message",
                    "description": [
                      "(optional) The exception message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(code: number, message?: string)",
                "is_async": false,
                "fully_qualified_name": "Drash.Exceptions.HttpException()"
              }
            }
          },
          "HttpMiddlewareException": {
            "fully_qualified_name": "Drash.Exceptions.HttpMiddlewareException",
            "namespace": "Drash.Exceptions",
            "name": "HttpMiddlewareException",
            "description": [
              "This class gives you a way to throw HTTP errors semantically in the\nmiddleware classes. The difference between this class and `HttpException`\ncomes when you want to check which exception was thrown via\n`exception.constructor.name`.",
              "This class extends `Error`."
            ],
            "properties": {
              "code": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the HTTP response code associated with this\nexception."
                ],
                "annotation": {
                  "line": "@property number code",
                  "data_type": "number",
                  "name": "code"
                },
                "signature": "public code: number",
                "name": "code",
                "fully_qualified_name": "Drash.Exceptions.HttpMiddlewareException.code"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "code": {
                    "name": "code",
                    "description": [
                      "The HTTP response code associated with this exception."
                    ],
                    "annotation": {
                      "line": "@param number code",
                      "data_type": "number",
                      "name": "code"
                    }
                  },
                  "message": {
                    "name": "message",
                    "description": [
                      "(optional) The exception message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(code: number, message?: string)",
                "is_async": false,
                "fully_qualified_name": "Drash.Exceptions.HttpMiddlewareException()"
              }
            }
          }
        },
        "Drash.Http": {
          "Middleware": {
            "fully_qualified_name": "Drash.Http.Middleware",
            "namespace": "Drash.Http",
            "name": "Middleware",
            "description": [
              "This is the base middleware class for all middleware classes."
            ],
            "properties": {
              "location": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the location that this middleware should process."
                ],
                "annotation": {
                  "line": "@property string location",
                  "data_type": "string",
                  "name": "location"
                },
                "signature": "public location: string",
                "name": "location",
                "fully_qualified_name": "Drash.Http.Middleware.location"
              },
              "name": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the name of this middleware class. This property is\nused by `Drash.Http.Server` to help it store middleware in the correct\n`middleware_*` property."
                ],
                "annotation": {
                  "line": "@property string name",
                  "data_type": "string",
                  "name": "name"
                },
                "signature": "public name: string",
                "name": "name",
                "fully_qualified_name": "Drash.Http.Middleware.name"
              },
              "request": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold the request object."
                ],
                "annotation": {
                  "line": "@property any request",
                  "data_type": "any",
                  "name": "request"
                },
                "signature": "protected request: any",
                "name": "request",
                "fully_qualified_name": "Drash.Http.Middleware.request"
              },
              "resource": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold the resource object. This property will only contain\nthe resource object if this middleware is a resource-level middleware."
                ],
                "annotation": {
                  "line": "@property Drash.Http.Resource resource",
                  "data_type": "Drash.Http.Resource",
                  "name": "resource"
                },
                "signature": "protected resource: Drash.Http.Resource",
                "name": "resource",
                "fully_qualified_name": "Drash.Http.Middleware.resource"
              },
              "response": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold the response object. This property will only contain\nthe response object if the server was able to get a response from the\nresource."
                ],
                "annotation": {
                  "line": "@property Drash.Http.Resource resource",
                  "data_type": "Drash.Http.Resource",
                  "name": "resource"
                },
                "signature": "protected response: Drash.Http.Response",
                "name": "response",
                "fully_qualified_name": "Drash.Http.Middleware.response"
              },
              "server": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold the server object handling this middleware."
                ],
                "annotation": {
                  "line": "@property Drash.Http.Server server",
                  "data_type": "Drash.Http.Server",
                  "name": "server"
                },
                "signature": "protected server: Drash.Http.Server",
                "name": "server",
                "fully_qualified_name": "Drash.Http.Middleware.server"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": null,
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  },
                  "server": {
                    "name": "server",
                    "description": [
                      "The server object handling this middleware."
                    ],
                    "annotation": {
                      "line": "@param Drash.Http.Server server",
                      "data_type": "Drash.Http.Server",
                      "name": "server"
                    }
                  },
                  "resource": {
                    "name": "resource",
                    "description": [
                      "(optional) If this is a resource-level middleware, then it will have\naccess to the resource that uses it."
                    ],
                    "annotation": {
                      "line": "@param Drash.Http.Resource resource",
                      "data_type": "Drash.Http.Resource",
                      "name": "resource"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(request: any, server: Drash.Http.Server, resource?: Drash.Http.Resource, response?: Drash.Http.Response)",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Middleware()"
              }
            }
          },
          "Resource": {
            "fully_qualified_name": "Drash.Http.Resource",
            "namespace": "Drash.Http",
            "name": "Resource",
            "description": [
              "This is the base resource class for all resources. All resource classes\nmust be derived from this class."
            ],
            "properties": {
              "middleware": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the middleware this resource uses.",
                  "All derived middleware classes MUST define this property as `static`\n(e.g., `static middleware = [\"MiddlewareClass\"];`)"
                ],
                "annotation": {
                  "line": "@property string[] middleware",
                  "data_type": "string[]",
                  "name": "middleware"
                },
                "signature": "public middleware: string[]",
                "name": "middleware",
                "fully_qualified_name": "Drash.Http.Resource.middleware"
              },
              "name": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the name of this resource. This property is used by\n`Drash.Http.Server` to help it store resources in its `resources`\nproperty by name."
                ],
                "annotation": {
                  "line": "@property string name",
                  "data_type": "string",
                  "name": "name"
                },
                "signature": "public name: string",
                "name": "name",
                "fully_qualified_name": "Drash.Http.Resource.name"
              },
              "paths": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the paths to access this resource.",
                  "All derived resource classes MUST define this property as `static`\n(e.g., `static paths = [\"path\"];`)"
                ],
                "annotation": {
                  "line": "@property string[] paths",
                  "data_type": "string[]",
                  "name": "paths"
                },
                "signature": "public paths: string[]",
                "name": "paths",
                "fully_qualified_name": "Drash.Http.Resource.paths"
              },
              "request": {
                "access_modifier": "protected",
                "description": [
                  "The request object."
                ],
                "annotation": {
                  "line": "@property ServerRequest request",
                  "data_type": "ServerRequest",
                  "name": "request"
                },
                "signature": "protected request: any",
                "name": "request",
                "fully_qualified_name": "Drash.Http.Resource.request"
              },
              "response": {
                "access_modifier": "protected",
                "description": [
                  "The response object."
                ],
                "annotation": {
                  "line": "@property Drash.Http.Response response",
                  "data_type": "Drash.Http.Response",
                  "name": "response"
                },
                "signature": "protected response: Drash.Http.Response",
                "name": "response",
                "fully_qualified_name": "Drash.Http.Resource.response"
              },
              "server": {
                "access_modifier": "protected",
                "description": [
                  "The server object."
                ],
                "annotation": {
                  "line": "@property Drash.Http.Server server",
                  "data_type": "Drash.Http.Server",
                  "name": "server"
                },
                "signature": "protected server: Drash.Http.Server",
                "name": "server",
                "fully_qualified_name": "Drash.Http.Resource.server"
              }
            },
            "methods": {}
          },
          "Response": {
            "fully_qualified_name": "Drash.Http.Response",
            "namespace": "Drash.Http",
            "name": "Response",
            "description": [
              "Response handles sending a response to the client making the request."
            ],
            "properties": {
              "body": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the body of this response."
                ],
                "annotation": {
                  "line": "@property any body",
                  "data_type": "any",
                  "name": "body"
                },
                "signature": "public body: any = {}",
                "name": "body",
                "fully_qualified_name": "Drash.Http.Response.body"
              },
              "headers": {
                "access_modifier": "public",
                "description": [
                  "A property to hold this response's headers."
                ],
                "annotation": {
                  "line": "@property Headers headers",
                  "data_type": "Headers",
                  "name": "headers"
                },
                "signature": "public headers: Headers",
                "name": "headers",
                "fully_qualified_name": "Drash.Http.Response.headers"
              },
              "request": {
                "access_modifier": "public",
                "description": [
                  "The request object."
                ],
                "annotation": {
                  "line": "@property ServerRequest request",
                  "data_type": "ServerRequest",
                  "name": "request"
                },
                "signature": "public request: any",
                "name": "request",
                "fully_qualified_name": "Drash.Http.Response.request"
              },
              "status_code": {
                "access_modifier": "public",
                "description": [
                  "A property to hold this response's status code (e.g., 200 for OK).\nThis class uses `Status` and `STATUS_TEXT` from the Deno Standard\nModules' http_status module for response codes."
                ],
                "annotation": {
                  "line": "@property number status_code",
                  "data_type": "number",
                  "name": "status_code"
                },
                "signature": "public status_code: number = Status.OK",
                "name": "status_code",
                "fully_qualified_name": "Drash.Http.Response.status_code"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [],
                    "annotation": {
                      "line": "@param ServerRequest request",
                      "data_type": "ServerRequest",
                      "name": "request"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(request)",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Response()"
              },
              "generateResponse": {
                "access_modifier": "public",
                "name": "generateResponse",
                "description": [
                  "Generate a response."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public generateResponse(): any",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Response.generateResponse"
              },
              "getStatusMessage": {
                "access_modifier": "public",
                "name": "getStatusMessage",
                "description": [
                  "Get the status message based on the status code."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns the status message associated with `this.status_code`. For\nexample, if the response's `status_code` is `200`, then this method\nwill return \"OK\" as the status message."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getStatusMessage(): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Response.getStatusMessage"
              },
              "getStatusMessageFull": {
                "access_modifier": "public",
                "name": "getStatusMessageFull",
                "description": [
                  "Get the full status message based on the status code. This is just the\nstatus code and the status message together (e.g., `200 (OK)`, `401\n(Unauthorized)`, etc.)."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getStatusMessageFull(): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Response.getStatusMessageFull"
              },
              "send": {
                "access_modifier": "public",
                "name": "send",
                "description": [
                  "Send the response to the client making the request."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns the output which is passed to `request.respond()`. The output\nis only returned for unit testing purposes. It is not intended to be\nused elsewhere as this call is the last call in the\nrequest-resource-response lifecycle."
                    ],
                    "annotation": {
                      "line": "@return Promise<any>",
                      "data_type": "Promise<any>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async send(): Promise<any>",
                "is_async": true,
                "fully_qualified_name": "Drash.Http.Response.send"
              },
              "sendStatic": {
                "access_modifier": "public",
                "name": "sendStatic",
                "description": [
                  "Send the response of a static asset (e.g., a CSS file, JS file, PDF\nfile, etc.) to the client making the request."
                ],
                "params": {
                  "file": {
                    "name": "file",
                    "description": [
                      "The file that will be served to the client."
                    ],
                    "annotation": {
                      "line": "@param string file",
                      "data_type": "string",
                      "name": "file"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return {status: number, headers: Headers, body: any}",
                      "data_type": "{status:",
                      "name": "number,"
                    }
                  }
                ],
                "throws": null,
                "signature": "public sendStatic(file: string):status: number, headers: Headers, body: any {",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Response.sendStatic"
              }
            }
          },
          "Server": {
            "fully_qualified_name": "Drash.Http.Server",
            "namespace": "Drash.Http",
            "name": "Server",
            "description": [
              "Server handles the entire request-resource-response lifecycle. It is in\ncharge of handling HTTP requests to resources, static paths, sending\nappropriate responses, and handling any errors that bubble up within the\nrequest-resource-response lifecycle."
            ],
            "properties": {
              "deno_server": {
                "access_modifier": "public",
                "description": [
                  "A property to hold the Deno server. This property is set in\n`this.run()` like so: ` this.deno_server =\nserve(this.configs.address);`. `serve()` is imported from\n[https://deno.land/x/http/server.ts](https://deno.land/x/http/server.ts)."
                ],
                "annotation": {
                  "line": "@property any deno_server",
                  "data_type": "any",
                  "name": "deno_server"
                },
                "signature": "public deno_server: any",
                "name": "deno_server",
                "fully_qualified_name": "Drash.Http.Server.deno_server"
              },
              "logger": {
                "access_modifier": "public",
                "description": [
                  "A property to hold this server's logger."
                ],
                "annotation": {
                  "line": "@property Drash.Loggers.ConsoleLogger|Drash.Loggers.FileLogger logger",
                  "data_type": "Drash.Loggers.ConsoleLogger|Drash.Loggers.FileLogger",
                  "name": "logger"
                },
                "signature": "public logger: Drash.CoreLoggers.ConsoleLogger | Drash.CoreLoggers.FileLogger",
                "name": "logger",
                "fully_qualified_name": "Drash.Http.Server.logger"
              },
              "configs": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold this server's configs."
                ],
                "annotation": {
                  "line": "@property any configs",
                  "data_type": "any",
                  "name": "configs"
                },
                "signature": "protected configs: ServerConfigs",
                "name": "configs",
                "fully_qualified_name": "Drash.Http.Server.configs"
              },
              "directory": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold the location of this server on the filesystem. This\nproperty is used when resolving static paths."
                ],
                "annotation": {
                  "line": "@property string directory",
                  "data_type": "string",
                  "name": "directory"
                },
                "signature": "protected directory: string",
                "name": "directory",
                "fully_qualified_name": "Drash.Http.Server.directory"
              },
              "resources": {
                "access_modifier": "protected",
                "description": [
                  "A property to hold the resources passed in from the configs."
                ],
                "annotation": {
                  "line": "@property any[] resources",
                  "data_type": "any[]",
                  "name": "resources"
                },
                "signature": "protected resources: any[] = []",
                "name": "resources",
                "fully_qualified_name": "Drash.Http.Server.resources"
              },
              "static_paths": {
                "access_modifier": "protected",
                "description": [
                  "This server's list of static paths. HTTP requests to a static path are\nusually intended to retrieve some type of concrete resource (e.g., a\nCSS file or a JS file). If an HTTP request is matched to a static path\nand the resource the HTTP request is trying to get is found, then\n`Drash.Http.Response` will use its `sendStatic()` method to send the\nstatic asset back to the client."
                ],
                "annotation": {
                  "line": "@property string[] static_paths",
                  "data_type": "string[]",
                  "name": "static_paths"
                },
                "signature": "protected static_paths: string[] = []",
                "name": "static_paths",
                "fully_qualified_name": "Drash.Http.Server.static_paths"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "configs": {
                    "name": "configs",
                    "description": [
                      "`address`: `string`",
                      "`logger`: `Drash.Loggers.ConsoleLogger|Drash.Loggers.FileLogger`",
                      "`response_output`: `string` (a proper MIME type)",
                      "`resources`: `Drash.Http.Resource[]`",
                      "`static_paths`: `string[]`"
                    ],
                    "annotation": {
                      "line": "@param any configs",
                      "data_type": "any",
                      "name": "configs"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(configs: ServerConfigs)",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server()"
              },
              "getRequest": {
                "access_modifier": "public",
                "name": "getRequest",
                "description": [
                  "Get the request object with more properties and methods."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns any \"request\" object with more properties and methods that\nDrash uses. For example, deno uses the `ServerRequest` object; and this\nmethod takes that object and hydrates it with more properties and\nmethods."
                    ],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async getRequest(request: any): Promise<any>",
                "is_async": true,
                "fully_qualified_name": "Drash.Http.Server.getRequest"
              },
              "handleHttpRequest": {
                "access_modifier": "public",
                "name": "handleHttpRequest",
                "description": [
                  "Handle an HTTP request from the Deno server."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "See `Drash.Http.Response.send()`."
                    ],
                    "annotation": {
                      "line": "@return Promise<any>",
                      "data_type": "Promise<any>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async handleHttpRequest(request): Promise<any>",
                "is_async": true,
                "fully_qualified_name": "Drash.Http.Server.handleHttpRequest"
              },
              "handleHttpRequestError": {
                "access_modifier": "public",
                "name": "handleHttpRequestError",
                "description": [
                  "Handle cases when an error is thrown when handling an HTTP request."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  },
                  "error": {
                    "name": "error",
                    "description": [
                      "The error object."
                    ],
                    "annotation": {
                      "line": "@param any error",
                      "data_type": "any",
                      "name": "error"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "See `Drash.Http.Response.send()`."
                    ],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public handleHttpRequestError(request: any, error: any, resource: Drash.Http.Resource = null, response: Drash.Http.Response = null): any",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.handleHttpRequestError"
              },
              "handleHttpRequestForFavicon": {
                "access_modifier": "public",
                "name": "handleHttpRequestForFavicon",
                "description": [
                  "Handle HTTP requests for the favicon. This method only exists to\nshort-circuit favicon requests--preventing the requests from clogging\nthe logs."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the response as stringified JSON. This is only used for unit\ntesting purposes."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public handleHttpRequestForFavicon(request): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.handleHttpRequestForFavicon"
              },
              "handleHttpRequestForStaticPathAsset": {
                "access_modifier": "public",
                "name": "handleHttpRequestForStaticPathAsset",
                "description": [
                  "Handle HTTP requests for static path assets."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the response as stringified JSON. This is only used for unit\ntesting purposes."
                    ],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public handleHttpRequestForStaticPathAsset(request): any",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.handleHttpRequestForStaticPathAsset"
              },
              "getResourceObject": {
                "access_modifier": "public",
                "name": "getResourceObject",
                "description": null,
                "params": {
                  "undefined": {
                    "description": [],
                    "annotation": {
                      "line": "@param request ",
                      "data_type": "request",
                      "name": null
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns an instance of the resourceClass passed in, and setting the\n`paths` and `middleware` properties"
                    ],
                    "annotation": {
                      "line": "@return resourceClass",
                      "data_type": "resourceClass",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getResourceObject(resourceClass: any, request: any): Resource",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.getResourceObject"
              },
              "run": {
                "access_modifier": "public",
                "name": "run",
                "description": [
                  "Run the Deno server at the address specified in the configs. This\nmethod takes each HTTP request and creates a new and more workable\nrequest object and passes it to\n`Drash.Http.Server.handleHttpRequest()`."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "This method just listens for requests at the address you provide in the\nconfigs."
                    ],
                    "annotation": {
                      "line": "@return Promise<void>",
                      "data_type": "Promise<void>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async run(options?: RunOptions): Promise<void>",
                "is_async": true,
                "fully_qualified_name": "Drash.Http.Server.run"
              },
              "close": {
                "access_modifier": "public",
                "name": "close",
                "description": [
                  "Close the server."
                ],
                "params": null,
                "returns": null,
                "throws": null,
                "signature": "public close(): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.close"
              },
              "addHttpResource": {
                "access_modifier": "protected",
                "name": "addHttpResource",
                "description": [
                  "Add an HTTP resource to the server which can be retrieved at specific\nURIs.",
                  "Drash defines an HTTP resource according to the MDN Web docs\n[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web)."
                ],
                "params": {
                  "resourceClass": {
                    "name": "resourceClass",
                    "description": [
                      "A child object of the `Drash.Http.Resource` class."
                    ],
                    "annotation": {
                      "line": "@param Drash.Http.Resource resourceClass",
                      "data_type": "Drash.Http.Resource",
                      "name": "resourceClass"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "This method just adds `resourceClass` to `this.resources` so it can be\nused (if matched) during an HTTP request."
                    ],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected addHttpResource(resourceClass: Drash.Http.Resource): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.addHttpResource"
              },
              "addMiddleware": {
                "access_modifier": "protected",
                "name": "addMiddleware",
                "description": [
                  "Add server-level and resource-level middleware."
                ],
                "params": {
                  "middleware": {
                    "name": "middleware",
                    "description": [],
                    "annotation": {
                      "line": "@param any middleware",
                      "data_type": "any",
                      "name": "middleware"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected addMiddleware(middleware: any): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.addMiddleware"
              },
              "addStaticPath": {
                "access_modifier": "protected",
                "name": "addStaticPath",
                "description": [
                  "Add a static path for serving static assets like CSS files, JS files,\nPDF files, etc."
                ],
                "params": {
                  "path": {
                    "name": "path",
                    "description": [],
                    "annotation": {
                      "line": "@param string path",
                      "data_type": "string",
                      "name": "path"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "This method just adds `path` to `this.static_paths` so it can be used (if\nmatched) during an HTTP request."
                    ],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected addStaticPath(path: string): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.addStaticPath"
              },
              "executeMiddlewareResourceLevelBeforeRequest": {
                "access_modifier": "protected",
                "name": "executeMiddlewareResourceLevelBeforeRequest",
                "description": [
                  "Execute resource-level middleware before the request."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  },
                  "resource": {
                    "name": "resource",
                    "description": [
                      "The resource object."
                    ],
                    "annotation": {
                      "line": "@param Drash.Http.Resource resource",
                      "data_type": "Drash.Http.Resource",
                      "name": "resource"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected executeMiddlewareResourceLevelBeforeRequest(request, resource): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.executeMiddlewareResourceLevelBeforeRequest"
              },
              "executeMiddlewareServerLevelBeforeRequest": {
                "access_modifier": "protected",
                "name": "executeMiddlewareServerLevelBeforeRequest",
                "description": [
                  "Execute server-level middleware before the request."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  },
                  "resource": {
                    "name": "resource",
                    "description": [
                      "The resource object."
                    ],
                    "annotation": {
                      "line": "@param Drash.Http.Resource resource",
                      "data_type": "Drash.Http.Resource",
                      "name": "resource"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected executeMiddlewareServerLevelBeforeRequest(request): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.executeMiddlewareServerLevelBeforeRequest"
              },
              "httpErrorResponse": {
                "access_modifier": "protected",
                "name": "httpErrorResponse",
                "description": null,
                "params": {
                  "code": {
                    "name": "code",
                    "description": [],
                    "annotation": {
                      "line": "@param number code",
                      "data_type": "number",
                      "name": "code"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return Drash.Exceptions.HttpException",
                      "data_type": "Drash.Exceptions.HttpException",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected httpErrorResponse(code: number): Drash.Exceptions.HttpException",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.httpErrorResponse"
              },
              "getResourceClass": {
                "access_modifier": "protected",
                "name": "getResourceClass",
                "description": [
                  "Get the resource class."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns a `Drash.Http.Resource` object if the URL path of the request\ncan be matched to a `Drash.Http.Resource` object's paths.",
                      "Returns `undefined` if a `Drash.Http.Resource` object can't be matched."
                    ],
                    "annotation": {
                      "line": "@return Drash.Http.Resource|undefined",
                      "data_type": "Drash.Http.Resource|undefined",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected getResourceClass(request): Drash.Http.Resource | undefined",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.getResourceClass"
              },
              "requestTargetsStaticPath": {
                "access_modifier": "protected",
                "name": "requestTargetsStaticPath",
                "description": [
                  "Is the request targeting a static path?"
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns true if the request targets a static path."
                    ],
                    "annotation": {
                      "line": "@return boolean",
                      "data_type": "boolean",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected requestTargetsStaticPath(request): boolean",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.requestTargetsStaticPath"
              },
              "logDebug": {
                "access_modifier": "protected",
                "name": "logDebug",
                "description": [
                  "Log a debug message"
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "Message to log"
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected logDebug(message: string): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Http.Server.logDebug"
              }
            }
          }
        },
        "Drash.Interfaces.LoggerConfigs": {
          "LoggerConfigs": {
            "exported": true,
            "name": "LoggerConfigs",
            "description": [
              "`enabled`: Is the logger enabled? This is useful if you have a config\nfile that can toggle this option between `true` and `false`.",
              "`level`: Options are `all`, `trace`, `debug`, `info`, `warn`, `error`, `fatal`, and `off`.",
              "`tag_string`: This only takes a string with tags as `{tag}`. For example, `{some_tag} | {some_tag} * {some_tag} [{some_tag}]`.",
              "`tag_string_fns`: This takes an object of key-value pairs where the key is the name of the tag defined in the `tag_string` config. This object is used to replace tags in the `tag_string` config by matching keys to tags and replacing tags with the values of the keys. For example, if `tag_string` was `{my_cool_tag}` and `tags_string_fns.my_cool_tag` returns `\"HELLO\"`, then `{my_cool_tag}` would be replaced with `HELLO`."
            ],
            "signature": "export interface LoggerConfigs {\n  ",
            "is_interface": true,
            "fully_qualified_name": "Drash.Interfaces.LoggerConfigs.LoggerConfigs"
          }
        },
        "Drash.CoreLoggers": {
          "ConsoleLogger": {
            "fully_qualified_name": "Drash.CoreLoggers.ConsoleLogger",
            "namespace": "Drash.CoreLoggers",
            "name": "ConsoleLogger",
            "description": [
              "This logger allows you to log messages to the console."
            ],
            "properties": {},
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "configs": {
                    "name": "configs",
                    "description": [
                      "See `Drash.CoreLoggers.Logger.configs`."
                    ],
                    "annotation": {
                      "line": "@param any configs",
                      "data_type": "any",
                      "name": "configs"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(configs: LoggerConfigs)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.ConsoleLogger()"
              },
              "write": {
                "access_modifier": "public",
                "name": "write",
                "description": [
                  "Write a log message to the console.",
                  "This method is not intended to be called directly. It is already used\nin the base class (`Logger`) and automatically called."
                ],
                "params": {
                  "logMethodLevelDefinition": {
                    "name": "logMethodLevelDefinition",
                    "description": [],
                    "annotation": {
                      "line": "@param any logMethodLevelDefinition",
                      "data_type": "any",
                      "name": "logMethodLevelDefinition"
                    }
                  },
                  "message": {
                    "name": "message",
                    "description": [],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the log message which is used for unit testing purposes."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public write(logMethodLevelDefinition: any, message: string): string|void",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.ConsoleLogger.write"
              }
            }
          },
          "FileLogger": {
            "fully_qualified_name": "Drash.CoreLoggers.FileLogger",
            "namespace": "Drash.CoreLoggers",
            "name": "FileLogger",
            "description": [
              "This logger allows you to log messages to a file."
            ],
            "properties": {
              "file": {
                "access_modifier": "protected",
                "description": [
                  "The file this logger will write log messages to."
                ],
                "annotation": {
                  "line": "@property string file",
                  "data_type": "string",
                  "name": "file"
                },
                "signature": "protected file: string",
                "name": "file",
                "fully_qualified_name": "Drash.CoreLoggers.FileLogger.file"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "configs": {
                    "name": "configs",
                    "description": [
                      "See `Drash.CoreLoggers.Logger.configs`."
                    ],
                    "annotation": {
                      "line": "@param LoggerConfigs configs",
                      "data_type": "LoggerConfigs",
                      "name": "configs"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(configs: LoggerConfigs)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.FileLogger()"
              },
              "write": {
                "access_modifier": "public",
                "name": "write",
                "description": [
                  "Write a log message to `this.file`.",
                  "This method is not intended to be called directly. It is already used\nin the base class (`Logger`) and automatically called."
                ],
                "params": {
                  "logMethodLevelDefinition": {
                    "name": "logMethodLevelDefinition",
                    "description": [],
                    "annotation": {
                      "line": "@param any logMethodLevelDefinition",
                      "data_type": "any",
                      "name": "logMethodLevelDefinition"
                    }
                  },
                  "message": {
                    "name": "message",
                    "description": [],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the log message which is used for unit testing purposes."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public write(logMethodLevelDefinition, message): string",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.FileLogger.write"
              }
            }
          },
          "Logger": {
            "fully_qualified_name": "Drash.CoreLoggers.Logger",
            "namespace": "Drash.CoreLoggers",
            "name": "Logger",
            "description": [
              "This Logger is the base logger class for all logger classes."
            ],
            "properties": {
              "configs": {
                "access_modifier": "protected",
                "description": [
                  "This logger's configs. See [LoggerConfigs](/#/api-reference/interfaces/logger-configs)."
                ],
                "annotation": {
                  "line": "@property any configs",
                  "data_type": "any",
                  "name": "configs"
                },
                "signature": "protected configs: LoggerConfigs",
                "name": "configs",
                "fully_qualified_name": "Drash.CoreLoggers.Logger.configs"
              },
              "current_log_message_level_name": {
                "access_modifier": "protected",
                "description": [
                  "The level of the log message currently being written."
                ],
                "annotation": {
                  "line": "@property string current_log_message_level_name",
                  "data_type": "string",
                  "name": "current_log_message_level_name"
                },
                "signature": "protected current_log_message_level_name: string",
                "name": "current_log_message_level_name",
                "fully_qualified_name": "Drash.CoreLoggers.Logger.current_log_message_level_name"
              }
            },
            "methods": {
              "constructor": {
                "access_modifier": "public",
                "name": "constructor",
                "description": [
                  "Construct an object of this class."
                ],
                "params": {
                  "configs": {
                    "name": "configs",
                    "description": [
                      "See [Drash.CoreLoggers.Logger.configs](/#/api-reference/loggers/logger#configs)."
                    ],
                    "annotation": {
                      "line": "@param any configs",
                      "data_type": "any",
                      "name": "configs"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "constructor(configs: LoggerConfigs)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger()"
              },
              "debug": {
                "access_modifier": "public",
                "name": "debug",
                "description": [
                  "Output a DEBUG level log message."
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "public debug(message)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.debug"
              },
              "error": {
                "access_modifier": "public",
                "name": "error",
                "description": [
                  "Output an ERROR level log message."
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "public error(message)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.error"
              },
              "fatal": {
                "access_modifier": "public",
                "name": "fatal",
                "description": [
                  "Output a FATAL level log message."
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "public fatal(message)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.fatal"
              },
              "info": {
                "access_modifier": "public",
                "name": "info",
                "description": [
                  "Output an INFO level log message."
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "public info(message)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.info"
              },
              "trace": {
                "access_modifier": "public",
                "name": "trace",
                "description": [
                  "Output a TRACE level log message."
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "public trace(message)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.trace"
              },
              "warn": {
                "access_modifier": "public",
                "name": "warn",
                "description": [
                  "Output a WARN level log message."
                ],
                "params": {
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": null,
                "throws": null,
                "signature": "public warn(message)",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.warn"
              },
              "getTagStringParsed": {
                "access_modifier": "protected",
                "name": "getTagStringParsed",
                "description": [
                  "Get the parsed version of the raw tag string."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected getTagStringParsed(): string",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.getTagStringParsed"
              },
              "sendToWriteMethod": {
                "access_modifier": "protected",
                "name": "sendToWriteMethod",
                "description": [
                  "Send the message to the write method (which should be in the child\nclass).  Also, do some prechecks before sending to see if the log\nmessage should be written."
                ],
                "params": {
                  "logMethodLevelDefinition": {
                    "name": "logMethodLevelDefinition",
                    "description": [
                      "The dictionary definition of the log message's level."
                    ],
                    "annotation": {
                      "line": "@param any logMethodLevelDefinition",
                      "data_type": "any",
                      "name": "logMethodLevelDefinition"
                    }
                  },
                  "message": {
                    "name": "message",
                    "description": [
                      "The log message."
                    ],
                    "annotation": {
                      "line": "@param string message",
                      "data_type": "string",
                      "name": "message"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the log message which is used for unit testing purposes."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "protected sendToWriteMethod(logMethodLevelDefinition, message): string",
                "is_async": false,
                "fully_qualified_name": "Drash.CoreLoggers.Logger.sendToWriteMethod"
              }
            }
          }
        },
        "Drash.Services": {
          "HttpService": {
            "fully_qualified_name": "Drash.Services.HttpService",
            "namespace": "Drash.Services",
            "name": "HttpService",
            "description": [
              "This class helps perform HTTP-related processes."
            ],
            "properties": {},
            "methods": {
              "getMimeType": {
                "access_modifier": "public",
                "name": "getMimeType",
                "description": [
                  "Get a MIME type for a file based on its extension."
                ],
                "params": {
                  "filePath": {
                    "name": "filePath",
                    "description": [
                      "The file path in question."
                    ],
                    "annotation": {
                      "line": "@param string filePath",
                      "data_type": "string",
                      "name": "filePath"
                    }
                  },
                  "fileIsUrl": {
                    "name": "fileIsUrl",
                    "description": [
                      "(optional) Is the file path  a URL to a file? Defaults to false.",
                      "If the file path is a URL, then this method will make sure the URL\nquery string is not included while doing a lookup of the file's\nextension."
                    ],
                    "annotation": {
                      "line": "@param boolean fileIsUrl",
                      "data_type": "boolean",
                      "name": "fileIsUrl"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the name of the MIME type based on the extension of the\nfile path ."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getMimeType(filePath: string, fileIsUrl: boolean = false): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpService.getMimeType"
              }
            }
          },
          "HttpRequestService": {
            "fully_qualified_name": "Drash.Services.HttpRequestService",
            "namespace": "Drash.Services",
            "name": "HttpRequestService",
            "description": [
              "This class helps perform HTTP request related processes."
            ],
            "properties": {},
            "methods": {
              "getRequestBodyFile": {
                "access_modifier": "public",
                "name": "getRequestBodyFile",
                "description": [
                  "Parse this request's body as `multipart/form-data` and get the\nrequested input."
                ],
                "params": {
                  "file": {
                    "name": "file",
                    "description": [
                      "The file to get by its name."
                    ],
                    "annotation": {
                      "line": "@param string file",
                      "data_type": "string",
                      "name": "file"
                    }
                  },
                  "maxMemory": {
                    "name": "maxMemory",
                    "description": [
                      "The max memory to allocate for this process. Defaults to 1MB."
                    ],
                    "annotation": {
                      "line": "@param number maxMemory",
                      "data_type": "number",
                      "name": "maxMemory"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns a body as a parsable JSON object where the first level of keys\nare the names of the parts. For example, if the name of the first part\nis `file_number_one`, then it will be accessible in the returned object\nas `{returned_object}.file_number_one`."
                    ],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getRequestBodyFile(parsedBody: ParsedBody, input: string): any",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getRequestBodyFile"
              },
              "getRequestBodyParam": {
                "access_modifier": "public",
                "name": "getRequestBodyParam",
                "description": [
                  "Get the value of one of this request's body params by its input name.\nFirst, check the Content-Type of the request so that we know how to\nparse the body. Then parse the body accordingly and retrieve the\nrequested value."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getRequestBodyParam(parsedBody: ParsedBody, input: string): any",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getRequestBodyParam"
              },
              "getRequestHeaderParam": {
                "access_modifier": "public",
                "name": "getRequestHeaderParam",
                "description": [
                  "Get the value of one of this request's headers by its input name."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getRequestHeaderParam(request: any, input: string): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getRequestHeaderParam"
              },
              "getRequestPathParam": {
                "access_modifier": "public",
                "name": "getRequestPathParam",
                "description": [
                  "Get the value of one of this request's path params by its input name."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getRequestPathParam(request: any, input: string): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getRequestPathParam"
              },
              "getRequestUrlQueryParam": {
                "access_modifier": "public",
                "name": "getRequestUrlQueryParam",
                "description": [
                  "Get the value of one of this request's query params by its input name."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getRequestUrlQueryParam(request: any, input: string): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getRequestUrlQueryParam"
              },
              "getResponseContentType": {
                "access_modifier": "public",
                "name": "getResponseContentType",
                "description": [
                  "Get the request's requested content type.",
                  "There are three ways to get this value: (1) the request's headers by\nsetting `Response-Content-Type: \"type\"`, (2) the request's URL query\nparams by setting `?response_content_type=type`, and the request's body\nby setting `{response_content_type: \"type\"}`.",
                  "The request's body takes precedence over all other settings.",
                  "The request's URL query params takes precedence over the header setting\nand the default setting.",
                  "The request's header setting takes precedence over the default setting.",
                  "If no content type is specified by the request's body, URL query\nparams, or header, then the default content type will be used. The\ndefault content type is the content type defined in the\n`Drash.Http.Server` object's `response_output` config. If a default is\nnot specified, then \"application/json\" will be used."
                ],
                "params": null,
                "returns": null,
                "throws": null,
                "signature": "public getResponseContentType(request: any, defaultContentType: string = \"application/json\"): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getResponseContentType"
              },
              "getUrlPath": {
                "access_modifier": "public",
                "name": "getUrlPath",
                "description": [
                  "Get this request's URL path."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns the URL path."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getUrlPath(request): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getUrlPath"
              },
              "getUrlQueryParams": {
                "access_modifier": "public",
                "name": "getUrlQueryParams",
                "description": [
                  "Get the request's URL query params by parsing its URL query string."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [
                      "The request object."
                    ],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the URL query string in key-value pair format."
                    ],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getUrlQueryParams(request: any): any",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getUrlQueryParams"
              },
              "getUrlQueryString": {
                "access_modifier": "public",
                "name": "getUrlQueryString",
                "description": [
                  "Get the specified HTTP request's URL query string."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns the URL query string (e.g., key1=value1&key2=value2) without\nthe leading \"?\" character."
                    ],
                    "annotation": {
                      "line": "@return string",
                      "data_type": "string",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getUrlQueryString(request: any): string",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.getUrlQueryString"
              },
              "hasBody": {
                "access_modifier": "public",
                "name": "hasBody",
                "description": [
                  "Does the specified request have a body?"
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns `true` if the request has a body. Returns `false` if not."
                    ],
                    "annotation": {
                      "line": "@return Promise<boolean>",
                      "data_type": "Promise<boolean>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async hasBody(request: any): Promise<boolean>",
                "is_async": true,
                "fully_qualified_name": "Drash.Services.HttpRequestService.hasBody"
              },
              "hydrate": {
                "access_modifier": "public",
                "name": "hydrate",
                "description": [
                  "Hydrate the specified request object."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns a hydrated request object. For example, deno uses the\n`ServerRequest` object. This method takes that object and adds more\nporperties and methods to it. This makes it easier for Drash to process\nthe object for its own purposes."
                    ],
                    "annotation": {
                      "line": "@return Promise<boolean>",
                      "data_type": "Promise<boolean>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async hydrate(request: any, options?: OptionsConfig): Promise<boolean>",
                "is_async": true,
                "fully_qualified_name": "Drash.Services.HttpRequestService.hydrate"
              },
              "parseBody": {
                "access_modifier": "public",
                "name": "parseBody",
                "description": [
                  "Parse the specified request's body."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  },
                  "options": {
                    "name": "options",
                    "description": [],
                    "annotation": {
                      "line": "@param OptionsConfig options",
                      "data_type": "OptionsConfig",
                      "name": "options"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the content type of the body, and based on this\nthe body itself in that format. If there is no body, it\nreturns an empty properties"
                    ],
                    "annotation": {
                      "line": "@returns {content_type: string, data: any}",
                      "data_type": "{content_type:",
                      "name": "string,"
                    }
                  }
                ],
                "throws": null,
                "signature": "public async parseBody(request: any, options: OptionsConfig): Promise<ParsedBody>",
                "is_async": true,
                "fully_qualified_name": "Drash.Services.HttpRequestService.parseBody"
              },
              "parseBodyAsFormUrlEncoded": {
                "access_modifier": "public",
                "name": "parseBodyAsFormUrlEncoded",
                "description": [
                  "Parse this request's body as application/x-www-form-url-encoded."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "Returns an empty object if no body exists, else a key/value pair\narray e.g. returnValue['someKey']"
                    ],
                    "annotation": {
                      "line": "@return Promise<object|Array<>>",
                      "data_type": "Promise<object|Array<>>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async parseBodyAsFormUrlEncoded(request: any): Promise<object|Array<any>>",
                "is_async": true,
                "fully_qualified_name": "Drash.Services.HttpRequestService.parseBodyAsFormUrlEncoded"
              },
              "parseBodyAsJson": {
                "access_modifier": "public",
                "name": "parseBodyAsJson",
                "description": [
                  "Parse this request's body as application/json."
                ],
                "params": null,
                "returns": [
                  {
                    "description": [
                      "JSON object - the decoded request body"
                    ],
                    "annotation": {
                      "line": "@return Promise<object>",
                      "data_type": "Promise<object>",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public async parseBodyAsJson(request: any): Promise<object>",
                "is_async": true,
                "fully_qualified_name": "Drash.Services.HttpRequestService.parseBodyAsJson"
              },
              "parseBodyAsMultipartFormData": {
                "access_modifier": "public",
                "name": "parseBodyAsMultipartFormData",
                "description": [
                  "Parse this request's body as multipart/form-data."
                ],
                "params": {
                  "body": {
                    "name": "body",
                    "description": [
                      "The request's body."
                    ],
                    "annotation": {
                      "line": "@param Reader body",
                      "data_type": "Reader",
                      "name": "body"
                    }
                  },
                  "boundary": {
                    "name": "boundary",
                    "description": [
                      "The boundary of the part (e.g., `----------437192313`)"
                    ],
                    "annotation": {
                      "line": "@param string boundary",
                      "data_type": "string",
                      "name": "boundary"
                    }
                  },
                  "maxMemory": {
                    "name": "maxMemory",
                    "description": [
                      "The maximum memory to allocate to this process in megabytes."
                    ],
                    "annotation": {
                      "line": "@param number maxMemory",
                      "data_type": "number",
                      "name": "maxMemory"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returned values can be seen here (look for `readForm`:\nhttps://deno.land/std@v0.32.0/mime/multipart.ts"
                    ],
                    "annotation": {
                      "line": "@return Promise<{ [key: string]: string | FormFile }>",
                      "data_type": "Promise<{",
                      "name": "[key:"
                    }
                  }
                ],
                "throws": null,
                "signature": "public async parseBodyAsMultipartFormData(body: Reader, boundary: string, maxMemory: number): Promise< [key: string]: string | FormFile > {",
                "is_async": true,
                "fully_qualified_name": "Drash.Services.HttpRequestService.parseBodyAsMultipartFormData"
              },
              "setHeaders": {
                "access_modifier": "public",
                "name": "setHeaders",
                "description": [
                  "Set headers on the request."
                ],
                "params": {
                  "request": {
                    "name": "request",
                    "description": [],
                    "annotation": {
                      "line": "@param any request",
                      "data_type": "any",
                      "name": "request"
                    }
                  },
                  "headers": {
                    "name": "headers",
                    "description": [],
                    "annotation": {
                      "line": "@param any headers",
                      "data_type": "any",
                      "name": "headers"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [],
                    "annotation": {
                      "line": "@return void",
                      "data_type": "void",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public setHeaders(request: any, headers: Headers): void",
                "is_async": false,
                "fully_qualified_name": "Drash.Services.HttpRequestService.setHeaders"
              }
            }
          }
        },
        "Drash.Util": {
          "ObjectParser": {
            "fully_qualified_name": "Drash.Util.ObjectParser",
            "namespace": "Drash.Util",
            "name": "ObjectParser",
            "description": [
              "A util class to help parse objects."
            ],
            "properties": {},
            "methods": {
              "getNestedPropertyValue": {
                "access_modifier": "public",
                "name": "getNestedPropertyValue",
                "description": [
                  "Get the value of a deeply nested property."
                ],
                "params": {
                  "inputObject": {
                    "name": "inputObject",
                    "description": [
                      "The object containing the deeply nested property."
                    ],
                    "annotation": {
                      "line": "@param any inputObject",
                      "data_type": "any",
                      "name": "inputObject"
                    }
                  },
                  "properties": {
                    "name": "properties",
                    "description": [
                      "The rest of the arguments as strings to use as property names when\nfinding the nested property's value. The last argument that the rest\nparameter finds is the nested property you are targeting."
                    ],
                    "annotation": {
                      "line": "@param ...string properties",
                      "data_type": "...string",
                      "name": "properties"
                    }
                  }
                },
                "returns": [
                  {
                    "description": [
                      "Returns the value of the targeted property."
                    ],
                    "annotation": {
                      "line": "@return any",
                      "data_type": "any",
                      "name": null
                    }
                  }
                ],
                "throws": null,
                "signature": "public getNestedPropertyValue(inputObject: any, ...properties)",
                "is_async": false,
                "fully_qualified_name": "Drash.Util.ObjectParser.getNestedPropertyValue"
              }
            }
          }
        },
        "Drash.Util.Exports": {
          "ColorizeOptions": {
            "exported": true,
            "name": "ColorizeOptions",
            "description": [
              "An interface to hold the `colorize()` function's options."
            ],
            "signature": "export interface ColorizeOptions {\n  color?: string;\n  background?: string;\n  style?: string;\n}",
            "is_interface": true,
            "fully_qualified_name": "Drash.Util.Exports.ColorizeOptions"
          },
          "colorize": {
            "exported": true,
            "name": "colorize",
            "description": [
              "A util function that helps colorize text in the console."
            ],
            "params": {
              "message": {
                "name": "message",
                "description": [
                  "The text to colorize."
                ],
                "annotation": {
                  "line": "@param string message",
                  "data_type": "string",
                  "name": "message"
                }
              },
              "options": {
                "name": "options",
                "description": [
                  "See `Drash.Utils.Exports.ColorizeOptions` interface."
                ],
                "annotation": {
                  "line": "@param ColorizeOptions options",
                  "data_type": "ColorizeOptions",
                  "name": "options"
                }
              }
            },
            "returns": [
              {
                "description": [
                  "Returns the colorized message."
                ],
                "annotation": {
                  "line": "@return string",
                  "data_type": "string",
                  "name": null
                }
              }
            ],
            "throws": null,
            "signature": "export function colorize(message: string, options: ColorizeOptions): string",
            "is_function": true,
            "fully_qualified_name": "Drash.Util.Exports.colorize"
          },
          "getFileSystemStructure": {
            "exported": true,
            "name": "getFileSystemStructure",
            "description": [
              "Get the filesystem structure of the directory (recursively)."
            ],
            "params": null,
            "returns": [
              {
                "description": [
                  "Returns the following object:\n{\nbasename: \"filename\",\nextension: extension, // does not account for .min.extension or similar extensions\nfilename: filename.extension,\npath: \"/path/to/the/file/dir/filename.extension\",\npathname: \"/path/to/the/file/dir\",\nsnake_cased: filename_extension\n}"
                ],
                "annotation": {
                  "line": "@return string",
                  "data_type": "string",
                  "name": null
                }
              }
            ],
            "throws": null,
            "signature": "export function getFileSystemStructure(dir: string): any",
            "is_function": true,
            "fully_qualified_name": "Drash.Util.Exports.getFileSystemStructure"
          }
        }
      }
    }
  }
};