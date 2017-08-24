// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// function getGreeting(user) {
//     if (user) {
//         return <h1>Hello, {formatName(user)}!</h1>;
//     }
//     return <h1>Hello, Stranger.</h1>;
// }

// const user = {
//     firstName: 'Claude',
//     lastName: 'Chen'
// };

// const element = (
//     <h1>
//     Hello, {formatName(user)}!
//     </h1>
// );

// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

// function tick() {
//     const element = (
//         <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     );
//     ReactDOM.render(
//         element,
//         document.getElementById('root')
//     );
// }

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;

ReactDOM.render(
    element,
    document.getElementById("root")
);