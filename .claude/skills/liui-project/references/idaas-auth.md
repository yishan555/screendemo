# IDaaS & EIAM Authentication Configuration

Complete guide for integrating IDaaS login system and EIAM permission management into LiUI projects.

## Overview

Fed-cli provides the `@chehejia/fed-cli-auth` integration package to quickly integrate:
- **IDaaS**: Identity as a Service - Unified login system
- **EIAM**: Enterprise Identity and Access Management - Permission control system

## Prerequisites

- Project created with IDaaS/EIAM option enabled
- Access to IDaaS/EIAM admin platform
- Application registered in IDaaS/EIAM platform

## Quick Setup

### 1. Enable Authentication

Edit `config/common.ts`:

```typescript
export default {
  // Enable authentication and permission system
  auth: true, // Set to true to enable EIAM permissions

  // Other configurations...
}
```

**Note:**
- `auth: true` enables both login and permission management
- `auth: false` enables only login system (no route permissions)

### 2. Configure IDaaS Settings

Edit `config/idaas.ts`:

```typescript
export default {
  // Application ID from IDaaS platform
  applicationId: 'your-application-id',

  // Service ID from EIAM platform
  serviceId: 'your-service-id',

  // Permission code prefix
  authPrefix: 'your-auth-prefix',

  // Additional external services (optional)
  externalServices: [
    'external-service-id-1',
    'external-service-id-2',
  ],
}
```

### 3. Configure CORS Domains

In IDaaS/EIAM admin platform:

1. Navigate to application settings
2. Add allowed domains for CORS
3. **Important:** Production domains must use HTTPS

**Example domains:**
- Development: `http://localhost:3000`
- Testing: `https://test.example.com`
- Production: `https://example.com`

### 4. Configure Permissions

In EIAM platform:

1. Navigate to permission management
2. Create menu/route permissions with unique `code` values
3. Assign permissions to users/roles
4. **Note:** Changes take ~5 minutes to propagate. Users must re-login for changes to take effect.

## Environment Configuration

### Testing Environment

Use IDaaS/EIAM **ontest** environment for all testing:

```typescript
// config/idaas.ts
export default {
  environment: 'ontest', // Testing environment
  applicationId: 'test-app-id',
  serviceId: 'test-service-id',
  // ...
}
```

### Production Environment

Use IDaaS/EIAM **prod** environment for production:

```typescript
// config/idaas.ts
export default {
  environment: 'prod', // Production environment
  applicationId: 'prod-app-id',
  serviceId: 'prod-service-id',
  // ...
}
```

## Permission Control

### Route Permissions

Control route access via `meta.authTag` in route configuration:

```typescript
// src/router/index.ts or route files
import type { RouteRecordRaw } from 'vue-router'

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: 'Dashboard',
      authTag: 'dashboard:view', // Permission code from EIAM
    },
  },
  {
    path: '/users',
    name: 'UserManagement',
    component: () => import('@/views/users/index.vue'),
    meta: {
      title: 'User Management',
      authTag: 'user:manage', // Permission code from EIAM
    },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/users/list.vue'),
        meta: {
          title: 'User List',
          authTag: 'user:list', // Separate permission for child route
        },
      },
    ],
  },
]
```

**Behavior:**
- Routes without matching permissions are automatically filtered out
- Users without any permissions see 403 page
- Permissions are checked on route navigation

### Button/Action Permissions

Use the built-in permission check utility:

```vue
<script setup lang="ts">
import { usePermission } from '@chehejia/fed-cli-auth'

const { hasPermission } = usePermission()

// Check single permission
const canDelete = hasPermission('user:delete')

// Check multiple permissions (OR logic)
const canEdit = hasPermission(['user:edit', 'user:update'])
</script>

<template>
  <div>
    <LiButton v-if="canDelete" type="danger" @click="handleDelete">
      Delete User
    </LiButton>

    <LiButton v-if="hasPermission('user:create')" type="primary">
      Create User
    </LiButton>
  </div>
</template>
```

**Permission directive (alternative):**

```vue
<template>
  <LiButton v-permission="'user:delete'" type="danger">
    Delete
  </LiButton>

  <!-- Multiple permissions (OR) -->
  <LiButton v-permission="['user:edit', 'user:update']" type="primary">
    Edit
  </LiButton>
</template>
```

## Getting Required IDs

### Application ID

1. Log in to IDaaS admin platform
2. Navigate to **Applications** → Your application
3. Copy **Application ID** from settings
4. Paste into `config/idaas.ts` → `applicationId`

### Service ID

1. Log in to EIAM admin platform
2. Navigate to **Services** → Your service
3. Copy **Service ID** from settings
4. Paste into `config/idaas.ts` → `serviceId`

### Auth Prefix

The auth prefix is used to namespace your permissions:

