// // const bcrypt = require("bcryptjs")
// // const salt = bcrypt.genSaltSync(10)

// // const password = bcrypt.hashSync("uche", salt)

// // const compare = bcrypt.compareSync("emeka", password)
// // const compare2 = bcrypt.compareSync("uche", password)
// // console.log(`password:::::: `, password)
// // console.log(`compare:::::: `, compare)
// // console.log(`compare2:::::: `, compare2)

// // const bcrypt = require("bcryptjs")

// // bcrypt.genSalt(10, (err, salt) => {
// //     bcrypt.hash("uche", salt, (err, hash) => {
// //         console.log(`hash:::::::; `, hash)
// //     })
// // })

// const jwt = require("jsonwebtoken")

// const payload = {
//     name: "uche",
//     age: 12
// }
// const key = "okoye";

// const options = {
//     expiresIn: 3000
// }

// jwt.sign(
//     payload,
//     key,
//     options, (err, token) => {
//         // console.log(`token ::::: `, token)
//         jwt.verify(
//             "asads",
//             key,
//             (err, payload) => {
//                 if(err) throw err;
//                 console.log(`pyaload:::: `, payload)

//             }
//             )
//     }
// )

const pattern = /^thena*/;

const reg = pattern.test("then")

console.log(`reg:::::: `, reg)