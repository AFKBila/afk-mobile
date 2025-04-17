# UI Components Documentation

## Core Components

### Navigation

- `FixedProfileHeader`: Custom header with profile actions
- `CustomLoginButton`: Reusable authentication button
- `MainContainer`: Base layout container

### User Interface

- `LoadingIndicator`: Loading state component
- `ErrorBoundary`: Error handling wrapper
- `Toast`: Custom notification system

### Profile

- `ProfileHeader`: User profile display
- `ActivityFeed`: User activity display
- `MediaGrid`: Media display grid

## Usage Examples

```typescript
// Example usage of ProfileHeader
<ProfileHeader
  name="User Name"
  location="Location"
  bio="User bio"
  avatar="avatar_url"
  followers={100}
  following={50}
/>
```
