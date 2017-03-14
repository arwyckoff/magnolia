using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Models.Api.Accounts
{
    public struct AccountsResponse
    {
        public const string SignInFailure = "Sign in failed. ";
        public const string SignInSuccess = "Sign in succeeded. ";
        public const string UserNull = "Unable to locate user. ";
        public const string SignOutSuccess = "Sign out succeeded. ";
    }
}