```typescript
authPrefix: 'myapp' // Permissions become: myapp:dashboard:view
```

**Convention:** Use lowercase application abbreviation

## Permission Code Conventions

Recommended permission code format:

```
{prefix}:{resource}:{action}
```

**Examples:**
- `app:user:view` - View users
- `app:user:create` - Create users
- `app:user:edit` - Edit users
- `app:user:delete` - Delete users
- `app:dashboard:view` - View dashboard
- `app:report:export` - Export reports

**Best practices:**
- Use consistent naming
- Group by resource
- Use clear action verbs (view, create, edit, delete, export, import)
- Avoid overly granular permissions

## Multiple Services

If your application needs to access multiple EIAM services:

```typescript
// config/idaas.ts
export default {
  applicationId: 'main-app-id',
  serviceId: 'primary-service-id',
  authPrefix: 'myapp',

  // Additional services
  externalServices: [
    'shared-service-id',      // Shared service permissions
    'admin-service-id',       // Admin panel permissions
  ],
}
```

Permissions from all services are combined and available.

## Login Flow

### Automatic Login

When authentication is enabled:

1. User visits application
2. If not logged in, automatically redirects to IDaaS login page
3. User enters credentials
4. IDaaS redirects back to application with token
5. Application fetches user info and permissions
6. User is granted access to authorized routes

### User Info Access

```typescript
import { useUserInfo } from '@chehejia/fed-cli-auth'

const { userInfo, permissions } = useUserInfo()

// userInfo contains:
// - id: User ID
// - name: User name
// - email: User email
// - roles: User roles
// - departments: User departments

// permissions contains:
// - Array of permission codes the user has
```

## Watermark System

If watermark is enabled during project creation, user information watermark is automatically added:

```typescript
// Watermark is auto-configured with:
// - User name
// - User ID or email
// - Current timestamp
```

To customize watermark:

```typescript
import { useWatermark } from '@chehejia/fed-cli-auth'

const { setWatermark, clearWatermark } = useWatermark()

// Custom watermark
setWatermark({
  content: 'Custom Watermark Text',
  fontSize: 16,
  opacity: 0.1,
})

// Clear watermark
clearWatermark()
```

## Alternative: User Center Login

For simpler projects without permission requirements:

**Features:**
- Basic login/logout functionality
- User info access
- No route permission control
- No additional configuration needed

**Use case:** Simple applications without role-based access control

## Troubleshooting

### No Menu Permissions

**Symptom:** User logs in but sees 403 page

**Causes:**
1. User has no permissions assigned in EIAM
2. Permissions not yet propagated (wait 5 minutes)
3. User needs to re-login after permission changes
4. `meta.authTag` codes don't match EIAM permission codes

**Solutions:**
1. Verify user has permissions in EIAM platform
2. Wait 5 minutes after permission changes
3. Ask user to logout and login again
4. Check permission codes match exactly (case-sensitive)

### CORS Errors

**Symptom:** Login redirect fails with CORS error

**Causes:**
1. Domain not configured in IDaaS CORS settings
2. Using HTTP in production (must use HTTPS)
3. Domain mismatch between application and IDaaS config

**Solutions:**
1. Add domain to CORS whitelist in IDaaS platform
2. Use HTTPS for all production domains
3. Verify domain exactly matches configured domain

### Permission Check Always False

**Symptom:** `hasPermission()` always returns false

**Causes:**
1. `config/common.ts` has `auth: false`
2. Permission codes don't match
3. User doesn't have permission in EIAM
4. Permissions not loaded yet

**Solutions:**
1. Set `auth: true` in `config/common.ts`
2. Verify permission codes match EIAM (case-sensitive)
3. Check user permissions in EIAM platform
4. Ensure permissions are loaded before checking

### Login Loop

**Symptom:** Continuously redirects to login page

**Causes:**
1. Invalid application ID or service ID
2. Token storage issues
3. CORS configuration problems

**Solutions:**
1. Verify IDs in `config/idaas.ts` match IDaaS platform
2. Check browser localStorage/sessionStorage
3. Clear browser cache and cookies
4. Verify CORS domains configured correctly

## Advanced Configuration

For advanced use cases and additional options, refer to:
- `@chehejia/fed-cli-auth` package documentation
- IDaaS official documentation
- EIAM platform user guide

## Best Practices

1. **Test Thoroughly**: Test all permission scenarios in testing environment
2. **Document Permissions**: Maintain a list of all permission codes and their meanings
3. **Graceful Degradation**: Show appropriate messages when users lack permissions
4. **Regular Audits**: Periodically review user permissions
5. **Separate Environments**: Use separate application IDs for test/production
6. **Cache Permissions**: Permission checks are cached for performance
7. **Re-login After Changes**: Remind users to re-login after permission updates
