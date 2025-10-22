/*
1. Global App Data → Store
    User authentication
    App settings
    Shared task lists
    Navigation state

2. Route-Specific Data → Router + Store
    Task details for specific ID
    User profile pages
    Report data for specific date ranges

3. Component-Local Data → Components
    Form validation
    Search autocomplete
    Temporary UI state
    Real-time updates

Key Takeaways:
    Store-centric approach is best for your Redux-style architecture
    Router can trigger store actions for route-specific data
    Components handle only local, temporary data
    Avoid data fetching in components for shared/persistent data
    Use the store as your single source of truth for application state
*/

export class DataFetcher {}
