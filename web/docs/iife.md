# IIFE (Immediately Invoked Function Expression)

Also known as Self-Executing Anonymous Function.

```js
(function () {
  // Some code.
})();
```

## Uses

IIFE has following use cases.

1. Avoiding to pollute the global namespace.

   ```js
   (function () {
     let a;
     let b;
   })();
   ```

   The variables will now only be accessible inside the function and not globally.

2. Creating isolated modules.

   ```js
   const createisolatedModule = (args) =>
     (function (args) {
       console.log("Arguments gotten at creation time", args);

       const privateVar = "Private variable";
       function privateFunction() {
         console.log("This can only be called inside the IIFE module");
       }
       privateFunction();

       return {
         publicFunction: function () {
           console.log(
             "Calling private function with access to privateVar=",
             privateVar
           );
         },
       };
     })(args);

   const isolatedModule = createisolatedModule("Isolated Module");
   console.log(isolatedModule.privateVar); // undefined
   console.log(isolatedModule.privateFunction); // undefined
   console.log(isolatedModule.publicFunction()); // Works and logs the privateVar.
   ```

3. For loop with `var` before ES6.

   ```js
   for (var i = 0; i < 3; i++) {
     setTimeout(function () {
       console.log(i);
     }, 1000);
   }
   // Outputs: 3, 3, 3

   for (var i = 0; i < 3; i++) {
     setTimeout(
       (function (iCopy) {
         return () => console.log(iCopy);
       })(i),
       1000
     );
   }
   // Outputs: 0, 1, 2
   ```
