// @octokit/rest says: self is undefined
global.self = typeof global.self === "undefined" ? global : global.self;

// Fix for Metro
process.browser = true;
