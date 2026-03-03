# Apidoc API Generation Configuration

Complete guide for generating TypeScript API methods and types from Apidoc documentation.

## Overview

Fed-cli can automatically generate:
- TypeScript request methods for each API endpoint
- TypeScript type definitions for request/response
- Organized API files by category
- Integration with your axios instance

## Prerequisites

1. Project has `fed.cli.config.js` in root directory
2. Apidoc project token is available
3. Axios request instance is configured in project

## Configuration File

### Location
`fed.cli.config.js` in project root directory

### Structure

```javascript
module.exports = {
  // Project basic info (auto-generated, do not modify)
  project: {
    category: 'b',      // b: B2B, c: B2C
    type: 'vue3-pc',    // Template type
    pkgManager: 'pnpm', // Default package manager
  },

  // Apidoc configuration (can have multiple projects)
  apidoc: [
    {
      // Project name/code (English, used for naming)
      name: 'MyProject',

      // Project token from Apidoc settings
      token: 'your-apidoc-token-here',

      // Output directory
      outDir: './src/apis',

      // Axios instance export name
      exportName: 'request',

      // Path to axios instance file
      requestFilePath: '@/utils/request',
    },
    // Additional projects...
  ]
};
```

### Configuration Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✓ | Project identifier (used in generated file names and variable names) |
| `token` | string | ✓ | Apidoc project token |
| `outDir` | string | ✓ | Output directory for generated files |
| `exportName` | string | ✓ | Name of the axios instance export |
| `requestFilePath` | string | ✓ | Import path to axios instance file |

### Multiple Projects

For multiple apidoc projects, add multiple objects to the `apidoc` array with different `name` values:

```javascript
apidoc: [
  {
    name: 'UserService',
    token: 'token-1',
    outDir: './src/apis/user',
    exportName: 'request',
    requestFilePath: '@/utils/request',
  },
  {
    name: 'ProductService',
    token: 'token-2',
    outDir: './src/apis/product',
    exportName: 'request',
    requestFilePath: '@/utils/request',
  },
]
```

## Getting Apidoc Token

1. Open your Apidoc project
2. Navigate to **设置 (Settings)** → **Token配置 (Token Configuration)**
3. Copy the project token
4. Paste into `fed.cli.config.js` → `apidoc[].token` field

**Important:** Ensure Apidoc field names and types are correct before generation. Incorrect types will cause TypeScript errors.

## Generation Commands

### Generate All APIs

```bash
fed api
```

Generates TypeScript files for all API endpoints in the project.

**First run:** Automatically downloads the API generation plugin, then fetches and generates all API methods and types.

### Interactive Mode

```bash
fed api -i
# or
fed api --interactive
```

**Features:**
- Select specific API categories to generate
- Navigate with arrow keys, select with spacebar
- Solid dot = selected, hollow dot = unselected
- Press Enter to confirm selection

**Use cases:**
- Only need specific API modules
- Want to avoid generating unchanged APIs
- Testing specific endpoints

### Force Regeneration

```bash
fed api -f
# or
fed api --force
```

**Behavior:**
- Bypasses diff algorithm
- Regenerates all files regardless of changes
- Use when files are corrupted or manually modified

## Generated File Structure

### Output Directory

Files are generated in the `outDir` specified in configuration:

```
src/apis/
├── index.ts              # Barrel export file
├── user.ts               # User-related APIs
├── product.ts            # Product-related APIs
├── types/                # TypeScript types
│   ├── user.d.ts
│   └── product.d.ts
```

### Generated API Method Example

```typescript
// src/apis/user.ts
import request from '@/utils/request'
import type { UserInfo, UserListResponse } from './types/user'

/**
 * Get user information
 * @param userId User ID
 */
export function getUserInfo(userId: string) {
  return request<UserInfo>({
    url: `/api/user/${userId}`,
    method: 'GET',
  })
}

/**
 * Get user list
 * @param params Query parameters
 */
export function getUserList(params: {
  page: number
  pageSize: number
  keyword?: string
}) {
  return request<UserListResponse>({
    url: '/api/user/list',
    method: 'GET',
    params,
  })
}
```

### Generated Type Definition Example

```typescript
// src/apis/types/user.d.ts
export interface UserInfo {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface UserListResponse {
  total: number
  list: UserInfo[]
  page: number
  pageSize: number
}
```

## Usage in Components

### Import Generated APIs

```typescript
import { getUserInfo, getUserList } from '@/apis/user'
import type { UserInfo } from '@/apis/types/user'
```

### Use in Vue Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { getUserInfo } from '@/apis/user'
import type { UserInfo } from '@/apis/types/user'

const userInfo = ref<UserInfo>()

async function fetchUser(userId: string) {
  try {
    const result = await getUserInfo(userId)
    userInfo.value = result
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}
</script>
```

## Axios Instance Configuration

The generated code imports your axios instance. Ensure it's properly configured:

```typescript
// src/utils/request.ts
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// Request interceptor
request.interceptors.request.use(
  config => {
    // Add auth token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor
request.interceptors.response.use(
  response => response.data,
  error => {
    // Handle errors
    return Promise.reject(error)
  }
)

export default request
```

## Diff Algorithm

By default, `fed api` uses a diff algorithm to:
- Only regenerate changed API endpoints
- Preserve manual modifications to files (when possible)
- Improve generation speed

**Bypass with:** `fed api -f` to force full regeneration

## Best Practices

1. **Verify Apidoc accuracy**: Ensure field names and types in Apidoc are correct before generation
2. **Use interactive mode**: Generate only needed categories during development
3. **Commit generated files**: Track generated API files in version control
4. **Update regularly**: Run `fed api` when backend APIs change
5. **Don't manually edit generated files**: Changes may be overwritten. Use wrapper functions if customization needed.
6. **Multiple projects**: Use different `name` values and `outDir` to organize APIs from different services

## Troubleshooting

### Token Invalid

**Error:** Authentication failed or 401 response

**Solution:**
1. Verify token in Apidoc settings
2. Check token is correctly copied to `fed.cli.config.js`
3. Ensure no extra spaces or characters

### Wrong Output Directory

**Error:** Files generated in unexpected location

**Solution:**
- Check `outDir` path in configuration
- Use relative paths from project root (e.g., `./src/apis`)
- Ensure directory exists or will be created

### Axios Instance Not Found

**Error:** Cannot find module '@/utils/request'

**Solution:**
- Verify `requestFilePath` matches actual file location
- Check path alias configuration in `vite.config.ts` or `tsconfig.json`
- Ensure axios instance file exists

### Type Errors

**Error:** TypeScript errors in generated files

**Solution:**
1. Check Apidoc field types are correct
2. Ensure response structures match documentation
3. Run `fed api -f` to force clean regeneration
4. Verify axios response interceptor returns correct data shape

## Integration with Mock

Apidoc supports mock functionality. To use mock data:

1. Enable mock for specific APIs in Apidoc dashboard
2. Configure mock rules and responses
3. Update base URL to point to Apidoc mock server during development
4. Generated methods will automatically use mock data

This enables parallel frontend/backend development when APIs aren't ready yet.
