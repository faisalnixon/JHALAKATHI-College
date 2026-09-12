import { type FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { apiFetch } from "../../lib/api";

type LoginResponse = {
  ok: boolean;
  admin: {
    id: string;
    email: string;
  };
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: (credentials: {
      email: string;
      password: string;
    }) =>
      apiFetch<LoginResponse>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin", "me"],
      });

      navigate("/admin/dashboard", {
        replace: true,
      });
    },

    onError: (error) => {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed",
      );
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    loginMutation.mutate({
      email: email.trim().toLowerCase(),
      password,
    });
  }

  const loading = loginMutation.isPending;

  return (
    <main className="flex min-h-[calc(100svh-80px)] items-center justify-center bg-formBg px-4 py-12">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border-[3px] border-secondary bg-primary-container/[0.99] shadow-2xl">
        {/* Header */}
        <div className="border-b border-secondary/30 px-6 py-7 sm:px-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <p className="font-label-md text-xs font-bold uppercase tracking-wider text-primary">
            Administration
          </p>

          <h1 className="mt-1 font-headline-lg text-headline-lg text-on-surface">
            Admin Login
          </h1>

          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Sign in to manage college information and faculty records.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {error && (
              <div
                role="alert"
                className="rounded-xl border-2 border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-label-md text-sm font-bold text-primary"
              >
                Email
              </Label>

              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                />

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  autoComplete="username"
                  placeholder="admin@example.com"
                  required
                  className="h-12 rounded-xl border-2 border-secondary/35 bg-formBg pl-12 pr-4 shadow-sm transition-all duration-200 hover:border-secondary/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="font-label-md text-sm font-bold text-primary"
              >
                Password
              </Label>

              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                />

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="h-12 rounded-xl border-2 border-secondary/35 bg-formBg pl-12 pr-4 shadow-sm transition-all duration-200 hover:border-secondary/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-primary font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}





// import { type FormEvent, useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router";

// import { Button } from "../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";

// import { LoaderCircle } from "lucide-react";

// import { apiFetch } from "../lib/api";

// type LoginResponse = {
//   ok: boolean;
//   admin: {
//     id: string;
//     email: string;
//   };
// };

// export default function AdminLoginPage() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const loginMutation = useMutation({
//     mutationFn: (credentials: {
//       email: string;
//       password: string;
//     }) =>
//       apiFetch<LoginResponse>("/api/admin/login", {
//         method: "POST",
//         body: JSON.stringify(credentials),
//       }),

//     onSuccess: async () => {
//       await queryClient.invalidateQueries({
//         queryKey: ["admin", "me"],
//       });

//       navigate("/admin/dashboard", {
//         replace: true,
//       });
//     },

//     onError: (error) => {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Login failed",
//       );
//     },
//   });

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     setError("");

//     loginMutation.mutate({
//       email: email.trim().toLowerCase(),
//       password,
//     });
//   }

//   const loading = loginMutation.isPending;

//   return (
//     <main className="flex min-h-[calc(100svh-80px)] items-center justify-center px-4 py-12">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Admin Login</CardTitle>

//           <CardDescription>
//             Enter your administrator email and password.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >
//             {error && (
//               <div
//                 role="alert"
//                 className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
//               >
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="email">
//                 Email
//               </Label>

//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(event) =>
//                   setEmail(event.target.value)
//                 }
//                 autoComplete="username"
//                 placeholder="admin@example.com"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">
//                 Password
//               </Label>

//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(event) =>
//                   setPassword(event.target.value)
//                 }
//                 autoComplete="current-password"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full"
//             >
//               {loading ? (
//                 <>
//                   <LoaderCircle className="animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }