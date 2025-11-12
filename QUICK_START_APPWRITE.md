# QUICK START GUIDE - Appwrite Database Setup

## Visual Step-by-Step Instructions

### PART 1: CREATE PROJECT AND DATABASE

#### 1. Go to https://cloud.appwrite.io and Sign Up/Login

#### 2. Create New Project
```
Click: [+ Create Project]
Enter Name: NotesApp
Click: [Create]
```
📋 **COPY THIS:** Your Project ID will appear - save it!

#### 3. Create Database
```
Left Sidebar → Click: [Databases]
Click: [+ Create Database]
Enter Name: NotesDB
Click: [Create]
```
📋 **COPY THIS:** Your Database ID will appear - save it!

#### 4. Create Collection
```
Inside NotesDB → Click: [+ Create Collection]
Enter Name: notes
Click: [Create]
```
📋 **COPY THIS:** Your Collection ID will appear - save it!

---

### PART 2: ADD ATTRIBUTES (FIELDS)

Click "+ Create Attribute" and add each of these **5 attributes**:

#### Attribute 1:
```
Type: [String]
Key: title
Size: 255
Required: ✅ (checked)
Default Value: (leave empty)
Array: ❌ (unchecked)
Click: [Create]
```

#### Attribute 2:
```
Type: [String]
Key: content
Size: 10000
Required: ✅ (checked)
Default Value: (leave empty)
Array: ❌ (unchecked)
Click: [Create]
```

#### Attribute 3:
```
Type: [String]
Key: userId
Size: 255
Required: ✅ (checked)
Default Value: (leave empty)
Array: ❌ (unchecked)
Click: [Create]
```

#### Attribute 4:
```
Type: [DateTime]
Key: createdAt
Required: ✅ (checked)
Default Value: (leave empty)
Array: ❌ (unchecked)
Click: [Create]
```

#### Attribute 5:
```
Type: [DateTime]
Key: updatedAt
Required: ✅ (checked)
Default Value: (leave empty)
Array: ❌ (unchecked)
Click: [Create]
```

⏳ **WAIT:** Wait for all attributes to show "Available" status (green checkmark)

---

### PART 3: CREATE INDEXES (PERFORMANCE)

Click on "Indexes" tab:

#### Index 1:
```
Click: [+ Create Index]
Key: userId_index
Type: [Key]
Attributes: [Select: userId]
Order: ASC
Click: [Create]
```

#### Index 2:
```
Click: [+ Create Index]
Key: createdAt_index
Type: [Key]
Attributes: [Select: createdAt]
Order: DESC
Click: [Create]
```

⏳ **WAIT:** Wait for indexes to show "Available" status

---

### PART 4: SET PERMISSIONS (CRITICAL!)

Click on "Settings" tab in your collection, scroll down to "Permissions":

**UPDATED METHOD (Current Appwrite UI):**

```
1. Under "Document Security" section, you'll see a toggle
2. Make sure "Document Security" is ENABLED (toggle ON)
3. Click: [+ Add a permission]
4. A modal will appear with these options:
   
   Permission Type: Select "Any"
   
5. Check ALL these boxes in the permissions:
   ✅ Read
   ✅ Create  
   ✅ Update
   ✅ Delete
   
6. Click: [Create] or [Add]
```

