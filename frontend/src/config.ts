export const config = {
  protocol: import.meta.env.PROTOCOL || 'http',
  host: import.meta.env.HOST || 'localhost',
  backendPort: import.meta.env.BACKEND_PORT || 8080,
}
