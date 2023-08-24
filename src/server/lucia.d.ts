/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lucia.js").Auth;
  type DatabaseUserAttributes = {
    handle: string;
  };
  type DatabaseSessionAttributes = {};
}
