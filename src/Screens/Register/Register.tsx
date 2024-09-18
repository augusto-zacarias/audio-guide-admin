import React from "react";
import { authProvider } from "../../auth";
import { LoaderFunctionArgs, redirect, useFetcher, useRouteLoaderData } from "react-router-dom";
import SignIn from "../../Components/SignIn";

export default function Register() {
  return (
    <SignIn isLogin={false}/>
  );
}

export async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.login(username,"");
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}

// function OldLoginPage() {
//   let location = useLocation();
//   let params = new URLSearchParams(location.search);
//   let from = params.get("from") || "/";

//   let navigation = useNavigation();
//   let isLoggingIn = navigation.formData?.get("username") != null;

//   let actionData = useActionData() as { error: string } | undefined;

//   return (
//     <div>
//       <p>You must log in to view the page at {from}</p>

//       <Form method="post" replace>
//         <input type="hidden" name="redirectTo" value={from} />
//         <label>
//           Username: <input name="username" />
//         </label>{" "}
//         <button type="submit" disabled={isLoggingIn}>
//           {isLoggingIn ? "Logging in..." : "Login"}
//         </button>
//         {actionData && actionData.error ? (
//           <p style={{ color: "red" }}>{actionData.error}</p>
//         ) : null}
//       </Form>
//     </div>
//   );
// }