**ALTERNATIVE METHOD (if "Any" doesn't work):**

```
1. Click: [+ Add a permission]
2. Permission Type: Select "All guests" or "All users"
3. Check ALL permissions:
   ✅ Read
   ✅ Create
   ✅ Update
   ✅ Delete
4. Click: [Create]
```

**VISUAL VERIFICATION:**
After adding, you should see under Permissions:
```
Role: Any (or All guests)
Permissions: Create, Read, Update, Delete
```

⚠️ **IMPORTANT:** Without this, your app won't be able to read/write data!

**If you still can't find permissions settings:**
- Try the "Settings" tab at the TOP of the collection page
- Look for "Permissions" or "Security" section
- Some Appwrite versions have it under the main collection view (not in Settings)

---

### PART 5: UPDATE YOUR .ENV FILES

Now update your environment files with the IDs you copied:

#### File: `notes_app/.env` (Flutter)
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=paste-your-project-id-here
APPWRITE_DATABASE_ID=paste-your-database-id-here
APPWRITE_COLLECTION_ID=paste-your-collection-id-here
```

#### File: `NotesApp/.env` (React Native)
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=paste-your-project-id-here
APPWRITE_DATABASE_ID=paste-your-database-id-here
APPWRITE_COLLECTION_ID=paste-your-collection-id-here
```

**Example:**
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=65f7a8b9c2d1e3f4g5h6
APPWRITE_DATABASE_ID=65f7a8c1d2e3f4g5h6i7
APPWRITE_COLLECTION_ID=65f7a8d3e4f5g6h7i8j9
```

---

### PART 6: TEST YOUR SETUP

Before running your apps, create a test document:

```
In Appwrite Console:
1. Go to your "notes" collection
2. Click "Documents" tab
3. Click: [+ Create Document]
4. Fill in:
   title: "My First Note"
   content: "This is a test note"
   userId: "test-user"
   createdAt: Click calendar → Select now
   updatedAt: Click calendar → Select now
5. Click: [Create]
```

If successful, you'll see your test document! ✅

---

### PART 7: RUN YOUR APPS

#### React Native:
```bash
cd NotesApp
npm start
# Press 'a' for Android or 'i' for iOS
```

#### Flutter:
```bash
cd notes_app
flutter pub get
flutter run
```

---

## COMMON MISTAKES TO AVOID ❌

1. **Wrong attribute names** - Must be EXACTLY:
   - `title` (not "Title" or "TITLE")
   - `content` (not "Content")
   - `userId` (not "user_id" or "UserID")
   - `createdAt` (not "created_at" or "createdat")
   - `updatedAt` (not "updated_at" or "updatedat")

2. **Forgetting to set Required ✅** - All 5 attributes must be required

3. **Missing Permissions** - Must add "Any" role with ALL CRUD permissions

4. **Not waiting for "Available" status** - Attributes take time to process

5. **Extra spaces in .env** - No spaces around = sign:
   ✅ `APPWRITE_PROJECT_ID=abc123`
   ❌ `APPWRITE_PROJECT_ID = abc123`

6. **Quotes in .env** - Don't use quotes:
   ✅ `APPWRITE_PROJECT_ID=abc123`
   ❌ `APPWRITE_PROJECT_ID="abc123"`

---

## CHECKLIST ✅

Before testing, verify:

- [ ] Created Appwrite account
- [ ] Created "NotesApp" project (copied Project ID)
- [ ] Created "NotesDB" database (copied Database ID)
- [ ] Created "notes" collection (copied Collection ID)
- [ ] Added all 5 attributes with correct names and types
- [ ] All attributes show "Available" status
- [ ] Created 2 indexes (userId_index, createdAt_index)
- [ ] Both indexes show "Available" status
- [ ] Set permissions: "Any" role with Create/Read/Update/Delete
- [ ] Updated notes_app/.env file with real IDs
- [ ] Updated NotesApp/.env file with real IDs
- [ ] Created at least one test document
- [ ] Test document appears in Documents tab
- [ ] Ran `npm install` in NotesApp folder
- [ ] Ran `flutter pub get` in notes_app folder

Once all checked, your apps will work! 🎉

---

## GETTING YOUR IDS

### Where to find Project ID:
```
Appwrite Console → Settings (gear icon) → Project ID
```

### Where to find Database ID:
```
Appwrite Console → Databases → Click on "NotesDB" → Look at URL:
.../database/[THIS-IS-YOUR-DATABASE-ID]
Or check the Database Settings
```

### Where to find Collection ID:
```
Appwrite Console → Databases → NotesDB → Click on "notes" → Look at URL:
.../collection/[THIS-IS-YOUR-COLLECTION-ID]
Or check the Collection Settings
```

---

## FINAL VERIFICATION

After running your app, you should see:

1. ✅ App launches without errors
2. ✅ "My Notes" screen appears
3. ✅ Your test note appears in the list
4. ✅ Click "+ Add Note" works
5. ✅ Create a note → appears immediately
6. ✅ Edit a note → changes save
7. ✅ Delete a note → removes from list
8. ✅ Pull down → refreshes the list

**Success!** Your Notes App is now connected to Appwrite! 🚀

---

## HELP & SUPPORT

If something doesn't work:

1. Check browser/device console for error messages
2. Verify all IDs in .env files (no typos!)
3. Ensure permissions are set correctly
4. Try creating a document manually in Appwrite Console
5. Restart your development server

**Error messages are your friend** - Read them carefully and they'll tell you what's wrong!
