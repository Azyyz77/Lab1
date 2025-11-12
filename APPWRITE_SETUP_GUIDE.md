# APPWRITE DATABASE SETUP GUIDE FOR NOTES APP

## Step 1: Create an Appwrite Account

1. Go to https://appwrite.io/
2. Click "Get Started" or "Sign Up"
3. Create your account (you can use GitHub, Google, or email)
4. Verify your email if required

## Step 2: Create a New Project

1. After logging in, you'll see the Appwrite Console
2. Click the "+ Create Project" button
3. Name your project: **NotesApp**
4. Click "Create"
5. **IMPORTANT**: Copy your **Project ID** - you'll need this later

## Step 3: Create a Database

1. In your NotesApp project, click on "Databases" in the left sidebar
2. Click "+ Create Database"
3. Name your database: **NotesDB**
4. Click "Create"
5. **IMPORTANT**: Copy your **Database ID** - you'll need this later

## Step 4: Create a Collection

1. Inside NotesDB, click "+ Create Collection"
2. Name your collection: **notes**
3. Click "Create"
4. **IMPORTANT**: Copy your **Collection ID** - you'll need this later

## Step 5: Add Attributes to the Collection

Now you need to add the following attributes (fields) to your notes collection:

### Attribute 1: title
- Click "+ Create Attribute"
- Choose: **String**
- Attribute Key: `title`
- Size: `255`
- Required: ✅ **Yes**
- Array: ❌ No
- Click "Create"

### Attribute 2: content
- Click "+ Create Attribute"
- Choose: **String**
- Attribute Key: `content`
- Size: `10000` (for longer notes)
- Required: ✅ **Yes**
- Array: ❌ No
- Click "Create"

### Attribute 3: userId
- Click "+ Create Attribute"
- Choose: **String**
- Attribute Key: `userId`
- Size: `255`
- Required: ✅ **Yes**
- Array: ❌ No
- Click "Create"

### Attribute 4: createdAt
- Click "+ Create Attribute"
- Choose: **DateTime**
- Attribute Key: `createdAt`
- Required: ✅ **Yes**
- Array: ❌ No
- Click "Create"

### Attribute 5: updatedAt
- Click "+ Create Attribute"
- Choose: **DateTime**
- Attribute Key: `updatedAt`
- Required: ✅ **Yes**
- Array: ❌ No
- Click "Create"

**WAIT**: After creating each attribute, Appwrite needs time to process. Wait until all attributes show "Available" status before proceeding.

## Step 6: Create Indexes (for better performance)

### Index 1: userId Index
1. Go to the "Indexes" tab in your notes collection
2. Click "+ Create Index"
3. Index Key: `userId_index`
4. Type: **Key**
5. Attributes: Select `userId`
6. Order: **ASC**
7. Click "Create"

### Index 2: createdAt Index
1. Click "+ Create Index"
2. Index Key: `createdAt_index`
3. Type: **Key**
4. Attributes: Select `createdAt`
5. Order: **DESC** (to get newest notes first)
6. Click "Create"

## Step 7: Configure Permissions

This is CRITICAL for your app to work!

1. Go to the "Settings" tab of your notes collection
2. Scroll down to "Permissions" section
3. Make sure "Document Security" is ENABLED (toggle should be ON)
4. Click "+ Add a permission" or "+ Add Role"

### UPDATED METHOD (Current Appwrite UI):

**For Development/Testing (RECOMMENDED):**

1. Click "+ Add a permission"
2. A modal/dialog will appear
3. **Permission Type/Role**: Select **"Any"** from the dropdown
4. **Permissions**: Check ALL boxes:
   - ✅ Read
   - ✅ Create
   - ✅ Update
   - ✅ Delete
5. Click "Create" or "Add"

**After adding, you should see:**
```
Role: Any
Permissions: Create, Read, Update, Delete
```

### ALTERNATIVE (if "Any" doesn't appear):

**Option A: All Guests (for public access)**
1. Click "+ Add a permission"
2. Role: Select **"All guests"** or **"Guests"**
3. Check ALL permissions: Read, Create, Update, Delete
4. Click "Create"

**Option B: All Users (requires authentication)**
1. Click "+ Add a permission"
2. Role: Select **"All users"** or **"Users"**
3. Check ALL permissions: Read, Create, Update, Delete
4. Click "Create"

### TROUBLESHOOTING PERMISSIONS:

If you can't find these options:
- Look for "Permissions" under the main collection view (not just Settings tab)
- Try clicking on the collection name and looking for a "Permissions" section at the top
- Some Appwrite versions have "Security" instead of "Permissions"
- Make sure you're in the "notes" collection, not the database

⚠️ **IMPORTANT**: 
- Without proper permissions, your app will get "Unauthorized" or "Missing scope" errors
- For production apps, implement proper authentication and use user-based permissions
- "Any" means anyone can access - use only for development/testing

## Step 8: Get Your Appwrite Credentials

You now need to update your `.env` files with the actual values:

1. **APPWRITE_ENDPOINT**: `https://cloud.appwrite.io/v1`
2. **APPWRITE_PROJECT_ID**: Your Project ID from Step 2
3. **APPWRITE_DATABASE_ID**: Your Database ID from Step 3
4. **APPWRITE_COLLECTION_ID**: Your Collection ID from Step 4

### Update Flutter .env file:
File: `notes_app/.env`
```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=<your-actual-project-id>
APPWRITE_DATABASE_ID=<your-actual-database-id>
APPWRITE_COLLECTION_ID=<your-actual-collection-id>
```

### Update React Native .env file:
File: `NotesApp/.env`
```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=<your-actual-project-id>
APPWRITE_DATABASE_ID=<your-actual-database-id>
APPWRITE_COLLECTION_ID=<your-actual-collection-id>
```

## Step 9: Test Your Setup

### To verify your Appwrite setup is correct:

1. In Appwrite Console, go to your notes collection
2. Click the "Documents" tab
3. Try adding a test document manually:
   - Click "+ Create Document"
   - Fill in the fields:
     - title: "Test Note"
     - content: "This is a test"
     - userId: "test-user"
     - createdAt: Click calendar, select current date/time
     - updatedAt: Click calendar, select current date/time
   - Click "Create"

4. If the document is created successfully, your setup is correct!

## Step 10: Run Your Apps

### For Flutter:
```bash
cd notes_app
flutter pub get
flutter run
```

### For React Native:
```bash
cd NotesApp
npm start
# Then press 'a' for Android or 'i' for iOS
```

## Troubleshooting

### Error: "Document missing required attribute"
- Make sure ALL 5 attributes are created and show "Available" status
- Check that you marked title, content, userId, createdAt, and updatedAt as "Required"

### Error: "Unauthorized" or "Missing scope"
- Check your permissions in Step 7
- Make sure you added "Any" or "Users" role with all CRUD permissions

### Error: "Invalid document structure"
- Verify your attribute names are EXACTLY:
  - `title` (not Title or TITLE)
  - `content` (not Content)
  - `userId` (not userid or UserId)
  - `createdAt` (not createdat or created_at)
  - `updatedAt` (not updatedat or updated_at)

### Error: "AppwriteException: Project not found"
- Double-check your Project ID in the .env file
- Make sure there are no extra spaces or quotes

### Notes are not loading:
- Check browser/device console for error messages
- Verify your .env file is properly loaded
- Make sure you created at least one test document in Appwrite
- Check that indexes are created and available

## Visual Reference

Here's what your Appwrite Console should look like:

```
NotesApp (Project)
└── Databases
    └── NotesDB
        └── notes (Collection)
            ├── Attributes:
            │   ├── title (String, 255, Required)
            │   ├── content (String, 10000, Required)
            │   ├── userId (String, 255, Required)
            │   ├── createdAt (DateTime, Required)
            │   └── updatedAt (DateTime, Required)
            ├── Indexes:
            │   ├── userId_index (userId, ASC)
            │   └── createdAt_index (createdAt, DESC)
            └── Settings > Permissions:
                └── Any: Create, Read, Update, Delete ✅
```

## Summary Checklist

Before testing your apps, make sure you have:

- ✅ Created Appwrite account
- ✅ Created "NotesApp" project
- ✅ Created "NotesDB" database
- ✅ Created "notes" collection
- ✅ Added all 5 attributes (title, content, userId, createdAt, updatedAt)
- ✅ All attributes show "Available" status
- ✅ Created 2 indexes (userId_index, createdAt_index)
- ✅ Configured permissions (Any or Users role with CRUD)
- ✅ Updated both .env files with actual IDs
- ✅ Created at least one test document
- ✅ Installed npm packages: `npm install appwrite react-native-dotenv`
- ✅ Installed Flutter packages: `flutter pub get`

Once all items are checked, your Notes App should work perfectly with Appwrite! 🎉
