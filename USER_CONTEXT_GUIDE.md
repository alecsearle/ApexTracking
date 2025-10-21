# UserContext Guide

## Overview

The UserContext tracks whether a user is an "admin" or "employee" globally across your entire app.

## Files Created/Modified

✅ `/contexts/UserContext.tsx` - The context provider
✅ `/app/_layout.tsx` - Wrapped app with UserProvider  
✅ `/app/(tabs)/settings/index.tsx` - Uses context to manage role
✅ `/app/(tabs)/tools/_layout.tsx` - Uses context for NFC alerts

## How to Use

### Import the hook

```tsx
import { useUser } from "@/contexts/UserContext";
```

### In any component

```tsx
function MyComponent() {
  const { userRole, setUserRole, isAdmin, isEmployee } = useUser();

  // Get current role
  console.log(userRole); // "admin" or "employee"

  // Check if admin
  if (isAdmin()) {
    // Show admin features
  }

  // Check if employee
  if (isEmployee()) {
    // Show employee features
  }

  // Change role
  setUserRole("employee");
}
```

## Features

### Available Methods:

- `userRole` - Current role: `"admin"` | `"employee"`
- `setUserRole(role)` - Change the user role
- `isAdmin()` - Returns `true` if user is admin
- `isEmployee()` - Returns `true` if user is employee

## How It Works

1. **Settings Screen**: Toggle between Admin/Employee updates the global context
2. **Tools Screen**: NFC icon uses the context to show different alerts
3. **Anywhere else**: Import `useUser()` to access the role

## Testing

1. Go to **Settings** tab
2. Toggle between **Admin** and **Employee**
3. Go to **Tools** tab → open a tool → tap the radio wave icon
4. You'll see different alerts based on the selected role!

## Example: Conditional Rendering

```tsx
import { useUser } from "@/contexts/UserContext";

function ToolActions() {
  const { isAdmin } = useUser();

  return (
    <View>
      {isAdmin() && <Button title="Delete All" />}
      <Button title="View Tools" />
    </View>
  );
}
```

## Example: Permission Check

```tsx
import { useUser } from "@/contexts/UserContext";
import { Alert } from "react-native";

function SecureAction() {
  const { isAdmin } = useUser();

  const handleAction = () => {
    if (!isAdmin()) {
      Alert.alert("Access Denied", "Admin only feature");
      return;
    }
    // Proceed with admin action
  };
}
```

## Next Steps

When you add real authentication:

```tsx
// After login
const { setUserRole } = useUser();
const response = await loginAPI(username, password);
setUserRole(response.role); // Set from backend
```
