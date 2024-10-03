export interface RouteConfig {
  context: string;
  target: string;
  changeOrigin: boolean;
}

export const routes: RouteConfig[] = [
  {
    context: "/api/auth",
    target: String(process.env.AUTH_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/user",
    target: String(process.env.USER_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/notify",
    target: String(process.env.NOTIFY_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/execution",
    target: String(process.env.EXECUTION_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/interview",
    target: String(process.env.INTERVIEW_SERVICE),
    changeOrigin: true,
  },
];
