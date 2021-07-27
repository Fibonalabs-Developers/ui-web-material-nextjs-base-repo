## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

#### pages

Each file in **pages/** is associated with a route based on its filename

#### src/api

for API services

#### src/lib

3rd party libraries

#### src/components

common components for application

#### src/views

module specific components

#### src/utils

miscellaneous/helper code

#### src/types

types/interface for application

#### src/assets

Application Assets

## Scripts

Linting

```bash
npm run lint
```

## Tools

[QuickType](https://app.quicktype.io/?l=ts) used to generate typescript interfaces. Converts JSON to interfaces

## Docker

Run as a docker:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Reference

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Feature Flags

Refer the index.tsx for the template

We have the generic function under src/utils/hasPermissions.ts where we can pass the features, moduleId and the key as parameters to get the permission.

Example Usage:

-Sample feature json

```bash

import { hasPermissions,PermissionTypes } from '@/src/utils/hasPermissions'

const features: Record<number, PermissionTypes> = {
        '1': {
            name: 'login',
            canEdit: true,
            canCreate: true,
            display: false,
        },
        '2': {
            name: 'adminDashboard',
            canEdit: true,
            canCreate: true,
            display: true,
        },
        '101': {
            name: 'Signup',
            canEdit: true,
            canCreate: true,
            display: true,
        },
    }

```

-   For checking Display permission

```bash

{hasPermissions(features , { moduleId: 2, key: 'display' }) ? <button> login</button> : null}
```

-   For checking create permission

```bash

{hasPermissions(features, { moduleId: 2, key: 'canCreate' }) ? <button> login</button> : null}
```

-   For checking Edit permission

```bash

{hasPermissions(features, { moduleId: 2, key: 'canEdit' }) ? <button> login</button> : null}
```

-   For checking Delete permission

```bash

{hasPermissions(features, { moduleId: 2, key: 'canDelete' }) ? <button> login</button> : null}
```
