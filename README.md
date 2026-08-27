# My Library

A responsive React and Firebase bookshop with reader, administrator, and delivery workflows.

## Features

- Search, language filters, sorting, categories, book details, and favorites
- Firebase Authentication with role-aware routes
- Live Firestore cart and atomic order placement using current catalog prices
- Customer order history and delivery status tracking
- Staff order workspace with searchable status management
- Admin catalog management for titles, prices, stock, covers, and descriptions
- Firestore and Storage rules enforcing ownership and staff permissions

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the Firebase web app values. The checked-in development defaults still point to the original Firebase project.
3. Enable **Email/Password** under Firebase Console > Authentication > Sign-in method.
4. Deploy the rules with `firebase deploy --only firestore:rules,storage`.
5. Start the app with `npm run dev` and open the printed local URL.

Run `npm test` for the unit tests and `npm run build` for a production build.

## Roles

New accounts are always created with `role: "user"`. Promote staff only from a trusted environment such as the Firebase Console or Admin SDK by changing the matching `users/{uid}` profile:

- `admin`: catalog and order management
- `delivery`: order management only
- `user`: shopping, favorites, checkout, and personal orders

The client cannot assign or change its own role under the included Firestore rules.

## Migrating legacy accounts

The original app stored bcrypt password hashes in Firestore and authenticated by downloading all users into the browser. Those hashes cannot be imported into Firebase Authentication from client code.

For every existing user:

1. Create a Firebase Authentication account using the Admin SDK, a password-reset enrollment flow, or the Firebase Console.
2. Move the profile to `users/{firebaseAuthUid}` so its document ID matches the Authentication UID.
3. Keep the contact fields, and initialize `cart: []`, `favorites: []`, and `role: "user"` as needed.
4. Assign `admin` or `delivery` roles only from a trusted environment.
5. Remove the old `password`, `pending`, and `purchased` fields after validating the migration.

Legacy pending/purchased arrays should be converted into documents in `orders`. Each order contains `userId`, customer/address snapshots, `items`, totals, `status`, `createdAt`, and `updatedAt`.

## Deployment

`npm run build` writes the site to `dist`. The included `firebase.json` configures SPA rewrites for Firebase Hosting. GitHub Pages remains available through `npm run deploy`; Vite automatically uses `/My-Library/` as its Actions base path.
