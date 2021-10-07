# Community Compost App
### The app that makes door-to-door compost pick-ups easy.
**CLIENT:**
- Deployed App: https://jtabb-community-compost.herokuapp.com
- Github Repo: https://github.com/jonahtabb/community_compost_client

**SERVER:**
- Github Repo: https://github.com/jonahtabb/community_compost_server

# About
### A full stack, fully responsive React App built built by Jonah Tabb. The app provides community groups a way to manage groups for door-to-door household compost pickups. 
## Frontend / Client Stack
- React
- Typescript
- React-Router
- Node
- React-Strap / Bootstrap
- CSS
## Backend End / Server Stack
- PostgesSQL
- Sequelize
- Node.js
- Express
- JSON Web Token
# Features Include
- Single page app with routing using react-router
- Login / Logout / Register
- Token based authentication
- REST API with full CRUD interaction between client and server
# Notes and Take-aways
- This app uses React class components, an exercise in understanding the lifecycle methods and better preparing myself for handling legacy code bases that use React class components instead of React Function Components.
- Typescript has been super helpful in understanding the flow of data during the coding process.  While it certainly took longer to configure than vanilla JS, I appreciate how it provides deeper insight into data types along-the-way, and protects against unexpected run-time errors.
- I experimented with different methods for converting larger data objects into mappable arrays to dynamically display non-array type objects.

  - For example, I used Objects.values to map over the key-value pairs in the Member Profile object, which is more concise than the alternative of explicitly writing key values and JSX for all of the object key-value pairs.
  
    ```ts
    //Map and display Member data

    Object.values(this.state.selectedMember.memberProfile)
        .map((value, index) => {

        const memberProfileKeys = 
        Object.keys(this.state.selectedMember.memberProfile)

        const prettyKey = 
        camelToSentenceConverter(memberProfileKeys[index])

        return (
            <p key={`memberData${index}`}>
            <strong>{prettyKey}:</strong> {value}</p>
        )
    })
    ```
  - Another notable method I used was for updating the value of form fields to maintain sync with the component's state. Originally, I had learned how to update form values onChange using literal values, but that method would require a separate function for each input field.  The method below that I came up with, can be used for all of the form input fields using e.target.  An important aspect of this method is that the key of the the state entry must match the 'name' attribute of the corresponding form entry.
      ```ts
      //Sync component state with form field input

      updateInputState(e: React.ChangeEvent<HTMLInputElement>): void {

          let stateName: string = e.target.name;
          let stateValue: string = e.target.value;

          this.setState((prevState) => ({
              ...prevState,
              [stateName]: stateValue,
          }));

      }
    ```
  