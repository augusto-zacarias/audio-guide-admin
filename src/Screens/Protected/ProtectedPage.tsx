import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../../auth";

export async function protectedLoader({ request }: LoaderFunctionArgs) {

  authProvider.checkAuthenticated();

  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}